import { DatePipe } from '@angular/common';
import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Pipe para exibir o tempo decorrido em formato amigável.
 * Transforma uma data em uma string representando o tempo decorrido
 */
export declare class TimeAgoPipe extends DatePipe implements PipeTransform {
    /**
     * Transforma a data fornecida em uma string representando o tempo decorrido.
     *
     * @param value - A data a ser transformada.
     * @returns Uma string representando o tempo decorrido desde a data fornecida até o momento atual.
     */
    transform(value: Date | string | number | null | undefined): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<TimeAgoPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<TimeAgoPipe, "timeAgo", true>;
}
