import * as i0 from '@angular/core';
import { Directive, Input, HostListener, Pipe } from '@angular/core';
import { DocumentReference, Timestamp, FieldValue, serverTimestamp, addDoc, doc, updateDoc, setDoc, deleteDoc, getDoc, docSnapshots, where, limit, orderBy, query, getDocs, collection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import * as i1 from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { v4 } from 'uuid';

/**
 * Uma diretiva que lida com erros de carregamento de imagem e substitui a fonte da imagem por um URL de fallback.
 *
 * @example
 * Aplique o atributo `fallback` a um elemento `img` ou `ion-img` para usar a diretiva:
 * ```html
 * // native HTML
 * <img src="image-url.jpg" fallback="fallback-image-url.jpg" [retry]="2" />
 *
 * // ionic
 * <ion-img src="image-url.jpg" fallback="fallback-image-url.jpg" [retry]="2" />
 * ```
 */
class ImgFallbackDirective {
    constructor(eRef) {
        this.eRef = eRef;
        /**
         * A URL de fallback a ser usada quando a origem da imagem original falha ao carregar.
         */
        this.fallback = '';
        /**
         * O número de vezes para tentar carregar novamente a fonte da imagem original antes de usar o URL de fallback.
         */
        this.retry = 0;
        this.currentRetry = 0;
    }
    loadFallbackOnError() {
        const { nativeElement } = this.eRef;
        const defaultUrl = this.fallback ||
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Crect width='100%25' height='100%25' fill='%23f1f1f1'/%3E%3C/svg%3E";
        const originalSrc = nativeElement.src;
        if (originalSrc === `${window.location.origin}/`) {
            nativeElement.src = defaultUrl;
            return;
        }
        if (this.currentRetry !== this.retry) {
            this.currentRetry += 1;
            nativeElement.src = defaultUrl;
            setTimeout(() => {
                nativeElement.src = originalSrc;
            }, 1500);
        }
        else {
            nativeElement.src = defaultUrl;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: ImgFallbackDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.1.1", type: ImgFallbackDirective, isStandalone: true, selector: "img[fallback], ion-img[fallback]", inputs: { fallback: "fallback", retry: "retry" }, host: { listeners: { "error": "loadFallbackOnError()", "ionError": "loadFallbackOnError()" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: ImgFallbackDirective, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: 'img[fallback], ion-img[fallback]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { fallback: [{
                type: Input
            }], retry: [{
                type: Input
            }], loadFallbackOnError: [{
                type: HostListener,
                args: ['error']
            }, {
                type: HostListener,
                args: ['ionError']
            }] } });

/**
 * Dicionário de códigos de erro da API com as respectivas mensagens de erro.
 */
const apiErrosTranslate = {
    'application/validations-fail': 'Falha de validação, verifique os dados e tente novamente!',
    'application/token-missing': 'Ops! Houve um erro, renicie a pagina e tente novamente!',
    'application/token-malformatted': 'Ops! Houve um erro, renicie a pagina e tente novamente!',
    'application/invalid-token': 'Ops! Houve um erro, renicie a pagina e tente novamente!',
    'application/without-permission': 'Ops! Parece que você não tem permissões para realizar esta ação!',
    'application/without-permission-level': 'Você não permissões suficientes para realizar esta ação.',
    'application/document-not-found': 'Ops! Houve um erro, renicie a pagina e tente novamente!',
    'application/documen-without-identifier': 'Ops! Houve um erro, renicie a pagina e tente novamente!',
    'application/need-credit': 'Ops! Houve um erro, renicie a pagina e tente novamente!',
    'auth/email-already-in-use': 'Este endereço de e-mail já está sendo utilizado.',
    'auth/weak-password': 'Sua senha não é forte o suficiente. Adicione números, letras maiúsculas e minúsculas.',
    'auth/invalid-email': 'O endereço e-mail é invalido.',
    'auth/account-exists-with-different-credential': 'E-mail já registrado! realize o login com e-mail e senha.',
    'auth/email-already-exists': 'Este endereço de e-mail já está sendo utilizado.',
    'auth/invalid-credential': 'Sua credencial está inválida.',
    'auth/wrong-password': 'O e-mail ou senha está inválido.',
    'auth/user-not-found': 'O e-mail ou senha está inválido.',
    'auth/user-mismatch': 'O e-mail ou senha está inválido.',
    'auth/invalid-verification-code': 'O código da verificação está inválido.',
    'auth/invalid-verification-id': 'Sua credencial está inválida.',
    'auth/requires-recent-login': 'Por favor deslogue do aplicativo e entre novamente.'
};
/**
 * Retorna a mensagem de erro correspondente a um determinado código de erro.
 *
 * @param errorCode O código de erro.
 * @param defaultMessage A mensagem de erro padrão a ser usada se não houver nenhuma mensagem correspondente ao código de erro fornecido.
 * @returns A mensagem de erro correspondente ao código de erro fornecido, ou a mensagem de erro padrão se não houver nenhuma mensagem correspondente.
 */
function getApiError(errorCode, defaultMessage = 'Não foi possível concluir sua solicitação, por favor tente novamente.') {
    return apiErrosTranslate[errorCode] ?? defaultMessage;
}

/**
 * Representa um erro de API com código, mensagem e status HTTP.
 */
class ApiError {
    /**
     * Cria uma instância de um erro de API com código, mensagem e status HTTP.
     *
     * @param code - O código de erro.
     * @param statusCode - O status HTTP associado ao erro.
     */
    constructor(code, statusCode) {
        this.message = getApiError(code);
        this.code = code;
        this.statusCode = statusCode;
    }
}

/**
 * Representa um erro da aplicação com título e mensagem.
 */
class AppError {
    /**
     * Cria uma instância de um erro da aplicação com título e mensagem.
     *
     * @param title - O título do erro.
     * @param message - A mensagem do erro.
     */
    constructor(title, message) {
        this.title = title;
        this.message = message;
    }
}

/**
 * Erro lançado quando um documento específico não é encontrado.
 */
class DocumentNotFoundError extends Error {
    /**
     * Cria uma instância de um erro `DocumentNotFoundError` com uma mensagem formatada para o Id do documento não encontrado.
     *
     * @param id - O Id do documento não encontrado.
     */
    constructor(id) {
        super(`Document '${id}' was not found.`);
        this.name = 'DocumentNotFoundError';
    }
}

/**
 * Converte um objeto do `Firestore` em objetos `JavaScript` nativos, convertendo campos de data/hora em objetos `Date`.
 *
 * @param obj - O objeto a ser convertido para objetos JavaScript nativos
 * @returns O objeto convertido para objetos JavaScript nativos
 */
function toNativeTypes(obj) {
    if (obj === null || typeof obj !== 'object' || obj instanceof DocumentReference) {
        return obj;
    }
    if (obj instanceof Timestamp) {
        return obj.toDate();
    }
    if (Array.isArray(obj)) {
        return obj.map(toNativeTypes);
    }
    const clone = {};
    Object.keys(obj).forEach(key => {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            clone[key] = toNativeTypes(obj[key]);
        }
    });
    return clone;
}

/**
 * Converte um `DocumentSnapshot` do Firestore em um objeto do tipo `T`, adicionando o Id do documento ao objeto.
 *
 * @template T - O tipo de objeto a ser retornado
 * @param document - O `DocumentSnapshot` do Firestore a ser convertido em objeto
 * @param hasTimestamp - Indica se o objeto deve ter seus campos de data/hora convertidos em tipos nativos (`Date`)
 * @returns {T} O objeto convertido do tipo `T`
 */
function ofFirestore(document, hasTimestamp = false) {
    const data = { id: document.id, ...document.data() };
    if (hasTimestamp) {
        return toNativeTypes(data);
    }
    return data;
}

/**
 * Converte um modelo em um objeto que pode ser salvo no `Firestore`.
 *
 * @param obj - Um modelo a ser convertido em um objeto para o `Firestore`
 * @returns O objeto convertido para o `Firestore`
 */
function toFirestore(obj) {
    if (obj === null || typeof obj !== 'object' || obj instanceof FieldValue || obj instanceof DocumentReference) {
        return obj;
    }
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }
    if (Array.isArray(obj)) {
        return obj.map(toFirestore);
    }
    const clone = {};
    Object.keys(obj).forEach(key => {
        if (obj[key] !== undefined && Object.prototype.hasOwnProperty.call(obj, key)) {
            clone[key] = toFirestore(obj[key]);
        }
    });
    return clone;
}

/**
 * A interface do serviço Cloud Firestore.
 *
 * Não chame esse construtor diretamente.
 * Em vez disso, crie um repositório e estenda o comportamento
 *
 * @template T - O tipo de modelo que representa os documentos armazenados no Firestore.
 */
class FirebaseAbstract {
    /**
     * @param firestore - Referência do Firestore
     * @param collectionName - Nome da coleção no Firestore
     */
    constructor(firestore, collectionName) {
        this.firestore = firestore;
        this.collectionName = collectionName;
    }
    /**
     * Adiciona um novo documento ao Firestore.
     *
     * @param data - Um objeto contendo os dados do novo documento.
     * @param options - Um objeto para configurar o comportamento de escrita.
     * @returns Uma `Promise` resolvida com o id do documento criado.
     */
    async add(data, options = { timestamps: true }) {
        const clone = toFirestore(data);
        if (options.timestamps) {
            clone.createdAt = serverTimestamp();
            clone.updatedAt = null;
        }
        delete clone.id;
        const { id } = await addDoc(this.collection(), clone);
        return id;
    }
    /**
     * Atualiza um documento existente no Firestore.
     *
     * @param data - Um objeto contendo os dados a serem alterados.
     * @param options - Um objeto para configurar o comportamento de escrita.
     * @returns Uma `Promise` resolvida vazia.
     */
    update(data, options = { timestamps: true }) {
        const clone = toFirestore(data);
        if (options.timestamps) {
            clone.updatedAt = serverTimestamp();
            delete clone.createdAt;
        }
        delete clone.id;
        const docRef = doc(this.collection(), data.id);
        return updateDoc(docRef, clone);
    }
    /**
     * Grava no documento referenciado pelo `id` especificado. Se
     * o documento ainda não existe, ele será criado. Se você fornecer `merge`
     * ou `mergeFields`, os dados fornecidos podem ser mesclados em um documento existente.
     *
     * @param data - Um objeto contendo os dados a serem adicionados ou alterados.
     * @param options - Um objeto para configurar o comportamento de escrita.
     * @returns Uma `Promise` resolvida vazia.
     */
    set(data, options = { timestamps: true }) {
        const clone = toFirestore(data);
        if (options.timestamps) {
            clone.createdAt = serverTimestamp();
            clone.updatedAt = null;
        }
        delete clone.id;
        const docRef = doc(this.collection(), data.id);
        return setDoc(docRef, clone, options);
    }
    /**
     * Exclui o documento referenciado pelo `id` especificado.
     *
     * @param id - O id do documento a ser excluído.
     * @returns Uma `Promise` resolvida vazia.
     */
    delete(id) {
        return deleteDoc(doc(this.collection(), id));
    }
    /**
     * Busca um documento pelo seu id.
     *
     * @param id - O id do documento a ser buscado.
     * @param options - Um objeto para configurar o comportamento de leitura.
     * @throws {DocumentNotFoundError}
     * @returns Uma `Promise` resolvida com o conteúdo do documento.
     */
    async getById(id, options = { timestamps: true }) {
        const docSnap = await getDoc(doc(this.collection(), id));
        if (!docSnap.exists()) {
            throw new DocumentNotFoundError(id);
        }
        return ofFirestore(docSnap, options.timestamps);
    }
    /**
     * Busca um documento pelo seu id.
     *
     * @param id - O id do documento a ser buscado.
     * @param options - Um objeto para configurar o comportamento de leitura.
     * @returns Um `Observable` para eventos.
     */
    getAsyncById(id, options = { timestamps: true }) {
        const docRef = doc(this.collection(), id);
        return docSnapshots(docRef).pipe(map(docSnap => (docSnap.exists() ? ofFirestore(docSnap, options.timestamps) : null)));
    }
    /**
     * Busca documentos por seus Ids.
     *
     * @param ids - Os ids dos documentos a serem buscados.
     * @param options - Um objeto para configurar o comportamento de leitura.
     * @returns Uma `Promise` resolvida com o conteúdo dos documentos.
     */
    async getByIds(ids, options = { timestamps: true }) {
        const promises = ids.map(id => this.getById(id, options));
        return Promise.all(promises);
    }
    /**
     * Busca todos os documentos da coleção.
     *
     * @param options - Um objeto para configurar o comportamento de leitura.
     * @returns Uma `Promise` resolvida com o conteúdo dos documentos.
     */
    async getAll(options = { timestamps: true }) {
        return this.getDocs(this.collection(), options);
    }
    /**
     * Recupera documentos da coleção com base no campo, operador e valor fornecidos, bem como em opções adicionais.
     *
     * @async
     * @param field - A chave do campo pelo qual os documentos devem ser filtrados.
     * @param operator - O operador a ser usado na filtragem (por exemplo, "==" ou ">").
     * @param value - O valor a ser comparado na filtragem.
     * @param limit - O número máximo de documentos a serem retornados.
     * @param orderBy - A chave do campo pelo qual os resultados devem ser ordenados.
     * @param orderByDirection - A direção na qual os resultados devem ser ordenados.
     * @param options - As opções adicionais para a leitura dos documentos.
     * @returns Uma `Promise` resolvida com um array de documentos `T`.
     */
    async getWhere(field, operator, value, limit$1 = null, orderBy$1 = null, orderByDirection = null, options = { timestamps: true }) {
        const queryConstraints = [where(field, operator, value)];
        if (limit$1) {
            queryConstraints.push(limit(limit$1));
        }
        if (orderBy$1) {
            queryConstraints.push(orderBy(orderBy$1, orderByDirection || 'asc'));
        }
        const q = query(this.collection(), ...queryConstraints);
        return this.getDocs(q, options);
    }
    /**
     * Recupera vários documentos da coleção com base nos filtros fornecidos e opções adicionais.
     *
     * @async
     * @param filters - Um array de objetos de filtro Firebase, cada um contendo um campo, um operador e um valor.
     * @param limit - O número máximo de documentos a serem retornados.
     * @param orderBy - A chave do campo pelo qual os resultados devem ser ordenados.
     * @param orderByDirection - A direção na qual os resultados devem ser ordenados.
     * @param options - As opções adicionais para a leitura dos documentos.
     * @returns Uma `Promise` resolvida com um array de documentos `T`.
     */
    async getWhereMany(filters, limit$1 = null, orderBy$1 = null, orderByDirection = null, options = { timestamps: true }) {
        const queryConstraints = filters.map(filter => {
            if (Array.isArray(filter)) {
                return where(filter[0], filter[1], filter[2]);
            }
            else {
                return where(filter.field, filter.operator, filter.value);
            }
        });
        if (orderBy$1) {
            queryConstraints.push(orderBy(orderBy$1, orderByDirection || 'asc'));
        }
        if (limit$1) {
            queryConstraints.push(limit(limit$1));
        }
        const q = query(this.collection(), ...queryConstraints);
        return this.getDocs(q, options);
    }
    /**
     * Recupera o primeiro documento da coleção com base no campo, operador e valor fornecidos, bem como em opções adicionais.
     *
     * @async
     * @param field - A chave do campo pelo qual o documento deve ser filtrado.
     * @param operator - O operador a ser usado na filtragem (por exemplo, "==" ou ">").
     * @param value - O valor a ser comparado na filtragem.
     * @param orderBy - A chave do campo pelo qual os resultados devem ser ordenados.
     * @param orderByDirection - A direção na qual os resultados devem ser ordenados.
     * @param options - As opções adicionais para a leitura do documento.
     * @returns Uma `Promise` resolvida com um documento `T` ou `null` se nenhum documento for encontrado.
     */
    async getOneWhere(field, operator, value, orderBy = null, orderByDirection = null, options = { timestamps: true }) {
        const documents = await this.getWhere(field, operator, value, 1, orderBy, orderByDirection, options);
        return documents.length ? documents[0] : null;
    }
    /**
     * Recupera o primeiro documento da coleção com base nos filtros fornecidos e opções adicionais.
     *
     * @async
     * @param filters - Um array de objetos de filtro Firebase, cada um contendo um campo, um operador e um valor.
     * @param orderBy - A chave do campo pelo qual os resultados devem ser ordenados.
     * @param orderByDirection - A direção na qual os resultados devem ser ordenados.
     * @param options - As opções adicionais para a leitura do documento.
     * @returns Uma `Promise` resolvida com um documento `T` ou `null` se nenhum documento for encontrado.
     */
    async getOneWhereMany(filters, orderBy = null, orderByDirection = null, options = { timestamps: true }) {
        const documents = await this.getWhereMany(filters, 1, orderBy, orderByDirection, options);
        return documents.length ? documents[0] : null;
    }
    query(...queries) {
        return query(this.collection(), ...queries);
    }
    /**
     * Realiza uma consulta no Firestore com base nas restrições de consulta fornecidas.
     *
     * @param query - A instância de `Query` a ser usada como base para as restrições.
     * @param options - Um objeto para configurar o comportamento de leitura.
     * @returns Uma `Promise` resolvida com um array de documentos `T`.
     */
    async getDocs(query, options = { timestamps: true }) {
        const { docs } = await getDocs(query);
        return docs.map(document => ofFirestore(document, options.timestamps));
    }
    /**
     * Obtém uma instância `CollectionReference` que se refere à coleção no caminho absoluto especificado por `collectionName`.
     *
     * @returns A instância de `CollectionReference`.
     */
    collection() {
        return collection(this.firestore, this.collectionName);
    }
}

/**
 * Calcula a idade a partir da data de nascimento.
 *
 * @param birthDate - Data de nascimento.
 * @returns Idade em anos.
 */
function calculateAge(birthDate) {
    const today = new Date();
    let age = calculateYearDifference(today, birthDate);
    if (isBirthdayNotReachedThisYear(today, birthDate)) {
        age--;
    }
    return age;
}
function calculateYearDifference(date1, date2) {
    return date1.getFullYear() - date2.getFullYear();
}
function isBirthdayNotReachedThisYear(today, birthDate) {
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();
    return monthDifference < 0 || (monthDifference === 0 && dayDifference < 0);
}

/**
 * Pipe para exibir a idade com base na data de nascimento.
 * Transforma uma data de nascimento em idade (em anos).
 */
class AgePipe {
    /**
     * Transforma a data de nascimento em idade.
     *
     * @param birthDateInput A data de nascimento, em formato Date ou string.
     * @returns A idade, em anos.
     */
    transform(birthDateInput) {
        return calculateAge(new Date(birthDateInput));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: AgePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.1.1", ngImport: i0, type: AgePipe, isStandalone: true, name: "age" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: AgePipe, decorators: [{
            type: Pipe,
            args: [{
                    standalone: true,
                    name: 'age'
                }]
        }] });

/**
 * Pipe para filtrar um array de objetos, com base em um termo de pesquisa.
 * As propriedades dos objetos que correspondem ao termo de pesquisa são retornadas.
 */
class FilterPipe {
    /**
     * Transforma a lista de itens, filtrando com base no termo fornecido.
     * Também recebe uma lista de chaves a serem ignoradas durante a pesquisa.
     *
     * @param items Lista de itens para filtrar.
     * @param term Uma string para comparar com todas as propriedades da lista.
     * @param excludes Lista de chaves que serão ignoradas durante a pesquisa.
     * @returns Retorna uma lista de itens que correspondem ao termo.
     */
    transform(items, term, excludes = []) {
        if (!term || !items) {
            return items;
        }
        const toCompare = term.toLowerCase();
        function checkInside(item, term) {
            if (typeof item === 'string' && item.toString().toLowerCase().includes(toCompare)) {
                return true;
            }
            for (const property in item) {
                if (item[property] === null || item[property] === undefined || excludes.includes(property)) {
                    continue;
                }
                if (typeof item[property] === 'object') {
                    if (checkInside(item[property], term)) {
                        return true;
                    }
                }
                else if (item[property]?.toString().toLowerCase().includes(toCompare)) {
                    return true;
                }
            }
            return false;
        }
        return items.filter(item => {
            return checkInside(item, term);
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: FilterPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.1.1", ngImport: i0, type: FilterPipe, isStandalone: true, name: "filter", pure: false }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: FilterPipe, decorators: [{
            type: Pipe,
            args: [{
                    standalone: true,
                    name: 'filter',
                    pure: false
                }]
        }] });

/**
 * Pipe para contornar a segurança e confiar em conteúdo dinâmico (HTML, CSS, JavaScript, URLs, etc.).
 * Utiliza o serviço DomSanitizer para retornar conteúdo seguro e evita ataques de Cross-site Scripting (XSS).
 */
class SafePipe {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    /**
     * Transforma o valor fornecido em um conteúdo seguro, de acordo com o tipo especificado.
     *
     * @param value - O valor a ser transformado em conteúdo seguro.
     * @param type - O tipo de conteúdo seguro (html, style, script, url ou resourceUrl).
     * @returns Um objeto `SafeHtml`, `SafeStyle`, `SafeScript`, `SafeUrl` ou `SafeResourceUrl`, conforme o tipo especificado.
     */
    transform(value, type) {
        switch (type) {
            case 'html':
                return this.sanitizer.bypassSecurityTrustHtml(value);
            case 'style':
                return this.sanitizer.bypassSecurityTrustStyle(value);
            case 'script':
                return this.sanitizer.bypassSecurityTrustScript(value);
            case 'url':
                return this.sanitizer.bypassSecurityTrustUrl(value);
            case 'resourceUrl':
                return this.sanitizer.bypassSecurityTrustResourceUrl(value);
            default:
                throw new Error(`Invalid safe type specified: ${type}`);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: SafePipe, deps: [{ token: i1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.1.1", ngImport: i0, type: SafePipe, isStandalone: true, name: "safe" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: SafePipe, decorators: [{
            type: Pipe,
            args: [{
                    standalone: true,
                    name: 'safe'
                }]
        }], ctorParameters: function () { return [{ type: i1.DomSanitizer }]; } });

/**
 * Abrevia o sobrenome de uma determinada string de nome completo.
 *
 * @param name - A string com o nome completo.
 * @returns A string com o nome abreviado.
 */
function abbreviateLastName(name) {
    const nameParts = splitName(name);
    const firstName = capitalizeFirstName(nameParts);
    const abbreviatedLastName = abbreviateAndCapitalizeLastName(nameParts);
    return `${firstName} ${abbreviatedLastName}`.trim();
}
function splitName(name) {
    return name.toLowerCase().trim().split(' ');
}
function capitalizeFirstName(nameParts) {
    const firstName = nameParts[0];
    return firstName.charAt(0).toUpperCase() + firstName.slice(1);
}
function abbreviateAndCapitalizeLastName(nameParts) {
    const isLastNamePresent = nameParts.length > 1;
    if (isLastNamePresent) {
        const lastName = nameParts[nameParts.length - 1];
        return lastName.charAt(0).toUpperCase() + '.';
    }
    return '';
}

/**
 * Pipe para abreviar o sobrenome de um nome completo.
 * Transforma um nome completo em uma string com o primeiro nome e o sobrenome abreviado.
 */
class ShortNamePipe {
    /**
     * Transforma o nome completo fornecido em uma string com o primeiro nome e o sobrenome abreviado.
     *
     * @param name - O nome completo a ser transformado.
     * @returns Uma string com o primeiro nome e o sobrenome abreviado.
     */
    transform(name) {
        if (!(name || '').length) {
            return '';
        }
        return abbreviateLastName(name);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: ShortNamePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.1.1", ngImport: i0, type: ShortNamePipe, isStandalone: true, name: "shortName" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: ShortNamePipe, decorators: [{
            type: Pipe,
            args: [{
                    standalone: true,
                    name: 'shortName'
                }]
        }] });

/**
 * Pipe para exibir o tempo decorrido em formato amigável.
 * Transforma uma data em uma string representando o tempo decorrido
 */
class TimeAgoPipe extends DatePipe {
    /**
     * Transforma a data fornecida em uma string representando o tempo decorrido.
     *
     * @param value - A data a ser transformada.
     * @returns Uma string representando o tempo decorrido desde a data fornecida até o momento atual.
     */
    transform(value) {
        if (!value) {
            return '';
        }
        const d = new Date(value);
        const now = new Date();
        const seconds = Math.round(Math.abs((now.getTime() - d.getTime()) / 1000));
        const minutes = Math.round(Math.abs(seconds / 60));
        const hours = Math.round(Math.abs(minutes / 60));
        const days = Math.round(Math.abs(hours / 24));
        if (Number.isNaN(seconds)) {
            return '';
        }
        if (seconds <= 60) {
            return 'agora';
        }
        if (minutes <= 60) {
            return `há ${minutes} min`;
        }
        if (hours <= 24) {
            return `há ${hours} h`;
        }
        if (days <= 7) {
            return `há ${days} d`;
        }
        if (d.getFullYear() === now.getFullYear()) {
            return super.transform(value, "dd 'de' MMM 'às' HH:mm");
        }
        return super.transform(value, "dd 'de' MMMM 'de' yyyy");
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: TimeAgoPipe, deps: null, target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.1.1", ngImport: i0, type: TimeAgoPipe, isStandalone: true, name: "timeAgo" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: TimeAgoPipe, decorators: [{
            type: Pipe,
            args: [{
                    standalone: true,
                    name: 'timeAgo'
                }]
        }] });

const errorTailorConfig = {
    errors: {
        useValue: {
            required: 'Este campo é requerido.',
            cnpjInvalid: 'O valor informado não é um CNPJ válido.',
            cpfInvalid: 'O valor informado não é um CPF válido.',
            email: 'O valor informado não é um email válido.',
            emailInvalid: 'O valor informado não é um email válido.',
            fullNameInvalid: 'O valor informado precisa ter um nome e sobrenome.',
            minlength: ({ requiredLength, actualLength }) => `Tamanho mínimo ${requiredLength}, atual ${actualLength}`,
            mask: 'O valor informado não está no formato correto.',
            date: 'O valor informado não é uma data válida.',
            max: 'O valor informado é maior que o permitido.',
            min: 'O valor informado é menor que o permitido.'
        }
    }
};

/**
 * Converte uma imagem codificada em `base64` em um objeto `File`.
 *
 * @param base64Image - A string de imagem codificada em base64.
 * @returns O objeto `File` convertido.
 */
function base64ToFile(base64Image) {
    const split = base64Image.split(',');
    const type = split[0].replace('data:', '').replace(';base64', '');
    const byteString = window.atob(split[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i += 1) {
        ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], {
        type
    });
    const [, filetype] = blob.type.split('/');
    return new File([blob], `${v4()}.${filetype}`, {
        type
    });
}

/**
 * Gera um identificador único com um prefixo "id".
 *
 * @returns Uma string contendo um identificador único com o formato "id{UUID}".
 */
function inputUUID() {
    return `id${v4()}`;
}

class LocalStorage {
    static getItem(key) {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }
    static setItem(key, value) {
        const stringify = JSON.stringify(value);
        localStorage.setItem(key, stringify);
    }
    static removeItem(key) {
        localStorage.removeItem(key);
    }
    static clear() {
        localStorage.clear();
    }
}

/**
 * Lê um `File` e retorna seus dados no formato de URL Data.
 *
 * @param file - O arquivo a ser lido.
 * @returns Uma `Promise` que resolve em uma `string` contendo a URL Data do arquivo ou `null`.
 */
function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = () => {
            reject();
        };
        fileReader.readAsDataURL(file);
    });
}

/**
 * Remove acentos de uma string.
 *
 * @param text A string de entrada a ser processada.
 * @returns A string com os acentos removidos.
 */
function removeAccents(text) {
    const normalizationForm = 'NFD';
    const accentPattern = /[\u0300-\u036f]/g;
    return text.normalize(normalizationForm).replace(accentPattern, '');
}

/**
 * Remova caracteres não numéricos de uma string.
 *
 * @param text A string de entrada a ser processada.
 * @returns A string contendo apenas caracteres de dígitos.
 */
function removeNonDigits(text) {
    return text.replace(/\D/g, '');
}

/**
 * Valida um número de CNPJ (Cadastro Nacional da Pessoa Jurídica).
 *
 * @example <caption>Valide se o campo corresponde a um CNPJ válido</caption>
 * ```typescript
 * const control = new FormControl('11111111111111', cnpjValidator);
 *
 * console.log(control.errors); // {cnpjInvalid: true}
 * ```
 *
 * @param control - O `AbstractControl` do formulário a ser validado.
 * @returns Retorna um objeto de erro com a chave `cnpjInvalid` se o CNPJ for inválido, caso contrário retorna `null`.
 */
function cnpjValidator(control) {
    if (!control.value) {
        return null;
    }
    const cnpj = String(control.value).replace(/\D/g, '');
    if (cnpj.length !== 14) {
        return { cnpjInvalid: true };
    }
    if (!cnpj ||
        cnpj.length !== 14 ||
        cnpj === '00000000000000' ||
        cnpj === '11111111111111' ||
        cnpj === '22222222222222' ||
        cnpj === '33333333333333' ||
        cnpj === '44444444444444' ||
        cnpj === '55555555555555' ||
        cnpj === '66666666666666' ||
        cnpj === '77777777777777' ||
        cnpj === '88888888888888' ||
        cnpj === '99999999999999') {
        return { cnpjInvalid: true };
    }
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += Number(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }
    let resultado = (soma % 11 < 2 ? 0 : 11 - (soma % 11)).toString();
    if (resultado !== digitos.charAt(0)) {
        return { cnpjInvalid: true };
    }
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += Number(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }
    resultado = (soma % 11 < 2 ? 0 : 11 - (soma % 11)).toString();
    if (resultado !== digitos.charAt(1)) {
        return { cnpjInvalid: true };
    }
    return null;
}

/**
 * Valida um número de CPF (Cadastro de Pessoas Físicas).
 *
 * @example <caption>Valide se o campo corresponde a um CPF válido</caption>
 * ```typescript
 * const control = new FormControl('11111111111', cpfValidator);
 *
 * console.log(control.errors); // {cpfInvalid: true}
 * ```
 *
 * @param control - O `AbstractControl` do formulário a ser validado.
 * @returns Retorna um objeto de erro com a chave `cpfInvalid` se o CPF for inválido, caso contrário retorna `null`.
 */
function cpfValidator(control) {
    if (!control.value) {
        return null;
    }
    const cpf = String(control.value).replace(/\D/g, '');
    if (cpf.length !== 11) {
        return { cpfInvalid: true };
    }
    if (cpf === '00000000000' ||
        cpf === '11111111111' ||
        cpf === '22222222222' ||
        cpf === '33333333333' ||
        cpf === '44444444444' ||
        cpf === '55555555555' ||
        cpf === '66666666666' ||
        cpf === '77777777777' ||
        cpf === '88888888888' ||
        cpf === '99999999999') {
        return { cpfInvalid: true };
    }
    let soma = 0;
    for (let i = 1; i <= 9; i += 1) {
        soma = soma + parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.substring(9, 10), 10)) {
        return { cpfInvalid: true };
    }
    soma = 0;
    for (let i = 1; i <= 10; i += 1) {
        soma = soma + parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    if (resto === parseInt(cpf.substring(10, 11), 10)) {
        return null;
    }
    return { cpfInvalid: true };
}

/**
 * Valida o formato do endereço de e-mail.
 *
 * @example <caption>Valide se o campo corresponde a um e-mail válido</caption>
 * ```typescript
 * const control = new FormControl('bad@', emailValidator);
 *
 * console.log(control.errors); // {emailInvalid: true}
 * ```
 *
 * @param control - O `AbstractControl` do formulário a ser validado.
 * @returns Retorna um objeto de erro com a chave `emailInvalid` se o e-mail for inválido, caso contrário retorna `null`.
 */
function emailValidator(control) {
    if (!control.value) {
        return null;
    }
    const REGEX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (REGEX_EMAIL.test(control.value.toLowerCase())) {
        return null;
    }
    return { emailInvalid: true };
}

/**
 * Valida o formato do nome completo de um controle de formulário fornecido.
 * Um nome completo deve conter pelo menos duas palavras e a segunda palavra deve ter mais de um caractere.
 *
 * @example <caption>Valide se o campo corresponde a um nome com sobrenome</caption>
 * ```typescript
 * const control = new FormControl('John', fullNameValidator);
 *
 * console.log(control.errors); // {fullNameInvalid: true}
 * ```
 *
 * @param control - O `AbstractControl` do formulário a ser validado.
 * @returns Retorna um objeto de erro com a chave `fullNameInvalid` se o nome completo for inválido, caso contrário retorna `null`.
 */
function fullNameValidator(control) {
    if (!control.value) {
        return null;
    }
    const split = String(control.value).split(' ');
    if (split.length > 1 && split[1].length > 1) {
        return null;
    }
    return { fullNameInvalid: true };
}

/**
 * Generated bundle index. Do not edit.
 */

export { AgePipe, ApiError, AppError, DocumentNotFoundError, FilterPipe, FirebaseAbstract, ImgFallbackDirective, LocalStorage, SafePipe, ShortNamePipe, TimeAgoPipe, abbreviateLastName, apiErrosTranslate, base64ToFile, calculateAge, cnpjValidator, cpfValidator, emailValidator, errorTailorConfig, fullNameValidator, getApiError, inputUUID, ofFirestore, readFileAsDataURL, removeAccents, removeNonDigits, toFirestore, toNativeTypes };
//# sourceMappingURL=burand-angular.mjs.map
