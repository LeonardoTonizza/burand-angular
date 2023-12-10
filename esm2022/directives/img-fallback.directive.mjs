import { Directive, HostListener, Input } from '@angular/core';
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
export { ImgFallbackDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1nLWZhbGxiYWNrLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kaXJlY3RpdmVzL2ltZy1mYWxsYmFjay5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBYyxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUUzRTs7Ozs7Ozs7Ozs7O0dBWUc7QUFDSCxNQUlhLG9CQUFvQjtJQWEvQixZQUFvQixJQUFrQztRQUFsQyxTQUFJLEdBQUosSUFBSSxDQUE4QjtRQVp0RDs7V0FFRztRQUNNLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFFdkI7O1dBRUc7UUFDTSxVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBRVgsaUJBQVksR0FBRyxDQUFDLENBQUM7SUFFZ0MsQ0FBQztJQUkxRCxtQkFBbUI7UUFDakIsTUFBTSxFQUFFLGFBQWEsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFFcEMsTUFBTSxVQUFVLEdBQ2QsSUFBSSxDQUFDLFFBQVE7WUFDYixxS0FBcUssQ0FBQztRQUV4SyxNQUFNLFdBQVcsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDO1FBRXRDLElBQUksV0FBVyxLQUFLLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsRUFBRTtZQUNoRCxhQUFhLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQztZQUMvQixPQUFPO1NBQ1I7UUFFRCxJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNwQyxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsQ0FBQztZQUN2QixhQUFhLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQztZQUUvQixVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNkLGFBQWEsQ0FBQyxHQUFHLEdBQUcsV0FBVyxDQUFDO1lBQ2xDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNWO2FBQU07WUFDTCxhQUFhLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQztTQUNoQztJQUNILENBQUM7OEdBekNVLG9CQUFvQjtrR0FBcEIsb0JBQW9COztTQUFwQixvQkFBb0I7MkZBQXBCLG9CQUFvQjtrQkFKaEMsU0FBUzttQkFBQztvQkFDVCxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsUUFBUSxFQUFFLGtDQUFrQztpQkFDN0M7aUdBS1UsUUFBUTtzQkFBaEIsS0FBSztnQkFLRyxLQUFLO3NCQUFiLEtBQUs7Z0JBUU4sbUJBQW1CO3NCQUZsQixZQUFZO3VCQUFDLE9BQU87O3NCQUNwQixZQUFZO3VCQUFDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8qKlxyXG4gKiBVbWEgZGlyZXRpdmEgcXVlIGxpZGEgY29tIGVycm9zIGRlIGNhcnJlZ2FtZW50byBkZSBpbWFnZW0gZSBzdWJzdGl0dWkgYSBmb250ZSBkYSBpbWFnZW0gcG9yIHVtIFVSTCBkZSBmYWxsYmFjay5cclxuICpcclxuICogQGV4YW1wbGVcclxuICogQXBsaXF1ZSBvIGF0cmlidXRvIGBmYWxsYmFja2AgYSB1bSBlbGVtZW50byBgaW1nYCBvdSBgaW9uLWltZ2AgcGFyYSB1c2FyIGEgZGlyZXRpdmE6XHJcbiAqIGBgYGh0bWxcclxuICogLy8gbmF0aXZlIEhUTUxcclxuICogPGltZyBzcmM9XCJpbWFnZS11cmwuanBnXCIgZmFsbGJhY2s9XCJmYWxsYmFjay1pbWFnZS11cmwuanBnXCIgW3JldHJ5XT1cIjJcIiAvPlxyXG4gKlxyXG4gKiAvLyBpb25pY1xyXG4gKiA8aW9uLWltZyBzcmM9XCJpbWFnZS11cmwuanBnXCIgZmFsbGJhY2s9XCJmYWxsYmFjay1pbWFnZS11cmwuanBnXCIgW3JldHJ5XT1cIjJcIiAvPlxyXG4gKiBgYGBcclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHN0YW5kYWxvbmU6IHRydWUsXHJcbiAgc2VsZWN0b3I6ICdpbWdbZmFsbGJhY2tdLCBpb24taW1nW2ZhbGxiYWNrXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIEltZ0ZhbGxiYWNrRGlyZWN0aXZlIHtcclxuICAvKipcclxuICAgKiBBIFVSTCBkZSBmYWxsYmFjayBhIHNlciB1c2FkYSBxdWFuZG8gYSBvcmlnZW0gZGEgaW1hZ2VtIG9yaWdpbmFsIGZhbGhhIGFvIGNhcnJlZ2FyLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGZhbGxiYWNrID0gJyc7XHJcblxyXG4gIC8qKlxyXG4gICAqIE8gbsO6bWVybyBkZSB2ZXplcyBwYXJhIHRlbnRhciBjYXJyZWdhciBub3ZhbWVudGUgYSBmb250ZSBkYSBpbWFnZW0gb3JpZ2luYWwgYW50ZXMgZGUgdXNhciBvIFVSTCBkZSBmYWxsYmFjay5cclxuICAgKi9cclxuICBASW5wdXQoKSByZXRyeSA9IDA7XHJcblxyXG4gIHByaXZhdGUgY3VycmVudFJldHJ5ID0gMDtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlUmVmOiBFbGVtZW50UmVmPEhUTUxJbWFnZUVsZW1lbnQ+KSB7fVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdlcnJvcicpXHJcbiAgQEhvc3RMaXN0ZW5lcignaW9uRXJyb3InKVxyXG4gIGxvYWRGYWxsYmFja09uRXJyb3IoKSB7XHJcbiAgICBjb25zdCB7IG5hdGl2ZUVsZW1lbnQgfSA9IHRoaXMuZVJlZjtcclxuXHJcbiAgICBjb25zdCBkZWZhdWx0VXJsID1cclxuICAgICAgdGhpcy5mYWxsYmFjayB8fFxyXG4gICAgICBcImRhdGE6aW1hZ2Uvc3ZnK3htbCwlM0NzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB3aWR0aD0nMTAwJTI1JyBoZWlnaHQ9JzEwMCUyNSclM0UlM0NyZWN0IHdpZHRoPScxMDAlMjUnIGhlaWdodD0nMTAwJTI1JyBmaWxsPSclMjNmMWYxZjEnLyUzRSUzQy9zdmclM0VcIjtcclxuXHJcbiAgICBjb25zdCBvcmlnaW5hbFNyYyA9IG5hdGl2ZUVsZW1lbnQuc3JjO1xyXG5cclxuICAgIGlmIChvcmlnaW5hbFNyYyA9PT0gYCR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0vYCkge1xyXG4gICAgICBuYXRpdmVFbGVtZW50LnNyYyA9IGRlZmF1bHRVcmw7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5jdXJyZW50UmV0cnkgIT09IHRoaXMucmV0cnkpIHtcclxuICAgICAgdGhpcy5jdXJyZW50UmV0cnkgKz0gMTtcclxuICAgICAgbmF0aXZlRWxlbWVudC5zcmMgPSBkZWZhdWx0VXJsO1xyXG5cclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgbmF0aXZlRWxlbWVudC5zcmMgPSBvcmlnaW5hbFNyYztcclxuICAgICAgfSwgMTUwMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBuYXRpdmVFbGVtZW50LnNyYyA9IGRlZmF1bHRVcmw7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==