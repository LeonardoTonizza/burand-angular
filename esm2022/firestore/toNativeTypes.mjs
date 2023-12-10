import { DocumentReference, Timestamp } from '@angular/fire/firestore';
/**
 * Converte um objeto do `Firestore` em objetos `JavaScript` nativos, convertendo campos de data/hora em objetos `Date`.
 *
 * @param obj - O objeto a ser convertido para objetos JavaScript nativos
 * @returns O objeto convertido para objetos JavaScript nativos
 */
export function toNativeTypes(obj) {
    if (obj === null || typeof obj !== 'object' || obj instanceof DocumentReference) {
        return obj;
    }
    if (obj instanceof Timestamp) {
        return obj.toDate();
    }
    if (Array.isArray(obj)) {
        return obj.map(toNativeTypes);
    }
    const clone = {};
    Object.keys(obj).forEach(key => {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            clone[key] = toNativeTypes(obj[key]);
        }
    });
    return clone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9OYXRpdmVUeXBlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9maXJlc3RvcmUvdG9OYXRpdmVUeXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFdkU7Ozs7O0dBS0c7QUFDSCxNQUFNLFVBQVUsYUFBYSxDQUFDLEdBQVE7SUFDcEMsSUFBSSxHQUFHLEtBQUssSUFBSSxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsSUFBSSxHQUFHLFlBQVksaUJBQWlCLEVBQUU7UUFDL0UsT0FBTyxHQUFHLENBQUM7S0FDWjtJQUVELElBQUksR0FBRyxZQUFZLFNBQVMsRUFBRTtRQUM1QixPQUFPLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUNyQjtJQUVELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUN0QixPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7S0FDL0I7SUFFRCxNQUFNLEtBQUssR0FBNEIsRUFBRSxDQUFDO0lBRTFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQzdCLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRTtZQUNsRCxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3RDO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEb2N1bWVudFJlZmVyZW5jZSwgVGltZXN0YW1wIH0gZnJvbSAnQGFuZ3VsYXIvZmlyZS9maXJlc3RvcmUnO1xyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRlIHVtIG9iamV0byBkbyBgRmlyZXN0b3JlYCBlbSBvYmpldG9zIGBKYXZhU2NyaXB0YCBuYXRpdm9zLCBjb252ZXJ0ZW5kbyBjYW1wb3MgZGUgZGF0YS9ob3JhIGVtIG9iamV0b3MgYERhdGVgLlxyXG4gKlxyXG4gKiBAcGFyYW0gb2JqIC0gTyBvYmpldG8gYSBzZXIgY29udmVydGlkbyBwYXJhIG9iamV0b3MgSmF2YVNjcmlwdCBuYXRpdm9zXHJcbiAqIEByZXR1cm5zIE8gb2JqZXRvIGNvbnZlcnRpZG8gcGFyYSBvYmpldG9zIEphdmFTY3JpcHQgbmF0aXZvc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRvTmF0aXZlVHlwZXMob2JqOiBhbnkpOiBhbnkge1xyXG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcgfHwgb2JqIGluc3RhbmNlb2YgRG9jdW1lbnRSZWZlcmVuY2UpIHtcclxuICAgIHJldHVybiBvYmo7XHJcbiAgfVxyXG5cclxuICBpZiAob2JqIGluc3RhbmNlb2YgVGltZXN0YW1wKSB7XHJcbiAgICByZXR1cm4gb2JqLnRvRGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xyXG4gICAgcmV0dXJuIG9iai5tYXAodG9OYXRpdmVUeXBlcyk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBjbG9uZTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gPSB7fTtcclxuXHJcbiAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xyXG4gICAgICBjbG9uZVtrZXldID0gdG9OYXRpdmVUeXBlcyhvYmpba2V5XSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBjbG9uZTtcclxufVxyXG4iXX0=