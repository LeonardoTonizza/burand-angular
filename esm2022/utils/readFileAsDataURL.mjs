/**
 * Lê um `File` e retorna seus dados no formato de URL Data.
 *
 * @param file - O arquivo a ser lido.
 * @returns Uma `Promise` que resolve em uma `string` contendo a URL Data do arquivo ou `null`.
 */
export function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = () => {
            reject();
        };
        fileReader.readAsDataURL(file);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZEZpbGVBc0RhdGFVUkwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvcmVhZEZpbGVBc0RhdGFVUkwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7QUFDSCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsSUFBVTtJQUMxQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3JDLE1BQU0sVUFBVSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7UUFDcEMsVUFBVSxDQUFDLE1BQU0sR0FBRyxHQUFTLEVBQUU7WUFDN0IsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUF1QixDQUFDLENBQUM7UUFDOUMsQ0FBQyxDQUFDO1FBQ0YsVUFBVSxDQUFDLE9BQU8sR0FBRyxHQUFTLEVBQUU7WUFDOUIsTUFBTSxFQUFFLENBQUM7UUFDWCxDQUFDLENBQUM7UUFDRixVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBMw6ogdW0gYEZpbGVgIGUgcmV0b3JuYSBzZXVzIGRhZG9zIG5vIGZvcm1hdG8gZGUgVVJMIERhdGEuXHJcbiAqXHJcbiAqIEBwYXJhbSBmaWxlIC0gTyBhcnF1aXZvIGEgc2VyIGxpZG8uXHJcbiAqIEByZXR1cm5zIFVtYSBgUHJvbWlzZWAgcXVlIHJlc29sdmUgZW0gdW1hIGBzdHJpbmdgIGNvbnRlbmRvIGEgVVJMIERhdGEgZG8gYXJxdWl2byBvdSBgbnVsbGAuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVhZEZpbGVBc0RhdGFVUkwoZmlsZTogRmlsZSk6IFByb21pc2U8c3RyaW5nIHwgbnVsbD4ge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICBjb25zdCBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuICAgIGZpbGVSZWFkZXIub25sb2FkID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICByZXNvbHZlKGZpbGVSZWFkZXIucmVzdWx0IGFzIHN0cmluZyB8IG51bGwpO1xyXG4gICAgfTtcclxuICAgIGZpbGVSZWFkZXIub25lcnJvciA9ICgpOiB2b2lkID0+IHtcclxuICAgICAgcmVqZWN0KCk7XHJcbiAgICB9O1xyXG4gICAgZmlsZVJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xyXG4gIH0pO1xyXG59XHJcbiJdfQ==