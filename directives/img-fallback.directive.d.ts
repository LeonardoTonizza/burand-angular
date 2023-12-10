import { ElementRef } from '@angular/core';
import * as i0 from "@angular/core";
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
export declare class ImgFallbackDirective {
    private eRef;
    /**
     * A URL de fallback a ser usada quando a origem da imagem original falha ao carregar.
     */
    fallback: string;
    /**
     * O número de vezes para tentar carregar novamente a fonte da imagem original antes de usar o URL de fallback.
     */
    retry: number;
    private currentRetry;
    constructor(eRef: ElementRef<HTMLImageElement>);
    loadFallbackOnError(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ImgFallbackDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ImgFallbackDirective, "img[fallback], ion-img[fallback]", never, { "fallback": { "alias": "fallback"; "required": false; }; "retry": { "alias": "retry"; "required": false; }; }, {}, never, never, true, never>;
}
