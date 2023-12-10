import { Pipe } from '@angular/core';
import { calculateAge } from '../utils/calculateAge';
import * as i0 from "@angular/core";
/**
 * Pipe para exibir a idade com base na data de nascimento.
 * Transforma uma data de nascimento em idade (em anos).
 */
class AgePipe {
    /**
     * Transforma a data de nascimento em idade.
     *
     * @param birthDateInput A data de nascimento, em formato Date ou string.
     * @returns A idade, em anos.
     */
    transform(birthDateInput) {
        return calculateAge(new Date(birthDateInput));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: AgePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.1.1", ngImport: i0, type: AgePipe, isStandalone: true, name: "age" }); }
}
export { AgePipe };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: AgePipe, decorators: [{
            type: Pipe,
            args: [{
                    standalone: true,
                    name: 'age'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdlLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGlwZXMvYWdlLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHVCQUF1QixDQUFDOztBQUVyRDs7O0dBR0c7QUFDSCxNQUlhLE9BQU87SUFDbEI7Ozs7O09BS0c7SUFDSCxTQUFTLENBQUMsY0FBNkI7UUFDckMsT0FBTyxZQUFZLENBQUMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDOzhHQVRVLE9BQU87NEdBQVAsT0FBTzs7U0FBUCxPQUFPOzJGQUFQLE9BQU87a0JBSm5CLElBQUk7bUJBQUM7b0JBQ0osVUFBVSxFQUFFLElBQUk7b0JBQ2hCLElBQUksRUFBRSxLQUFLO2lCQUNaIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBjYWxjdWxhdGVBZ2UgfSBmcm9tICcuLi91dGlscy9jYWxjdWxhdGVBZ2UnO1xyXG5cclxuLyoqXHJcbiAqIFBpcGUgcGFyYSBleGliaXIgYSBpZGFkZSBjb20gYmFzZSBuYSBkYXRhIGRlIG5hc2NpbWVudG8uXHJcbiAqIFRyYW5zZm9ybWEgdW1hIGRhdGEgZGUgbmFzY2ltZW50byBlbSBpZGFkZSAoZW0gYW5vcykuXHJcbiAqL1xyXG5AUGlwZSh7XHJcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcclxuICBuYW1lOiAnYWdlJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQWdlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gIC8qKlxyXG4gICAqIFRyYW5zZm9ybWEgYSBkYXRhIGRlIG5hc2NpbWVudG8gZW0gaWRhZGUuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gYmlydGhEYXRlSW5wdXQgQSBkYXRhIGRlIG5hc2NpbWVudG8sIGVtIGZvcm1hdG8gRGF0ZSBvdSBzdHJpbmcuXHJcbiAgICogQHJldHVybnMgQSBpZGFkZSwgZW0gYW5vcy5cclxuICAgKi9cclxuICB0cmFuc2Zvcm0oYmlydGhEYXRlSW5wdXQ6IERhdGUgfCBzdHJpbmcpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIGNhbGN1bGF0ZUFnZShuZXcgRGF0ZShiaXJ0aERhdGVJbnB1dCkpO1xyXG4gIH1cclxufVxyXG4iXX0=