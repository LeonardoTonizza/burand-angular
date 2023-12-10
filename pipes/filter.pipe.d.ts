import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Pipe para filtrar um array de objetos, com base em um termo de pesquisa.
 * As propriedades dos objetos que correspondem ao termo de pesquisa são retornadas.
 */
export declare class FilterPipe implements PipeTransform {
    /**
     * Transforma a lista de itens, filtrando com base no termo fornecido.
     * Também recebe uma lista de chaves a serem ignoradas durante a pesquisa.
     *
     * @param items Lista de itens para filtrar.
     * @param term Uma string para comparar com todas as propriedades da lista.
     * @param excludes Lista de chaves que serão ignoradas durante a pesquisa.
     * @returns Retorna uma lista de itens que correspondem ao termo.
     */
    transform(items: Record<string, any>[], term: string, excludes?: string[]): Record<string, any>[];
    static ɵfac: i0.ɵɵFactoryDeclaration<FilterPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<FilterPipe, "filter", true>;
}
