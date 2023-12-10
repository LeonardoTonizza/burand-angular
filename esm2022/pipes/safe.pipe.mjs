import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
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
export { SafePipe };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: SafePipe, decorators: [{
            type: Pipe,
            args: [{
                    standalone: true,
                    name: 'safe'
                }]
        }], ctorParameters: function () { return [{ type: i1.DomSanitizer }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FmZS5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3BpcGVzL3NhZmUucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7O0FBR3BEOzs7R0FHRztBQUNILE1BSWEsUUFBUTtJQUNuQixZQUFvQixTQUF1QjtRQUF2QixjQUFTLEdBQVQsU0FBUyxDQUFjO0lBQUcsQ0FBQztJQUUvQzs7Ozs7O09BTUc7SUFDSSxTQUFTLENBQ2QsS0FBYSxFQUNiLElBQXlEO1FBRXpELFFBQVEsSUFBSSxFQUFFO1lBQ1osS0FBSyxNQUFNO2dCQUNULE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2RCxLQUFLLE9BQU87Z0JBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLHdCQUF3QixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hELEtBQUssUUFBUTtnQkFDWCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMseUJBQXlCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekQsS0FBSyxLQUFLO2dCQUNSLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0RCxLQUFLLGFBQWE7Z0JBQ2hCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyw4QkFBOEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5RDtnQkFDRSxNQUFNLElBQUksS0FBSyxDQUFDLGdDQUFnQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQzNEO0lBQ0gsQ0FBQzs4R0E1QlUsUUFBUTs0R0FBUixRQUFROztTQUFSLFFBQVE7MkZBQVIsUUFBUTtrQkFKcEIsSUFBSTttQkFBQztvQkFDSixVQUFVLEVBQUUsSUFBSTtvQkFDaEIsSUFBSSxFQUFFLE1BQU07aUJBQ2IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERvbVNhbml0aXplciwgU2FmZUh0bWwsIFNhZmVSZXNvdXJjZVVybCwgU2FmZVNjcmlwdCwgU2FmZVN0eWxlLCBTYWZlVXJsIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcblxyXG4vKipcclxuICogUGlwZSBwYXJhIGNvbnRvcm5hciBhIHNlZ3VyYW7Dp2EgZSBjb25maWFyIGVtIGNvbnRlw7pkbyBkaW7Dom1pY28gKEhUTUwsIENTUywgSmF2YVNjcmlwdCwgVVJMcywgZXRjLikuXHJcbiAqIFV0aWxpemEgbyBzZXJ2acOnbyBEb21TYW5pdGl6ZXIgcGFyYSByZXRvcm5hciBjb250ZcO6ZG8gc2VndXJvIGUgZXZpdGEgYXRhcXVlcyBkZSBDcm9zcy1zaXRlIFNjcmlwdGluZyAoWFNTKS5cclxuICovXHJcbkBQaXBlKHtcclxuICBzdGFuZGFsb25lOiB0cnVlLFxyXG4gIG5hbWU6ICdzYWZlJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgU2FmZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBUcmFuc2Zvcm1hIG8gdmFsb3IgZm9ybmVjaWRvIGVtIHVtIGNvbnRlw7pkbyBzZWd1cm8sIGRlIGFjb3JkbyBjb20gbyB0aXBvIGVzcGVjaWZpY2Fkby5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB2YWx1ZSAtIE8gdmFsb3IgYSBzZXIgdHJhbnNmb3JtYWRvIGVtIGNvbnRlw7pkbyBzZWd1cm8uXHJcbiAgICogQHBhcmFtIHR5cGUgLSBPIHRpcG8gZGUgY29udGXDumRvIHNlZ3VybyAoaHRtbCwgc3R5bGUsIHNjcmlwdCwgdXJsIG91IHJlc291cmNlVXJsKS5cclxuICAgKiBAcmV0dXJucyBVbSBvYmpldG8gYFNhZmVIdG1sYCwgYFNhZmVTdHlsZWAsIGBTYWZlU2NyaXB0YCwgYFNhZmVVcmxgIG91IGBTYWZlUmVzb3VyY2VVcmxgLCBjb25mb3JtZSBvIHRpcG8gZXNwZWNpZmljYWRvLlxyXG4gICAqL1xyXG4gIHB1YmxpYyB0cmFuc2Zvcm0oXHJcbiAgICB2YWx1ZTogc3RyaW5nLFxyXG4gICAgdHlwZTogJ2h0bWwnIHwgJ3N0eWxlJyB8ICdzY3JpcHQnIHwgJ3VybCcgfCAncmVzb3VyY2VVcmwnXHJcbiAgKTogU2FmZUh0bWwgfCBTYWZlU3R5bGUgfCBTYWZlU2NyaXB0IHwgU2FmZVVybCB8IFNhZmVSZXNvdXJjZVVybCB7XHJcbiAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgY2FzZSAnaHRtbCc6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKHZhbHVlKTtcclxuICAgICAgY2FzZSAnc3R5bGUnOlxyXG4gICAgICAgIHJldHVybiB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUodmFsdWUpO1xyXG4gICAgICBjYXNlICdzY3JpcHQnOlxyXG4gICAgICAgIHJldHVybiB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0U2NyaXB0KHZhbHVlKTtcclxuICAgICAgY2FzZSAndXJsJzpcclxuICAgICAgICByZXR1cm4gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFVybCh2YWx1ZSk7XHJcbiAgICAgIGNhc2UgJ3Jlc291cmNlVXJsJzpcclxuICAgICAgICByZXR1cm4gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKHZhbHVlKTtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgc2FmZSB0eXBlIHNwZWNpZmllZDogJHt0eXBlfWApO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=