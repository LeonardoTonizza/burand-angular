import { v4 as uuidv4 } from 'uuid';
/**
 * Converte uma imagem codificada em `base64` em um objeto `File`.
 *
 * @param base64Image - A string de imagem codificada em base64.
 * @returns O objeto `File` convertido.
 */
export function base64ToFile(base64Image) {
    const split = base64Image.split(',');
    const type = split[0].replace('data:', '').replace(';base64', '');
    const byteString = window.atob(split[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i += 1) {
        ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], {
        type
    });
    const [, filetype] = blob.type.split('/');
    return new File([blob], `${uuidv4()}.${filetype}`, {
        type
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZTY0VG9GaWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL2Jhc2U2NFRvRmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsRUFBRSxJQUFJLE1BQU0sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUVwQzs7Ozs7R0FLRztBQUNILE1BQU0sVUFBVSxZQUFZLENBQUMsV0FBbUI7SUFDOUMsTUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2xFLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekMsTUFBTSxFQUFFLEdBQUcsSUFBSSxXQUFXLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlDLE1BQU0sRUFBRSxHQUFHLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzlCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDN0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDbEM7SUFDRCxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1FBQzFCLElBQUk7S0FDTCxDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsRUFBRSxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUUxQyxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxNQUFNLEVBQUUsSUFBSSxRQUFRLEVBQUUsRUFBRTtRQUNqRCxJQUFJO0tBQ0wsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHY0IGFzIHV1aWR2NCB9IGZyb20gJ3V1aWQnO1xyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRlIHVtYSBpbWFnZW0gY29kaWZpY2FkYSBlbSBgYmFzZTY0YCBlbSB1bSBvYmpldG8gYEZpbGVgLlxyXG4gKlxyXG4gKiBAcGFyYW0gYmFzZTY0SW1hZ2UgLSBBIHN0cmluZyBkZSBpbWFnZW0gY29kaWZpY2FkYSBlbSBiYXNlNjQuXHJcbiAqIEByZXR1cm5zIE8gb2JqZXRvIGBGaWxlYCBjb252ZXJ0aWRvLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGJhc2U2NFRvRmlsZShiYXNlNjRJbWFnZTogc3RyaW5nKTogRmlsZSB7XHJcbiAgY29uc3Qgc3BsaXQgPSBiYXNlNjRJbWFnZS5zcGxpdCgnLCcpO1xyXG4gIGNvbnN0IHR5cGUgPSBzcGxpdFswXS5yZXBsYWNlKCdkYXRhOicsICcnKS5yZXBsYWNlKCc7YmFzZTY0JywgJycpO1xyXG4gIGNvbnN0IGJ5dGVTdHJpbmcgPSB3aW5kb3cuYXRvYihzcGxpdFsxXSk7XHJcbiAgY29uc3QgYWIgPSBuZXcgQXJyYXlCdWZmZXIoYnl0ZVN0cmluZy5sZW5ndGgpO1xyXG4gIGNvbnN0IGlhID0gbmV3IFVpbnQ4QXJyYXkoYWIpO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYnl0ZVN0cmluZy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgaWFbaV0gPSBieXRlU3RyaW5nLmNoYXJDb2RlQXQoaSk7XHJcbiAgfVxyXG4gIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbYWJdLCB7XHJcbiAgICB0eXBlXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFssIGZpbGV0eXBlXSA9IGJsb2IudHlwZS5zcGxpdCgnLycpO1xyXG5cclxuICByZXR1cm4gbmV3IEZpbGUoW2Jsb2JdLCBgJHt1dWlkdjQoKX0uJHtmaWxldHlwZX1gLCB7XHJcbiAgICB0eXBlXHJcbiAgfSk7XHJcbn1cclxuIl19