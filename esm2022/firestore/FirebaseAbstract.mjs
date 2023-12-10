import { addDoc, collection, deleteDoc, doc, docSnapshots, getDoc, getDocs, orderBy as queryOrderBy, limit as queryLimit, query, serverTimestamp, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { DocumentNotFoundError } from '../exceptions/DocumentNotFoundError';
import { ofFirestore } from './ofFirestore';
import { toFirestore } from './toFirestore';
/**
 * A interface do serviço Cloud Firestore.
 *
 * Não chame esse construtor diretamente.
 * Em vez disso, crie um repositório e estenda o comportamento
 *
 * @template T - O tipo de modelo que representa os documentos armazenados no Firestore.
 */
export class FirebaseAbstract {
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
    async getWhere(field, operator, value, limit = null, orderBy = null, orderByDirection = null, options = { timestamps: true }) {
        const queryConstraints = [where(field, operator, value)];
        if (limit) {
            queryConstraints.push(queryLimit(limit));
        }
        if (orderBy) {
            queryConstraints.push(queryOrderBy(orderBy, orderByDirection || 'asc'));
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
    async getWhereMany(filters, limit = null, orderBy = null, orderByDirection = null, options = { timestamps: true }) {
        const queryConstraints = filters.map(filter => {
            if (Array.isArray(filter)) {
                return where(filter[0], filter[1], filter[2]);
            }
            else {
                return where(filter.field, filter.operator, filter.value);
            }
        });
        if (orderBy) {
            queryConstraints.push(queryOrderBy(orderBy, orderByDirection || 'asc'));
        }
        if (limit) {
            queryConstraints.push(queryLimit(limit));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlyZWJhc2VBYnN0cmFjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9maXJlc3RvcmUvRmlyZWJhc2VBYnN0cmFjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsTUFBTSxFQUNOLFVBQVUsRUFFVixTQUFTLEVBQ1QsR0FBRyxFQUNILFlBQVksRUFFWixNQUFNLEVBQ04sT0FBTyxFQUNQLE9BQU8sSUFBSSxZQUFZLEVBRXZCLEtBQUssSUFBSSxVQUFVLEVBQ25CLEtBQUssRUFDTCxlQUFlLEVBQ2YsTUFBTSxFQUVOLFNBQVMsRUFDVCxLQUFLLEVBTU4sTUFBTSx5QkFBeUIsQ0FBQztBQUVqQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFFNUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBaUI1Qzs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxPQUFnQixnQkFBZ0I7SUFDcEM7OztPQUdHO0lBQ0gsWUFBNkIsU0FBb0IsRUFBWSxjQUFzQjtRQUF0RCxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQVksbUJBQWMsR0FBZCxjQUFjLENBQVE7SUFBRyxDQUFDO0lBRXZGOzs7Ozs7T0FNRztJQUNJLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBb0IsRUFBRSxVQUF3QixFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUU7UUFDakYsTUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWhDLElBQUksT0FBTyxDQUFDLFVBQVUsRUFBRTtZQUN0QixLQUFLLENBQUMsU0FBUyxHQUFHLGVBQWUsRUFBRSxDQUFDO1lBQ3BDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQ3hCO1FBRUQsT0FBTyxL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RUFBRSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVEOzs7O09BSUc7SUFDTyxVQUFVO1FBQ2xCLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgYWRkRG9jLFxyXG4gIGNvbGxlY3Rpb24sXHJcbiAgQ29sbGVjdGlvblJlZmVyZW5jZSxcclxuICBkZWxldGVEb2MsXHJcbiAgZG9jLFxyXG4gIGRvY1NuYXBzaG90cyxcclxuICBGaXJlc3RvcmUsXHJcbiAgZ2V0RG9jLFxyXG4gIGdldERvY3MsXHJcbiAgb3JkZXJCeSBhcyBxdWVyeU9yZGVyQnksXHJcbiAgT3JkZXJCeURpcmVjdGlvbixcclxuICBsaW1pdCBhcyBxdWVyeUxpbWl0LFxyXG4gIHF1ZXJ5LFxyXG4gIHNlcnZlclRpbWVzdGFtcCxcclxuICBzZXREb2MsXHJcbiAgU2V0T3B0aW9ucyxcclxuICB1cGRhdGVEb2MsXHJcbiAgd2hlcmUsXHJcbiAgV2hlcmVGaWx0ZXJPcCxcclxuICBRdWVyeSxcclxuICBRdWVyeUNvbXBvc2l0ZUZpbHRlckNvbnN0cmFpbnQsXHJcbiAgUXVlcnlDb25zdHJhaW50LFxyXG4gIFF1ZXJ5Tm9uRmlsdGVyQ29uc3RyYWludFxyXG59IGZyb20gJ0Bhbmd1bGFyL2ZpcmUvZmlyZXN0b3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBEb2N1bWVudE5vdEZvdW5kRXJyb3IgfSBmcm9tICcuLi9leGNlcHRpb25zL0RvY3VtZW50Tm90Rm91bmRFcnJvcic7XHJcbmltcG9ydCB7IEFkZERvY3VtZW50LCBGaXJlYmFzZVdoZXJlLCBTZXREb2N1bWVudCwgVXBkYXRlRG9jdW1lbnQgfSBmcm9tICcuLi90eXBpbmdzL3JlcG9UeXBlcyc7XHJcbmltcG9ydCB7IG9mRmlyZXN0b3JlIH0gZnJvbSAnLi9vZkZpcmVzdG9yZSc7XHJcbmltcG9ydCB7IHRvRmlyZXN0b3JlIH0gZnJvbSAnLi90b0ZpcmVzdG9yZSc7XHJcbmltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi9Nb2RlbCc7XHJcblxyXG50eXBlIFdyaXRlT3B0aW9ucyA9IHtcclxuICAvKipcclxuICAgKiBBZGljaW9uYXIgYXRyaWJ1dG9zIGBjcmVhdGVkQXRgIGVtIGNyaWHDp8O1ZXMgZSBgdXBkYXRlZEF0YCBlbSBhdHVhbGl6YcOnw7Vlc1xyXG4gICAqL1xyXG4gIHRpbWVzdGFtcHM6IGJvb2xlYW47XHJcbn07XHJcblxyXG50eXBlIFJlYWRPcHRpb25zID0ge1xyXG4gIC8qKlxyXG4gICAqIENvbnZlcnRlciBhdHJpYnV0b3MgYGNyZWF0ZWRBdGAgZSBgdXBkYXRlZEF0YCBubyB0aXBvIGBEYXRlYCBkbyBKYXZhU2NyaXB0XHJcbiAgICovXHJcbiAgdGltZXN0YW1wczogYm9vbGVhbjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBIGludGVyZmFjZSBkbyBzZXJ2acOnbyBDbG91ZCBGaXJlc3RvcmUuXHJcbiAqXHJcbiAqIE7Do28gY2hhbWUgZXNzZSBjb25zdHJ1dG9yIGRpcmV0YW1lbnRlLlxyXG4gKiBFbSB2ZXogZGlzc28sIGNyaWUgdW0gcmVwb3NpdMOzcmlvIGUgZXN0ZW5kYSBvIGNvbXBvcnRhbWVudG9cclxuICpcclxuICogQHRlbXBsYXRlIFQgLSBPIHRpcG8gZGUgbW9kZWxvIHF1ZSByZXByZXNlbnRhIG9zIGRvY3VtZW50b3MgYXJtYXplbmFkb3Mgbm8gRmlyZXN0b3JlLlxyXG4gKi9cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEZpcmViYXNlQWJzdHJhY3Q8VCBleHRlbmRzIE1vZGVsPiB7XHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIGZpcmVzdG9yZSAtIFJlZmVyw6puY2lhIGRvIEZpcmVzdG9yZVxyXG4gICAqIEBwYXJhbSBjb2xsZWN0aW9uTmFtZSAtIE5vbWUgZGEgY29sZcOnw6NvIG5vIEZpcmVzdG9yZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZmlyZXN0b3JlOiBGaXJlc3RvcmUsIHByb3RlY3RlZCBjb2xsZWN0aW9uTmFtZTogc3RyaW5nKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBBZGljaW9uYSB1bSBub3ZvIGRvY3VtZW50byBhbyBGaXJlc3RvcmUuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gZGF0YSAtIFVtIG9iamV0byBjb250ZW5kbyBvcyBkYWRvcyBkbyBub3ZvIGRvY3VtZW50by5cclxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIFVtIG9iamV0byBwYXJhIGNvbmZpZ3VyYXIgbyBjb21wb3J0YW1lbnRvIGRlIGVzY3JpdGEuXHJcbiAgICogQHJldHVybnMgVW1hIGBQcm9taXNlYCByZXNvbHZpZGEgY29tIG8gaWQgZG8gZG9jdW1lbnRvIGNyaWFkby5cclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgYWRkKGRhdGE6IEFkZERvY3VtZW50PFQ+LCBvcHRpb25zOiBXcml0ZU9wdGlvbnMgPSB7IHRpbWVzdGFtcHM6IHRydWUgfSk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICBjb25zdCBjbG9uZSA9IHRvRmlyZXN0b3JlKGRhdGEpO1xyXG5cclxuICAgIGlmIChvcHRpb25zLnRpbWVzdGFtcHMpIHtcclxuICAgICAgY2xvbmUuY3JlYXRlZEF0ID0gc2VydmVyVGltZXN0YW1wKCk7XHJcbiAgICAgIGNsb25lLnVwZGF0ZWRBdCA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlIGNsb25lLmlkO1xyXG5cclxuICAgIGNvbnN0IHsgaWQgfSA9IGF3YWl0IGFkZERvYyh0aGlzLmNvbGxlY3Rpb24oKSwgY2xvbmUpO1xyXG5cclxuICAgIHJldHVybiBpZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEF0dWFsaXphIHVtIGRvY3VtZW50byBleGlzdGVudGUgbm8gRmlyZXN0b3JlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGRhdGEgLSBVbSBvYmpldG8gY29udGVuZG8gb3MgZGFkb3MgYSBzZXJlbSBhbHRlcmFkb3MuXHJcbiAgICogQHBhcmFtIG9wdGlvbnMgLSBVbSBvYmpldG8gcGFyYSBjb25maWd1cmFyIG8gY29tcG9ydGFtZW50byBkZSBlc2NyaXRhLlxyXG4gICAqIEByZXR1cm5zIFVtYSBgUHJvbWlzZWAgcmVzb2x2aWRhIHZhemlhLlxyXG4gICAqL1xyXG4gIHB1YmxpYyB1cGRhdGUoZGF0YTogVXBkYXRlRG9jdW1lbnQ8VD4sIG9wdGlvbnM6IFdyaXRlT3B0aW9ucyA9IHsgdGltZXN0YW1wczogdHJ1ZSB9KTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBjb25zdCBjbG9uZSA9IHRvRmlyZXN0b3JlKGRhdGEpO1xyXG5cclxuICAgIGlmIChvcHRpb25zLnRpbWVzdGFtcHMpIHtcclxuICAgICAgY2xvbmUudXBkYXRlZEF0ID0gc2VydmVyVGltZXN0YW1wKCk7XHJcbiAgICAgIGRlbGV0ZSBjbG9uZS5jcmVhdGVkQXQ7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlIGNsb25lLmlkO1xyXG5cclxuICAgIGNvbnN0IGRvY1JlZiA9IGRvYyh0aGlzLmNvbGxlY3Rpb24oKSwgZGF0YS5pZCk7XHJcblxyXG4gICAgcmV0dXJuIHVwZGF0ZURvYyhkb2NSZWYsIGNsb25lKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdyYXZhIG5vIGRvY3VtZW50byByZWZlcmVuY2lhZG8gcGVsbyBgaWRgIGVzcGVjaWZpY2Fkby4gU2VcclxuICAgKiBvIGRvY3VtZW50byBhaW5kYSBuw6NvIGV4aXN0ZSwgZWxlIHNlcsOhIGNyaWFkby4gU2Ugdm9jw6ogZm9ybmVjZXIgYG1lcmdlYFxyXG4gICAqIG91IGBtZXJnZUZpZWxkc2AsIG9zIGRhZG9zIGZvcm5lY2lkb3MgcG9kZW0gc2VyIG1lc2NsYWRvcyBlbSB1bSBkb2N1bWVudG8gZXhpc3RlbnRlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGRhdGEgLSBVbSBvYmpldG8gY29udGVuZG8gb3MgZGFkb3MgYSBzZXJlbSBhZGljaW9uYWRvcyBvdSBhbHRlcmFkb3MuXHJcbiAgICogQHBhcmFtIG9wdGlvbnMgLSBVbSBvYmpldG8gcGFyYSBjb25maWd1cmFyIG8gY29tcG9ydGFtZW50byBkZSBlc2NyaXRhLlxyXG4gICAqIEByZXR1cm5zIFVtYSBgUHJvbWlzZWAgcmVzb2x2aWRhIHZhemlhLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzZXQoZGF0YTogU2V0RG9jdW1lbnQ8VD4sIG9wdGlvbnM6IFNldE9wdGlvbnMgJiBXcml0ZU9wdGlvbnMgPSB7IHRpbWVzdGFtcHM6IHRydWUgfSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgY29uc3QgY2xvbmUgPSB0b0ZpcmVzdG9yZShkYXRhKTtcclxuXHJcbiAgICBpZiAob3B0aW9ucy50aW1lc3RhbXBzKSB7XHJcbiAgICAgIGNsb25lLmNyZWF0ZWRBdCA9IHNlcnZlclRpbWVzdGFtcCgpO1xyXG4gICAgICBjbG9uZS51cGRhdGVkQXQgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZSBjbG9uZS5pZDtcclxuXHJcbiAgICBjb25zdCBkb2NSZWYgPSBkb2ModGhpcy5jb2xsZWN0aW9uKCksIGRhdGEuaWQpO1xyXG5cclxuICAgIHJldHVybiBzZXREb2MoZG9jUmVmLCBjbG9uZSwgb3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFeGNsdWkgbyBkb2N1bWVudG8gcmVmZXJlbmNpYWRvIHBlbG8gYGlkYCBlc3BlY2lmaWNhZG8uXHJcbiAgICpcclxuICAgKiBAcGFyYW0gaWQgLSBPIGlkIGRvIGRvY3VtZW50byBhIHNlciBleGNsdcOtZG8uXHJcbiAgICogQHJldHVybnMgVW1hIGBQcm9taXNlYCByZXNvbHZpZGEgdmF6aWEuXHJcbiAgICovXHJcbiAgcHVibGljIGRlbGV0ZShpZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gZGVsZXRlRG9jKGRvYyh0aGlzLmNvbGxlY3Rpb24oKSwgaWQpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEJ1c2NhIHVtIGRvY3VtZW50byBwZWxvIHNldSBpZC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBpZCAtIE8gaWQgZG8gZG9jdW1lbnRvIGEgc2VyIGJ1c2NhZG8uXHJcbiAgICogQHBhcmFtIG9wdGlvbnMgLSBVbSBvYmpldG8gcGFyYSBjb25maWd1cmFyIG8gY29tcG9ydGFtZW50byBkZSBsZWl0dXJhLlxyXG4gICAqIEB0aHJvd3Mge0RvY3VtZW50Tm90Rm91bmRFcnJvcn1cclxuICAgKiBAcmV0dXJucyBVbWEgYFByb21pc2VgIHJlc29sdmlkYSBjb20gbyBjb250ZcO6ZG8gZG8gZG9jdW1lbnRvLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBnZXRCeUlkPFUgZXh0ZW5kcyBUID0gVD4oaWQ6IHN0cmluZywgb3B0aW9uczogUmVhZE9wdGlvbnMgPSB7IHRpbWVzdGFtcHM6IHRydWUgfSk6IFByb21pc2U8VT4ge1xyXG4gICAgY29uc3QgZG9jU25hcCA9IGF3YWl0IGdldERvYyhkb2ModGhpcy5jb2xsZWN0aW9uKCksIGlkKSk7XHJcblxyXG4gICAgaWYgKCFkb2NTbmFwLmV4aXN0cygpKSB7XHJcbiAgICAgIHRocm93IG5ldyBEb2N1bWVudE5vdEZvdW5kRXJyb3IoaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvZkZpcmVzdG9yZShkb2NTbmFwLCBvcHRpb25zLnRpbWVzdGFtcHMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQnVzY2EgdW0gZG9jdW1lbnRvIHBlbG8gc2V1IGlkLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGlkIC0gTyBpZCBkbyBkb2N1bWVudG8gYSBzZXIgYnVzY2Fkby5cclxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIFVtIG9iamV0byBwYXJhIGNvbmZpZ3VyYXIgbyBjb21wb3J0YW1lbnRvIGRlIGxlaXR1cmEuXHJcbiAgICogQHJldHVybnMgVW0gYE9ic2VydmFibGVgIHBhcmEgZXZlbnRvcy5cclxuICAgKi9cclxuICBwdWJsaWMgZ2V0QXN5bmNCeUlkPFUgZXh0ZW5kcyBUID0gVD4oaWQ6IHN0cmluZywgb3B0aW9uczogUmVhZE9wdGlvbnMgPSB7IHRpbWVzdGFtcHM6IHRydWUgfSk6IE9ic2VydmFibGU8VSB8IG51bGw+IHtcclxuICAgIGNvbnN0IGRvY1JlZiA9IGRvYyh0aGlzLmNvbGxlY3Rpb24oKSwgaWQpO1xyXG5cclxuICAgIHJldHVybiBkb2NTbmFwc2hvdHMoZG9jUmVmKS5waXBlKFxyXG4gICAgICBtYXAoZG9jU25hcCA9PiAoZG9jU25hcC5leGlzdHMoKSA/IG9mRmlyZXN0b3JlKGRvY1NuYXAsIG9wdGlvbnMudGltZXN0YW1wcykgOiBudWxsKSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBCdXNjYSBkb2N1bWVudG9zIHBvciBzZXVzIElkcy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBpZHMgLSBPcyBpZHMgZG9zIGRvY3VtZW50b3MgYSBzZXJlbSBidXNjYWRvcy5cclxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIFVtIG9iamV0byBwYXJhIGNvbmZpZ3VyYXIgbyBjb21wb3J0YW1lbnRvIGRlIGxlaXR1cmEuXHJcbiAgICogQHJldHVybnMgVW1hIGBQcm9taXNlYCByZXNvbHZpZGEgY29tIG8gY29udGXDumRvIGRvcyBkb2N1bWVudG9zLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBnZXRCeUlkczxVIGV4dGVuZHMgVCA9IFQ+KGlkczogc3RyaW5nW10sIG9wdGlvbnM6IFJlYWRPcHRpb25zID0geyB0aW1lc3RhbXBzOiB0cnVlIH0pOiBQcm9taXNlPFVbXT4ge1xyXG4gICAgY29uc3QgcHJvbWlzZXMgPSBpZHMubWFwKGlkID0+IHRoaXMuZ2V0QnlJZDxVPihpZCwgb3B0aW9ucykpO1xyXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEJ1c2NhIHRvZG9zIG9zIGRvY3VtZW50b3MgZGEgY29sZcOnw6NvLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIG9wdGlvbnMgLSBVbSBvYmpldG8gcGFyYSBjb25maWd1cmFyIG8gY29tcG9ydGFtZW50byBkZSBsZWl0dXJhLlxyXG4gICAqIEByZXR1cm5zIFVtYSBgUHJvbWlzZWAgcmVzb2x2aWRhIGNvbSBvIGNvbnRlw7pkbyBkb3MgZG9jdW1lbnRvcy5cclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgZ2V0QWxsPFUgZXh0ZW5kcyBUID0gVD4ob3B0aW9uczogUmVhZE9wdGlvbnMgPSB7IHRpbWVzdGFtcHM6IHRydWUgfSk6IFByb21pc2U8VVtdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXREb2NzKHRoaXMuY29sbGVjdGlvbigpLCBvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlY3VwZXJhIGRvY3VtZW50b3MgZGEgY29sZcOnw6NvIGNvbSBiYXNlIG5vIGNhbXBvLCBvcGVyYWRvciBlIHZhbG9yIGZvcm5lY2lkb3MsIGJlbSBjb21vIGVtIG9ww6fDtWVzIGFkaWNpb25haXMuXHJcbiAgICpcclxuICAgKiBAYXN5bmNcclxuICAgKiBAcGFyYW0gZmllbGQgLSBBIGNoYXZlIGRvIGNhbXBvIHBlbG8gcXVhbCBvcyBkb2N1bWVudG9zIGRldmVtIHNlciBmaWx0cmFkb3MuXHJcbiAgICogQHBhcmFtIG9wZXJhdG9yIC0gTyBvcGVyYWRvciBhIHNlciB1c2FkbyBuYSBmaWx0cmFnZW0gKHBvciBleGVtcGxvLCBcIj09XCIgb3UgXCI+XCIpLlxyXG4gICAqIEBwYXJhbSB2YWx1ZSAtIE8gdmFsb3IgYSBzZXIgY29tcGFyYWRvIG5hIGZpbHRyYWdlbS5cclxuICAgKiBAcGFyYW0gbGltaXQgLSBPIG7Dum1lcm8gbcOheGltbyBkZSBkb2N1bWVudG9zIGEgc2VyZW0gcmV0b3JuYWRvcy5cclxuICAgKiBAcGFyYW0gb3JkZXJCeSAtIEEgY2hhdmUgZG8gY2FtcG8gcGVsbyBxdWFsIG9zIHJlc3VsdGFkb3MgZGV2ZW0gc2VyIG9yZGVuYWRvcy5cclxuICAgKiBAcGFyYW0gb3JkZXJCeURpcmVjdGlvbiAtIEEgZGlyZcOnw6NvIG5hIHF1YWwgb3MgcmVzdWx0YWRvcyBkZXZlbSBzZXIgb3JkZW5hZG9zLlxyXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gQXMgb3DDp8O1ZXMgYWRpY2lvbmFpcyBwYXJhIGEgbGVpdHVyYSBkb3MgZG9jdW1lbnRvcy5cclxuICAgKiBAcmV0dXJucyBVbWEgYFByb21pc2VgIHJlc29sdmlkYSBjb20gdW0gYXJyYXkgZGUgZG9jdW1lbnRvcyBgVGAuXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGFzeW5jIGdldFdoZXJlPFUgZXh0ZW5kcyBUID0gVD4oXHJcbiAgICBmaWVsZDoga2V5b2YgVCxcclxuICAgIG9wZXJhdG9yOiBXaGVyZUZpbHRlck9wLFxyXG4gICAgdmFsdWU6IHVua25vd24sXHJcbiAgICBsaW1pdDogbnVtYmVyIHwgbnVsbCA9IG51bGwsXHJcbiAgICBvcmRlckJ5OiBrZXlvZiBUIHwgbnVsbCA9IG51bGwsXHJcbiAgICBvcmRlckJ5RGlyZWN0aW9uOiBPcmRlckJ5RGlyZWN0aW9uIHwgbnVsbCA9IG51bGwsXHJcbiAgICBvcHRpb25zOiBSZWFkT3B0aW9ucyA9IHsgdGltZXN0YW1wczogdHJ1ZSB9XHJcbiAgKTogUHJvbWlzZTxVW10+IHtcclxuICAgIGNvbnN0IHF1ZXJ5Q29uc3RyYWludHM6IFF1ZXJ5Q29uc3RyYWludFtdID0gW3doZXJlKGZpZWxkIGFzIHN0cmluZywgb3BlcmF0b3IsIHZhbHVlKV07XHJcblxyXG4gICAgaWYgKGxpbWl0KSB7XHJcbiAgICAgIHF1ZXJ5Q29uc3RyYWludHMucHVzaChxdWVyeUxpbWl0KGxpbWl0KSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9yZGVyQnkpIHtcclxuICAgICAgcXVlcnlDb25zdHJhaW50cy5wdXNoKHF1ZXJ5T3JkZXJCeShvcmRlckJ5IGFzIHN0cmluZywgb3JkZXJCeURpcmVjdGlvbiB8fCAnYXNjJykpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHEgPSBxdWVyeSh0aGlzLmNvbGxlY3Rpb24oKSwgLi4ucXVlcnlDb25zdHJhaW50cyk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZ2V0RG9jcyhxLCBvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlY3VwZXJhIHbDoXJpb3MgZG9jdW1lbnRvcyBkYSBjb2xlw6fDo28gY29tIGJhc2Ugbm9zIGZpbHRyb3MgZm9ybmVjaWRvcyBlIG9ww6fDtWVzIGFkaWNpb25haXMuXHJcbiAgICpcclxuICAgKiBAYXN5bmNcclxuICAgKiBAcGFyYW0gZmlsdGVycyAtIFVtIGFycmF5IGRlIG9iamV0b3MgZGUgZmlsdHJvIEZpcmViYXNlLCBjYWRhIHVtIGNvbnRlbmRvIHVtIGNhbXBvLCB1bSBvcGVyYWRvciBlIHVtIHZhbG9yLlxyXG4gICAqIEBwYXJhbSBsaW1pdCAtIE8gbsO6bWVybyBtw6F4aW1vIGRlIGRvY3VtZW50b3MgYSBzZXJlbSByZXRvcm5hZG9zLlxyXG4gICAqIEBwYXJhbSBvcmRlckJ5IC0gQSBjaGF2ZSBkbyBjYW1wbyBwZWxvIHF1YWwgb3MgcmVzdWx0YWRvcyBkZXZlbSBzZXIgb3JkZW5hZG9zLlxyXG4gICAqIEBwYXJhbSBvcmRlckJ5RGlyZWN0aW9uIC0gQSBkaXJlw6fDo28gbmEgcXVhbCBvcyByZXN1bHRhZG9zIGRldmVtIHNlciBvcmRlbmFkb3MuXHJcbiAgICogQHBhcmFtIG9wdGlvbnMgLSBBcyBvcMOnw7VlcyBhZGljaW9uYWlzIHBhcmEgYSBsZWl0dXJhIGRvcyBkb2N1bWVudG9zLlxyXG4gICAqIEByZXR1cm5zIFVtYSBgUHJvbWlzZWAgcmVzb2x2aWRhIGNvbSB1bSBhcnJheSBkZSBkb2N1bWVudG9zIGBUYC5cclxuICAgKi9cclxuICBwcm90ZWN0ZWQgYXN5bmMgZ2V0V2hlcmVNYW55PFUgZXh0ZW5kcyBUID0gVD4oXHJcbiAgICBmaWx0ZXJzOiBGaXJlYmFzZVdoZXJlPFQ+W10sXHJcbiAgICBsaW1pdDogbnVtYmVyIHwgbnVsbCA9IG51bGwsXHJcbiAgICBvcmRlckJ5OiBrZXlvZiBUIHwgbnVsbCA9IG51bGwsXHJcbiAgICBvcmRlckJ5RGlyZWN0aW9uOiBPcmRlckJ5RGlyZWN0aW9uIHwgbnVsbCA9IG51bGwsXHJcbiAgICBvcHRpb25zOiBSZWFkT3B0aW9ucyA9IHsgdGltZXN0YW1wczogdHJ1ZSB9XHJcbiAgKTogUHJvbWlzZTxVW10+IHtcclxuICAgIGNvbnN0IHF1ZXJ5Q29uc3RyYWludHM6IFF1ZXJ5Q29uc3RyYWludFtdID0gZmlsdGVycy5tYXAoZmlsdGVyID0+IHtcclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZmlsdGVyKSkge1xyXG4gICAgICAgIHJldHVybiB3aGVyZShmaWx0ZXJbMF0gYXMgc3RyaW5nLCBmaWx0ZXJbMV0sIGZpbHRlclsyXSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHdoZXJlKGZpbHRlci5maWVsZCBhcyBzdHJpbmcsIGZpbHRlci5vcGVyYXRvciwgZmlsdGVyLnZhbHVlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKG9yZGVyQnkpIHtcclxuICAgICAgcXVlcnlDb25zdHJhaW50cy5wdXNoKHF1ZXJ5T3JkZXJCeShvcmRlckJ5IGFzIHN0cmluZywgb3JkZXJCeURpcmVjdGlvbiB8fCAnYXNjJykpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChsaW1pdCkge1xyXG4gICAgICBxdWVyeUNvbnN0cmFpbnRzLnB1c2gocXVlcnlMaW1pdChsaW1pdCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHEgPSBxdWVyeSh0aGlzLmNvbGxlY3Rpb24oKSwgLi4ucXVlcnlDb25zdHJhaW50cyk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZ2V0RG9jcyhxLCBvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlY3VwZXJhIG8gcHJpbWVpcm8gZG9jdW1lbnRvIGRhIGNvbGXDp8OjbyBjb20gYmFzZSBubyBjYW1wbywgb3BlcmFkb3IgZSB2YWxvciBmb3JuZWNpZG9zLCBiZW0gY29tbyBlbSBvcMOnw7VlcyBhZGljaW9uYWlzLlxyXG4gICAqXHJcbiAgICogQGFzeW5jXHJcbiAgICogQHBhcmFtIGZpZWxkIC0gQSBjaGF2ZSBkbyBjYW1wbyBwZWxvIHF1YWwgbyBkb2N1bWVudG8gZGV2ZSBzZXIgZmlsdHJhZG8uXHJcbiAgICogQHBhcmFtIG9wZXJhdG9yIC0gTyBvcGVyYWRvciBhIHNlciB1c2FkbyBuYSBmaWx0cmFnZW0gKHBvciBleGVtcGxvLCBcIj09XCIgb3UgXCI+XCIpLlxyXG4gICAqIEBwYXJhbSB2YWx1ZSAtIE8gdmFsb3IgYSBzZXIgY29tcGFyYWRvIG5hIGZpbHRyYWdlbS5cclxuICAgKiBAcGFyYW0gb3JkZXJCeSAtIEEgY2hhdmUgZG8gY2FtcG8gcGVsbyBxdWFsIG9zIHJlc3VsdGFkb3MgZGV2ZW0gc2VyIG9yZGVuYWRvcy5cclxuICAgKiBAcGFyYW0gb3JkZXJCeURpcmVjdGlvbiAtIEEgZGlyZcOnw6NvIG5hIHF1YWwgb3MgcmVzdWx0YWRvcyBkZXZlbSBzZXIgb3JkZW5hZG9zLlxyXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gQXMgb3DDp8O1ZXMgYWRpY2lvbmFpcyBwYXJhIGEgbGVpdHVyYSBkbyBkb2N1bWVudG8uXHJcbiAgICogQHJldHVybnMgVW1hIGBQcm9taXNlYCByZXNvbHZpZGEgY29tIHVtIGRvY3VtZW50byBgVGAgb3UgYG51bGxgIHNlIG5lbmh1bSBkb2N1bWVudG8gZm9yIGVuY29udHJhZG8uXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGFzeW5jIGdldE9uZVdoZXJlPFUgZXh0ZW5kcyBUID0gVD4oXHJcbiAgICBmaWVsZDoga2V5b2YgVCxcclxuICAgIG9wZXJhdG9yOiBXaGVyZUZpbHRlck9wLFxyXG4gICAgdmFsdWU6IHVua25vd24sXHJcbiAgICBvcmRlckJ5OiBrZXlvZiBUIHwgbnVsbCA9IG51bGwsXHJcbiAgICBvcmRlckJ5RGlyZWN0aW9uOiBPcmRlckJ5RGlyZWN0aW9uIHwgbnVsbCA9IG51bGwsXHJcbiAgICBvcHRpb25zOiBSZWFkT3B0aW9ucyA9IHsgdGltZXN0YW1wczogdHJ1ZSB9XHJcbiAgKTogUHJvbWlzZTxVIHwgbnVsbD4ge1xyXG4gICAgY29uc3QgZG9jdW1lbnRzID0gYXdhaXQgdGhpcy5nZXRXaGVyZTxVPihmaWVsZCwgb3BlcmF0b3IsIHZhbHVlLCAxLCBvcmRlckJ5LCBvcmRlckJ5RGlyZWN0aW9uLCBvcHRpb25zKTtcclxuICAgIHJldHVybiBkb2N1bWVudHMubGVuZ3RoID8gZG9jdW1lbnRzWzBdIDogbnVsbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlY3VwZXJhIG8gcHJpbWVpcm8gZG9jdW1lbnRvIGRhIGNvbGXDp8OjbyBjb20gYmFzZSBub3MgZmlsdHJvcyBmb3JuZWNpZG9zIGUgb3DDp8O1ZXMgYWRpY2lvbmFpcy5cclxuICAgKlxyXG4gICAqIEBhc3luY1xyXG4gICAqIEBwYXJhbSBmaWx0ZXJzIC0gVW0gYXJyYXkgZGUgb2JqZXRvcyBkZSBmaWx0cm8gRmlyZWJhc2UsIGNhZGEgdW0gY29udGVuZG8gdW0gY2FtcG8sIHVtIG9wZXJhZG9yIGUgdW0gdmFsb3IuXHJcbiAgICogQHBhcmFtIG9yZGVyQnkgLSBBIGNoYXZlIGRvIGNhbXBvIHBlbG8gcXVhbCBvcyByZXN1bHRhZG9zIGRldmVtIHNlciBvcmRlbmFkb3MuXHJcbiAgICogQHBhcmFtIG9yZGVyQnlEaXJlY3Rpb24gLSBBIGRpcmXDp8OjbyBuYSBxdWFsIG9zIHJlc3VsdGFkb3MgZGV2ZW0gc2VyIG9yZGVuYWRvcy5cclxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIEFzIG9ww6fDtWVzIGFkaWNpb25haXMgcGFyYSBhIGxlaXR1cmEgZG8gZG9jdW1lbnRvLlxyXG4gICAqIEByZXR1cm5zIFVtYSBgUHJvbWlzZWAgcmVzb2x2aWRhIGNvbSB1bSBkb2N1bWVudG8gYFRgIG91IGBudWxsYCBzZSBuZW5odW0gZG9jdW1lbnRvIGZvciBlbmNvbnRyYWRvLlxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBhc3luYyBnZXRPbmVXaGVyZU1hbnk8VSBleHRlbmRzIFQgPSBUPihcclxuICAgIGZpbHRlcnM6IEZpcmViYXNlV2hlcmU8VD5bXSxcclxuICAgIG9yZGVyQnk6IGtleW9mIFQgfCBudWxsID0gbnVsbCxcclxuICAgIG9yZGVyQnlEaXJlY3Rpb246IE9yZGVyQnlEaXJlY3Rpb24gfCBudWxsID0gbnVsbCxcclxuICAgIG9wdGlvbnM6IFJlYWRPcHRpb25zID0geyB0aW1lc3RhbXBzOiB0cnVlIH1cclxuICApOiBQcm9taXNlPFUgfCBudWxsPiB7XHJcbiAgICBjb25zdCBkb2N1bWVudHMgPSBhd2FpdCB0aGlzLmdldFdoZXJlTWFueTxVPihmaWx0ZXJzLCAxLCBvcmRlckJ5LCBvcmRlckJ5RGlyZWN0aW9uLCBvcHRpb25zKTtcclxuICAgIHJldHVybiBkb2N1bWVudHMubGVuZ3RoID8gZG9jdW1lbnRzWzBdIDogbnVsbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyaWEgdW1hIG5vdmEgaW5zdMOibmNpYSBpbXV0w6F2ZWwgZGUge0BsaW5rIFF1ZXJ5fSBxdWUgdGFtYsOpbSDDqSBlc3RlbmRpZGEgcGFyYVxyXG4gICAqIGluY2x1aXIgcmVzdHJpw6fDtWVzIGRlIGNvbnN1bHRhIGFkaWNpb25haXMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gY29tcG9zaXRlRmlsdGVyIC0gQSB7QGxpbmsgUXVlcnlDb21wb3NpdGVGaWx0ZXJDb25zdHJhaW50fSBhXHJcbiAgICogc2VyIGFwbGljYWRhLiBDcmllIHVtYSB7QGxpbmsgUXVlcnlDb21wb3NpdGVGaWx0ZXJDb25zdHJhaW50fSB1c2FuZG8ge0BsaW5rIGFuZH0gb3VcclxuICAgKiB7QGxpbmsgb3J9LlxyXG4gICAqIEBwYXJhbSBxdWVyeUNvbnN0cmFpbnRzIC0gQWRpY2lvbmFpcyB7QGxpbmsgUXVlcnlOb25GaWx0ZXJDb25zdHJhaW50fXMgYVxyXG4gICAqIHNlcmVtIGFwbGljYWRhcyAocG9yIGV4ZW1wbG8sIHtAbGluayBvcmRlckJ5fSwge0BsaW5rIGxpbWl0fSkuXHJcbiAgICogQHRocm93cyBTZSBxdWFscXVlciB1bWEgZGFzIHJlc3RyacOnw7VlcyBkZSBjb25zdWx0YSBmb3JuZWNpZGFzIG7Do28gcHVkZXJlbSBzZXIgY29tYmluYWRhcyBjb20gYXNcclxuICAgKiByZXN0cmnDp8O1ZXMgZXhpc3RlbnRlcyBvdSBub3Zhcy5cclxuICAgKi9cclxuICBwcm90ZWN0ZWQgcXVlcnkoXHJcbiAgICBjb21wb3NpdGVGaWx0ZXI6IFF1ZXJ5Q29tcG9zaXRlRmlsdGVyQ29uc3RyYWludCxcclxuICAgIC4uLnF1ZXJ5Q29uc3RyYWludHM6IFF1ZXJ5Tm9uRmlsdGVyQ29uc3RyYWludFtdXHJcbiAgKTogUXVlcnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIENyaWEgdW1hIG5vdmEgaW5zdMOibmNpYSBpbXV0w6F2ZWwgZGUge0BsaW5rIFF1ZXJ5fSBxdWUgdGFtYsOpbSDDqSBlc3RlbmRpZGEgcGFyYVxyXG4gICAqIGluY2x1aXIgcmVzdHJpw6fDtWVzIGRlIGNvbnN1bHRhIGFkaWNpb25haXMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gcXVlcnlDb25zdHJhaW50cyAtIEEgbGlzdGEgZGUge0BsaW5rIFF1ZXJ5Q29uc3RyYWludH1zIGEgc2VyZW0gYXBsaWNhZGFzLlxyXG4gICAqIEB0aHJvd3MgU2UgcXVhbHF1ZXIgdW1hIGRhcyByZXN0cmnDp8O1ZXMgZGUgY29uc3VsdGEgZm9ybmVjaWRhcyBuw6NvIHB1ZGVyZW0gc2VyIGNvbWJpbmFkYXMgY29tIGFzXHJcbiAgICogcmVzdHJpw6fDtWVzIGV4aXN0ZW50ZXMgb3Ugbm92YXMuXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIHF1ZXJ5KC4uLnF1ZXJ5Q29uc3RyYWludHM6IFF1ZXJ5Q29uc3RyYWludFtdKTogUXVlcnk7XHJcblxyXG4gIHByb3RlY3RlZCBxdWVyeSguLi5xdWVyaWVzOiBhbnkpOiBRdWVyeSB7XHJcbiAgICByZXR1cm4gcXVlcnkodGhpcy5jb2xsZWN0aW9uKCksIC4uLnF1ZXJpZXMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVhbGl6YSB1bWEgY29uc3VsdGEgbm8gRmlyZXN0b3JlIGNvbSBiYXNlIG5hcyByZXN0cmnDp8O1ZXMgZGUgY29uc3VsdGEgZm9ybmVjaWRhcy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBxdWVyeSAtIEEgaW5zdMOibmNpYSBkZSBgUXVlcnlgIGEgc2VyIHVzYWRhIGNvbW8gYmFzZSBwYXJhIGFzIHJlc3RyacOnw7Vlcy5cclxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIFVtIG9iamV0byBwYXJhIGNvbmZpZ3VyYXIgbyBjb21wb3J0YW1lbnRvIGRlIGxlaXR1cmEuXHJcbiAgICogQHJldHVybnMgVW1hIGBQcm9taXNlYCByZXNvbHZpZGEgY29tIHVtIGFycmF5IGRlIGRvY3VtZW50b3MgYFRgLlxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBhc3luYyBnZXREb2NzPFUgZXh0ZW5kcyBUID0gVD4ocXVlcnk6IFF1ZXJ5LCBvcHRpb25zOiBSZWFkT3B0aW9ucyA9IHsgdGltZXN0YW1wczogdHJ1ZSB9KTogUHJvbWlzZTxVW10+IHtcclxuICAgIGNvbnN0IHsgZG9jcyB9ID0gYXdhaXQgZ2V0RG9jcyhxdWVyeSk7XHJcblxyXG4gICAgcmV0dXJuIGRvY3MubWFwKGRvY3VtZW50ID0+IG9mRmlyZXN0b3JlKGRvY3VtZW50LCBvcHRpb25zLnRpbWVzdGFtcHMpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9idMOpbSB1bWEgaW5zdMOibmNpYSBgQ29sbGVjdGlvblJlZmVyZW5jZWAgcXVlIHNlIHJlZmVyZSDDoCBjb2xlw6fDo28gbm8gY2FtaW5obyBhYnNvbHV0byBlc3BlY2lmaWNhZG8gcG9yIGBjb2xsZWN0aW9uTmFtZWAuXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyBBIGluc3TDom5jaWEgZGUgYENvbGxlY3Rpb25SZWZlcmVuY2VgLlxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBjb2xsZWN0aW9uKCk6IENvbGxlY3Rpb25SZWZlcmVuY2Uge1xyXG4gICAgcmV0dXJuIGNvbGxlY3Rpb24odGhpcy5maXJlc3RvcmUsIHRoaXMuY29sbGVjdGlvbk5hbWUpO1xyXG4gIH1cclxufVxyXG4iXX0=