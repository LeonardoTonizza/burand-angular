import { Pipe } from '@angular/core';
import { abbreviateLastName } from '../utils/abbreviateLastName';
import * as i0 from "@angular/core";
/**
 * Pipe para abreviar o sobrenome de um nome completo.
 * Transforma um nome completo em uma string com o primeiro nome e o sobrenome abreviado.
 */
class ShortNamePipe {
    /**
     * Transforma o nome completo fornecido em uma string com o primeiro nome e o sobrenome abreviado.
     *
     * @param name - O nome completo a ser transformado.
     * @returns Uma string com o primeiro nome e o sobrenome abreviado.
     */
    transform(name) {
        if (!(name || '').length) {
            return '';
        }
        return abbreviateLastName(name);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: ShortNamePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.1.1", ngImport: i0, type: ShortNamePipe, isStandalone: true, name: "shortName" }); }
}
export { ShortNamePipe };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: ShortNamePipe, decorators: [{
            type: Pipe,
            args: [{
                    standalone: true,
                    name: 'shortName'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvcnQtbmFtZS5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3BpcGVzL3Nob3J0LW5hbWUucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7QUFFakU7OztHQUdHO0FBQ0gsTUFJYSxhQUFhO0lBQ3hCOzs7OztPQUtHO0lBQ0gsU0FBUyxDQUFDLElBQVk7UUFDcEIsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRTtZQUN4QixPQUFPLEVBQUUsQ0FBQztTQUNYO1FBRUQsT0FBTyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDOzhHQWJVLGFBQWE7NEdBQWIsYUFBYTs7U0FBYixhQUFhOzJGQUFiLGFBQWE7a0JBSnpCLElBQUk7bUJBQUM7b0JBQ0osVUFBVSxFQUFFLElBQUk7b0JBQ2hCLElBQUksRUFBRSxXQUFXO2lCQUNsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgYWJicmV2aWF0ZUxhc3ROYW1lIH0gZnJvbSAnLi4vdXRpbHMvYWJicmV2aWF0ZUxhc3ROYW1lJztcclxuXHJcbi8qKlxyXG4gKiBQaXBlIHBhcmEgYWJyZXZpYXIgbyBzb2JyZW5vbWUgZGUgdW0gbm9tZSBjb21wbGV0by5cclxuICogVHJhbnNmb3JtYSB1bSBub21lIGNvbXBsZXRvIGVtIHVtYSBzdHJpbmcgY29tIG8gcHJpbWVpcm8gbm9tZSBlIG8gc29icmVub21lIGFicmV2aWFkby5cclxuICovXHJcbkBQaXBlKHtcclxuICBzdGFuZGFsb25lOiB0cnVlLFxyXG4gIG5hbWU6ICdzaG9ydE5hbWUnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaG9ydE5hbWVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgLyoqXHJcbiAgICogVHJhbnNmb3JtYSBvIG5vbWUgY29tcGxldG8gZm9ybmVjaWRvIGVtIHVtYSBzdHJpbmcgY29tIG8gcHJpbWVpcm8gbm9tZSBlIG8gc29icmVub21lIGFicmV2aWFkby5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBuYW1lIC0gTyBub21lIGNvbXBsZXRvIGEgc2VyIHRyYW5zZm9ybWFkby5cclxuICAgKiBAcmV0dXJucyBVbWEgc3RyaW5nIGNvbSBvIHByaW1laXJvIG5vbWUgZSBvIHNvYnJlbm9tZSBhYnJldmlhZG8uXHJcbiAgICovXHJcbiAgdHJhbnNmb3JtKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBpZiAoIShuYW1lIHx8ICcnKS5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBhYmJyZXZpYXRlTGFzdE5hbWUobmFtZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==