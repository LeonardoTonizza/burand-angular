import { DatePipe } from '@angular/common';
import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Pipe para exibir o tempo decorrido em formato amigável.
 * Transforma uma data em uma string representando o tempo decorrido
 */
class TimeAgoPipe extends DatePipe {
    /**
     * Transforma a data fornecida em uma string representando o tempo decorrido.
     *
     * @param value - A data a ser transformada.
     * @returns Uma string representando o tempo decorrido desde a data fornecida até o momento atual.
     */
    transform(value) {
        if (!value) {
            return '';
        }
        const d = new Date(value);
        const now = new Date();
        const seconds = Math.round(Math.abs((now.getTime() - d.getTime()) / 1000));
        const minutes = Math.round(Math.abs(seconds / 60));
        const hours = Math.round(Math.abs(minutes / 60));
        const days = Math.round(Math.abs(hours / 24));
        if (Number.isNaN(seconds)) {
            return '';
        }
        if (seconds <= 60) {
            return 'agora';
        }
        if (minutes <= 60) {
            return `há ${minutes} min`;
        }
        if (hours <= 24) {
            return `há ${hours} h`;
        }
        if (days <= 7) {
            return `há ${days} d`;
        }
        if (d.getFullYear() === now.getFullYear()) {
            return super.transform(value, "dd 'de' MMM 'às' HH:mm");
        }
        return super.transform(value, "dd 'de' MMMM 'de' yyyy");
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: TimeAgoPipe, deps: null, target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.1.1", ngImport: i0, type: TimeAgoPipe, isStandalone: true, name: "timeAgo" }); }
}
export { TimeAgoPipe };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: TimeAgoPipe, decorators: [{
            type: Pipe,
            args: [{
                    standalone: true,
                    name: 'timeAgo'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1hZ28ucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9waXBlcy90aW1lLWFnby5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7QUFFcEQ7OztHQUdHO0FBQ0gsTUFJYSxXQUFZLFNBQVEsUUFBUTtJQUN2Qzs7Ozs7T0FLRztJQUNNLFNBQVMsQ0FBQyxLQUFnRDtRQUNqRSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUVELE1BQU0sQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTFCLE1BQU0sR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDdkIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFM0UsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ25ELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFOUMsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3pCLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFFRCxJQUFJLE9BQU8sSUFBSSxFQUFFLEVBQUU7WUFDakIsT0FBTyxPQUFPLENBQUM7U0FDaEI7UUFFRCxJQUFJLE9BQU8sSUFBSSxFQUFFLEVBQUU7WUFDakIsT0FBTyxNQUFNLE9BQU8sTUFBTSxDQUFDO1NBQzVCO1FBRUQsSUFBSSxLQUFLLElBQUksRUFBRSxFQUFFO1lBQ2YsT0FBTyxNQUFNLEtBQUssSUFBSSxDQUFDO1NBQ3hCO1FBRUQsSUFBSSxJQUFJLElBQUksQ0FBQyxFQUFFO1lBQ2IsT0FBTyxNQUFNLElBQUksSUFBSSxDQUFDO1NBQ3ZCO1FBRUQsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLEtBQUssR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQ3pDLE9BQU8sS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztTQUN6RDtRQUVELE9BQU8sS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztJQUMxRCxDQUFDOzhHQTlDVSxXQUFXOzRHQUFYLFdBQVc7O1NBQVgsV0FBVzsyRkFBWCxXQUFXO2tCQUp2QixJQUFJO21CQUFDO29CQUNKLFVBQVUsRUFBRSxJQUFJO29CQUNoQixJQUFJLEVBQUUsU0FBUztpQkFDaEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8qKlxyXG4gKiBQaXBlIHBhcmEgZXhpYmlyIG8gdGVtcG8gZGVjb3JyaWRvIGVtIGZvcm1hdG8gYW1pZ8OhdmVsLlxyXG4gKiBUcmFuc2Zvcm1hIHVtYSBkYXRhIGVtIHVtYSBzdHJpbmcgcmVwcmVzZW50YW5kbyBvIHRlbXBvIGRlY29ycmlkb1xyXG4gKi9cclxuQFBpcGUoe1xyXG4gIHN0YW5kYWxvbmU6IHRydWUsXHJcbiAgbmFtZTogJ3RpbWVBZ28nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUaW1lQWdvUGlwZSBleHRlbmRzIERhdGVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgLyoqXHJcbiAgICogVHJhbnNmb3JtYSBhIGRhdGEgZm9ybmVjaWRhIGVtIHVtYSBzdHJpbmcgcmVwcmVzZW50YW5kbyBvIHRlbXBvIGRlY29ycmlkby5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB2YWx1ZSAtIEEgZGF0YSBhIHNlciB0cmFuc2Zvcm1hZGEuXHJcbiAgICogQHJldHVybnMgVW1hIHN0cmluZyByZXByZXNlbnRhbmRvIG8gdGVtcG8gZGVjb3JyaWRvIGRlc2RlIGEgZGF0YSBmb3JuZWNpZGEgYXTDqSBvIG1vbWVudG8gYXR1YWwuXHJcbiAgICovXHJcbiAgb3ZlcnJpZGUgdHJhbnNmb3JtKHZhbHVlOiBEYXRlIHwgc3RyaW5nIHwgbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCk6IGFueSB7XHJcbiAgICBpZiAoIXZhbHVlKSB7XHJcbiAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkID0gbmV3IERhdGUodmFsdWUpO1xyXG5cclxuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XHJcbiAgICBjb25zdCBzZWNvbmRzID0gTWF0aC5yb3VuZChNYXRoLmFicygobm93LmdldFRpbWUoKSAtIGQuZ2V0VGltZSgpKSAvIDEwMDApKTtcclxuXHJcbiAgICBjb25zdCBtaW51dGVzID0gTWF0aC5yb3VuZChNYXRoLmFicyhzZWNvbmRzIC8gNjApKTtcclxuICAgIGNvbnN0IGhvdXJzID0gTWF0aC5yb3VuZChNYXRoLmFicyhtaW51dGVzIC8gNjApKTtcclxuICAgIGNvbnN0IGRheXMgPSBNYXRoLnJvdW5kKE1hdGguYWJzKGhvdXJzIC8gMjQpKTtcclxuXHJcbiAgICBpZiAoTnVtYmVyLmlzTmFOKHNlY29uZHMpKSB7XHJcbiAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc2Vjb25kcyA8PSA2MCkge1xyXG4gICAgICByZXR1cm4gJ2Fnb3JhJztcclxuICAgIH1cclxuXHJcbiAgICBpZiAobWludXRlcyA8PSA2MCkge1xyXG4gICAgICByZXR1cm4gYGjDoSAke21pbnV0ZXN9IG1pbmA7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGhvdXJzIDw9IDI0KSB7XHJcbiAgICAgIHJldHVybiBgaMOhICR7aG91cnN9IGhgO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkYXlzIDw9IDcpIHtcclxuICAgICAgcmV0dXJuIGBow6EgJHtkYXlzfSBkYDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZC5nZXRGdWxsWWVhcigpID09PSBub3cuZ2V0RnVsbFllYXIoKSkge1xyXG4gICAgICByZXR1cm4gc3VwZXIudHJhbnNmb3JtKHZhbHVlLCBcImRkICdkZScgTU1NICfDoHMnIEhIOm1tXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzdXBlci50cmFuc2Zvcm0odmFsdWUsIFwiZGQgJ2RlJyBNTU1NICdkZScgeXl5eVwiKTtcclxuICB9XHJcbn1cclxuIl19