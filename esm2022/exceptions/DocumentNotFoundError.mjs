/**
 * Erro lançado quando um documento específico não é encontrado.
 */
export class DocumentNotFoundError extends Error {
    /**
     * Cria uma instância de um erro `DocumentNotFoundError` com uma mensagem formatada para o Id do documento não encontrado.
     *
     * @param id - O Id do documento não encontrado.
     */
    constructor(id) {
        super(`Document '${id}' was not found.`);
        this.name = 'DocumentNotFoundError';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRG9jdW1lbnROb3RGb3VuZEVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2V4Y2VwdGlvbnMvRG9jdW1lbnROb3RGb3VuZEVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHO0FBQ0gsTUFBTSxPQUFPLHFCQUFzQixTQUFRLEtBQUs7SUFDOUM7Ozs7T0FJRztJQUNILFlBQVksRUFBVTtRQUNwQixLQUFLLENBQUMsYUFBYSxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFFekMsSUFBSSxDQUFDLElBQUksR0FBRyx1QkFBdUIsQ0FBQztJQUN0QyxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogRXJybyBsYW7Dp2FkbyBxdWFuZG8gdW0gZG9jdW1lbnRvIGVzcGVjw61maWNvIG7Do28gw6kgZW5jb250cmFkby5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBEb2N1bWVudE5vdEZvdW5kRXJyb3IgZXh0ZW5kcyBFcnJvciB7XHJcbiAgLyoqXHJcbiAgICogQ3JpYSB1bWEgaW5zdMOibmNpYSBkZSB1bSBlcnJvIGBEb2N1bWVudE5vdEZvdW5kRXJyb3JgIGNvbSB1bWEgbWVuc2FnZW0gZm9ybWF0YWRhIHBhcmEgbyBJZCBkbyBkb2N1bWVudG8gbsOjbyBlbmNvbnRyYWRvLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGlkIC0gTyBJZCBkbyBkb2N1bWVudG8gbsOjbyBlbmNvbnRyYWRvLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcpIHtcclxuICAgIHN1cGVyKGBEb2N1bWVudCAnJHtpZH0nIHdhcyBub3QgZm91bmQuYCk7XHJcblxyXG4gICAgdGhpcy5uYW1lID0gJ0RvY3VtZW50Tm90Rm91bmRFcnJvcic7XHJcbiAgfVxyXG59XHJcbiJdfQ==