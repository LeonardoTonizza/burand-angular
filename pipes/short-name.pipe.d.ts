import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Pipe para abreviar o sobrenome de um nome completo.
 * Transforma um nome completo em uma string com o primeiro nome e o sobrenome abreviado.
 */
export declare class ShortNamePipe implements PipeTransform {
    /**
     * Transforma o nome completo fornecido em uma string com o primeiro nome e o sobrenome abreviado.
     *
     * @param name - O nome completo a ser transformado.
     * @returns Uma string com o primeiro nome e o sobrenome abreviado.
     */
    transform(name: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ShortNamePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<ShortNamePipe, "shortName", true>;
}
