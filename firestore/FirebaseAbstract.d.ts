import { CollectionReference, Firestore, OrderByDirection, SetOptions, WhereFilterOp, Query, QueryCompositeFilterConstraint, QueryConstraint, QueryNonFilterConstraint } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AddDocument, FirebaseWhere, SetDocument, UpdateDocument } from '../typings/repoTypes';
import { Model } from './Model';
type WriteOptions = {
    /**
     * Adicionar atributos `createdAt` em criações e `updatedAt` em atualizações
     */
    timestamps: boolean;
};
type ReadOptions = {
    /**
     * Converter atributos `createdAt` e `updatedAt` no tipo `Date` do JavaScript
     */
    timestamps: boolean;
};
/**
 * A interface do serviço Cloud Firestore.
 *
 * Não chame esse construtor diretamente.
 * Em vez disso, crie um repositório e estenda o comportamento
 *
 * @template T - O tipo de modelo que representa os documentos armazenados no Firestore.
 */
export declare abstract class FirebaseAbstract<T extends Model> {
    protected firestore: Firestore;
    protected collectionName: string;
    /**
     * @param firestore - Referência do Firestore
     * @param collectionName - Nome da coleção no Firestore
     */
    constructor(firestore: Firestore, collectionName: string);
    /**
     * Adiciona um novo documento ao Firestore.
     *
     * @param data - Um objeto contendo os dados do novo documento.
     * @param options - Um objeto para configurar o comportamento de escrita.
     * @returns Uma `Promise` resolvida com o id do documento criado.
     */
    add(data: AddDocument<T>, options?: WriteOptions): Promise<string>;
    /**
     * Atualiza um documento existente no Firestore.
     *
     * @param data - Um objeto contendo os dados a serem alterados.
     * @param options - Um objeto para configurar o comportamento de escrita.
     * @returns Uma `Promise` resolvida vazia.
     */
    update(data: UpdateDocument<T>, options?: WriteOptions): Promise<void>;
    /**
     * Grava no documento referenciado pelo `id` especificado. Se
     * o documento ainda não existe, ele será criado. Se você fornecer `merge`
     * ou `mergeFields`, os dados fornecidos podem ser mesclados em um documento existente.
     *
     * @param data - Um objeto contendo os dados a serem adicionados ou alterados.
     * @param options - Um objeto para configurar o comportamento de escrita.
     * @returns Uma `Promise` resolvida vazia.
     */
    set(data: SetDocument<T>, options?: SetOptions & WriteOptions): Promise<void>;
    /**
     * Exclui o documento referenciado pelo `id` especificado.
     *
     * @param id - O id do documento a ser excluído.
     * @returns Uma `Promise` resolvida vazia.
     */
    delete(id: string): Promise<void>;
    /**
     * Busca um documento pelo seu id.
     *
     * @param id - O id do documento a ser buscado.
     * @param options - Um objeto para configurar o comportamento de leitura.
     * @throws {DocumentNotFoundError}
     * @returns Uma `Promise` resolvida com o conteúdo do documento.
     */
    getById<U extends T = T>(id: string, options?: ReadOptions): Promise<U>;
    /**
     * Busca um documento pelo seu id.
     *
     * @param id - O id do documento a ser buscado.
     * @param options - Um objeto para configurar o comportamento de leitura.
     * @returns Um `Observable` para eventos.
     */
    getAsyncById<U extends T = T>(id: string, options?: ReadOptions): Observable<U | null>;
    /**
     * Busca documentos por seus Ids.
     *
     * @param ids - Os ids dos documentos a serem buscados.
     * @param options - Um objeto para configurar o comportamento de leitura.
     * @returns Uma `Promise` resolvida com o conteúdo dos documentos.
     */
    getByIds<U extends T = T>(ids: string[], options?: ReadOptions): Promise<U[]>;
    /**
     * Busca todos os documentos da coleção.
     *
     * @param options - Um objeto para configurar o comportamento de leitura.
     * @returns Uma `Promise` resolvida com o conteúdo dos documentos.
     */
    getAll<U extends T = T>(options?: ReadOptions): Promise<U[]>;
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
    protected getWhere<U extends T = T>(field: keyof T, operator: WhereFilterOp, value: unknown, limit?: number | null, orderBy?: keyof T | null, orderByDirection?: OrderByDirection | null, options?: ReadOptions): Promise<U[]>;
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
    protected getWhereMany<U extends T = T>(filters: FirebaseWhere<T>[], limit?: number | null, orderBy?: keyof T | null, orderByDirection?: OrderByDirection | null, options?: ReadOptions): Promise<U[]>;
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
    protected getOneWhere<U extends T = T>(field: keyof T, operator: WhereFilterOp, value: unknown, orderBy?: keyof T | null, orderByDirection?: OrderByDirection | null, options?: ReadOptions): Promise<U | null>;
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
    protected getOneWhereMany<U extends T = T>(filters: FirebaseWhere<T>[], orderBy?: keyof T | null, orderByDirection?: OrderByDirection | null, options?: ReadOptions): Promise<U | null>;
    /**
     * Cria uma nova instância imutável de {@link Query} que também é estendida para
     * incluir restrições de consulta adicionais.
     *
     * @param compositeFilter - A {@link QueryCompositeFilterConstraint} a
     * ser aplicada. Crie uma {@link QueryCompositeFilterConstraint} usando {@link and} ou
     * {@link or}.
     * @param queryConstraints - Adicionais {@link QueryNonFilterConstraint}s a
     * serem aplicadas (por exemplo, {@link orderBy}, {@link limit}).
     * @throws Se qualquer uma das restrições de consulta fornecidas não puderem ser combinadas com as
     * restrições existentes ou novas.
     */
    protected query(compositeFilter: QueryCompositeFilterConstraint, ...queryConstraints: QueryNonFilterConstraint[]): Query;
    /**
     * Cria uma nova instância imutável de {@link Query} que também é estendida para
     * incluir restrições de consulta adicionais.
     *
     * @param queryConstraints - A lista de {@link QueryConstraint}s a serem aplicadas.
     * @throws Se qualquer uma das restrições de consulta fornecidas não puderem ser combinadas com as
     * restrições existentes ou novas.
     */
    protected query(...queryConstraints: QueryConstraint[]): Query;
    /**
     * Realiza uma consulta no Firestore com base nas restrições de consulta fornecidas.
     *
     * @param query - A instância de `Query` a ser usada como base para as restrições.
     * @param options - Um objeto para configurar o comportamento de leitura.
     * @returns Uma `Promise` resolvida com um array de documentos `T`.
     */
    protected getDocs<U extends T = T>(query: Query, options?: ReadOptions): Promise<U[]>;
    /**
     * Obtém uma instância `CollectionReference` que se refere à coleção no caminho absoluto especificado por `collectionName`.
     *
     * @returns A instância de `CollectionReference`.
     */
    protected collection(): CollectionReference;
}
export {};
