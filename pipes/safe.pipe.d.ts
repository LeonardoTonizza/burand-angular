import { PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from '@angular/platform-browser';
import * as i0 from "@angular/core";
/**
 * Pipe para contornar a segurança e confiar em conteúdo dinâmico (HTML, CSS, JavaScript, URLs, etc.).
 * Utiliza o serviço DomSanitizer para retornar conteúdo seguro e evita ataques de Cross-site Scripting (XSS).
 */
export declare class SafePipe implements PipeTransform {
    private sanitizer;
    constructor(sanitizer: DomSanitizer);
    /**
     * Transforma o valor fornecido em um conteúdo seguro, de acordo com o tipo especificado.
     *
     * @param value - O valor a ser transformado em conteúdo seguro.
     * @param type - O tipo de conteúdo seguro (html, style, script, url ou resourceUrl).
     * @returns Um objeto `SafeHtml`, `SafeStyle`, `SafeScript`, `SafeUrl` ou `SafeResourceUrl`, conforme o tipo especificado.
     */
    transform(value: string, type: 'html' | 'style' | 'script' | 'url' | 'resourceUrl'): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl;
    static ɵfac: i0.ɵɵFactoryDeclaration<SafePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<SafePipe, "safe", true>;
}
