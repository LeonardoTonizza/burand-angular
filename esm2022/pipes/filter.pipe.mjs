import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Pipe para filtrar um array de objetos, com base em um termo de pesquisa.
 * As propriedades dos objetos que correspondem ao termo de pesquisa são retornadas.
 */
class FilterPipe {
    /**
     * Transforma a lista de itens, filtrando com base no termo fornecido.
     * Também recebe uma lista de chaves a serem ignoradas durante a pesquisa.
     *
     * @param items Lista de itens para filtrar.
     * @param term Uma string para comparar com todas as propriedades da lista.
     * @param excludes Lista de chaves que serão ignoradas durante a pesquisa.
     * @returns Retorna uma lista de itens que correspondem ao termo.
     */
    transform(items, term, excludes = []) {
        if (!term || !items) {
            return items;
        }
        const toCompare = term.toLowerCase();
        function checkInside(item, term) {
            if (typeof item === 'string' && item.toString().toLowerCase().includes(toCompare)) {
                return true;
            }
            for (const property in item) {
                if (item[property] === null || item[property] === undefined || excludes.includes(property)) {
                    continue;
                }
                if (typeof item[property] === 'object') {
                    if (checkInside(item[property], term)) {
                        return true;
                    }
                }
                else if (item[property]?.toString().toLowerCase().includes(toCompare)) {
                    return true;
                }
            }
            return false;
        }
        return items.filter(item => {
            return checkInside(item, term);
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: FilterPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.1.1", ngImport: i0, type: FilterPipe, isStandalone: true, name: "filter", pure: false }); }
}
export { FilterPipe };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: FilterPipe, decorators: [{
            type: Pipe,
            args: [{
                    standalone: true,
                    name: 'filter',
                    pure: false
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGlwZXMvZmlsdGVyLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7O0FBRXBEOzs7R0FHRztBQUNILE1BS2EsVUFBVTtJQUNyQjs7Ozs7Ozs7T0FRRztJQUNILFNBQVMsQ0FBQyxLQUE0QixFQUFFLElBQVksRUFBRSxXQUFxQixFQUFFO1FBQzNFLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDbkIsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVyQyxTQUFTLFdBQVcsQ0FBQyxJQUFTLEVBQUUsSUFBWTtZQUMxQyxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUNqRixPQUFPLElBQUksQ0FBQzthQUNiO1lBRUQsS0FBSyxNQUFNLFFBQVEsSUFBSSxJQUFJLEVBQUU7Z0JBQzNCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssU0FBUyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQzFGLFNBQVM7aUJBQ1Y7Z0JBRUQsSUFBSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxRQUFRLEVBQUU7b0JBQ3RDLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRTt3QkFDckMsT0FBTyxJQUFJLENBQUM7cUJBQ2I7aUJBQ0Y7cUJBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO29CQUN2RSxPQUFPLElBQUksQ0FBQztpQkFDYjthQUNGO1lBRUQsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDO1FBRUQsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3pCLE9BQU8sV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7OEdBMUNVLFVBQVU7NEdBQVYsVUFBVTs7U0FBVixVQUFVOzJGQUFWLFVBQVU7a0JBTHRCLElBQUk7bUJBQUM7b0JBQ0osVUFBVSxFQUFFLElBQUk7b0JBQ2hCLElBQUksRUFBRSxRQUFRO29CQUNkLElBQUksRUFBRSxLQUFLO2lCQUNaIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLyoqXHJcbiAqIFBpcGUgcGFyYSBmaWx0cmFyIHVtIGFycmF5IGRlIG9iamV0b3MsIGNvbSBiYXNlIGVtIHVtIHRlcm1vIGRlIHBlc3F1aXNhLlxyXG4gKiBBcyBwcm9wcmllZGFkZXMgZG9zIG9iamV0b3MgcXVlIGNvcnJlc3BvbmRlbSBhbyB0ZXJtbyBkZSBwZXNxdWlzYSBzw6NvIHJldG9ybmFkYXMuXHJcbiAqL1xyXG5AUGlwZSh7XHJcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcclxuICBuYW1lOiAnZmlsdGVyJyxcclxuICBwdXJlOiBmYWxzZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmlsdGVyUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gIC8qKlxyXG4gICAqIFRyYW5zZm9ybWEgYSBsaXN0YSBkZSBpdGVucywgZmlsdHJhbmRvIGNvbSBiYXNlIG5vIHRlcm1vIGZvcm5lY2lkby5cclxuICAgKiBUYW1iw6ltIHJlY2ViZSB1bWEgbGlzdGEgZGUgY2hhdmVzIGEgc2VyZW0gaWdub3JhZGFzIGR1cmFudGUgYSBwZXNxdWlzYS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBpdGVtcyBMaXN0YSBkZSBpdGVucyBwYXJhIGZpbHRyYXIuXHJcbiAgICogQHBhcmFtIHRlcm0gVW1hIHN0cmluZyBwYXJhIGNvbXBhcmFyIGNvbSB0b2RhcyBhcyBwcm9wcmllZGFkZXMgZGEgbGlzdGEuXHJcbiAgICogQHBhcmFtIGV4Y2x1ZGVzIExpc3RhIGRlIGNoYXZlcyBxdWUgc2Vyw6NvIGlnbm9yYWRhcyBkdXJhbnRlIGEgcGVzcXVpc2EuXHJcbiAgICogQHJldHVybnMgUmV0b3JuYSB1bWEgbGlzdGEgZGUgaXRlbnMgcXVlIGNvcnJlc3BvbmRlbSBhbyB0ZXJtby5cclxuICAgKi9cclxuICB0cmFuc2Zvcm0oaXRlbXM6IFJlY29yZDxzdHJpbmcsIGFueT5bXSwgdGVybTogc3RyaW5nLCBleGNsdWRlczogc3RyaW5nW10gPSBbXSk6IFJlY29yZDxzdHJpbmcsIGFueT5bXSB7XHJcbiAgICBpZiAoIXRlcm0gfHwgIWl0ZW1zKSB7XHJcbiAgICAgIHJldHVybiBpdGVtcztcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0b0NvbXBhcmUgPSB0ZXJtLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgZnVuY3Rpb24gY2hlY2tJbnNpZGUoaXRlbTogYW55LCB0ZXJtOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgaWYgKHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJyAmJiBpdGVtLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyh0b0NvbXBhcmUpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gaXRlbSkge1xyXG4gICAgICAgIGlmIChpdGVtW3Byb3BlcnR5XSA9PT0gbnVsbCB8fCBpdGVtW3Byb3BlcnR5XSA9PT0gdW5kZWZpbmVkIHx8IGV4Y2x1ZGVzLmluY2x1ZGVzKHByb3BlcnR5KSkge1xyXG4gICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bcHJvcGVydHldID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgaWYgKGNoZWNrSW5zaWRlKGl0ZW1bcHJvcGVydHldLCB0ZXJtKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGl0ZW1bcHJvcGVydHldPy50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModG9Db21wYXJlKSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGl0ZW1zLmZpbHRlcihpdGVtID0+IHtcclxuICAgICAgcmV0dXJuIGNoZWNrSW5zaWRlKGl0ZW0sIHRlcm0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==