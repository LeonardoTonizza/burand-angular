/**
 * Remove acentos de uma string.
 *
 * @param text A string de entrada a ser processada.
 * @returns A string com os acentos removidos.
 */
export function removeAccents(text) {
    const normalizationForm = 'NFD';
    const accentPattern = /[\u0300-\u036f]/g;
    return text.normalize(normalizationForm).replace(accentPattern, '');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3ZlQWNjZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9yZW1vdmVBY2NlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHO0FBQ0gsTUFBTSxVQUFVLGFBQWEsQ0FBQyxJQUFZO0lBQ3hDLE1BQU0saUJBQWlCLEdBQUcsS0FBSyxDQUFDO0lBQ2hDLE1BQU0sYUFBYSxHQUFHLGtCQUFrQixDQUFDO0lBRXpDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDdEUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBSZW1vdmUgYWNlbnRvcyBkZSB1bWEgc3RyaW5nLlxyXG4gKlxyXG4gKiBAcGFyYW0gdGV4dCBBIHN0cmluZyBkZSBlbnRyYWRhIGEgc2VyIHByb2Nlc3NhZGEuXHJcbiAqIEByZXR1cm5zIEEgc3RyaW5nIGNvbSBvcyBhY2VudG9zIHJlbW92aWRvcy5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVBY2NlbnRzKHRleHQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgY29uc3Qgbm9ybWFsaXphdGlvbkZvcm0gPSAnTkZEJztcclxuICBjb25zdCBhY2NlbnRQYXR0ZXJuID0gL1tcXHUwMzAwLVxcdTAzNmZdL2c7XHJcblxyXG4gIHJldHVybiB0ZXh0Lm5vcm1hbGl6ZShub3JtYWxpemF0aW9uRm9ybSkucmVwbGFjZShhY2NlbnRQYXR0ZXJuLCAnJyk7XHJcbn1cclxuIl19