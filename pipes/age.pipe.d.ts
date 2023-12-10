import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Pipe para exibir a idade com base na data de nascimento.
 * Transforma uma data de nascimento em idade (em anos).
 */
export declare class AgePipe implements PipeTransform {
    /**
     * Transforma a data de nascimento em idade.
     *
     * @param birthDateInput A data de nascimento, em formato Date ou string.
     * @returns A idade, em anos.
     */
    transform(birthDateInput: Date | string): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<AgePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<AgePipe, "age", true>;
}
