/**
 * Valida o formato do endereço de e-mail.
 *
 * @example <caption>Valide se o campo corresponde a um e-mail válido</caption>
 * ```typescript
 * const control = new FormControl('bad@', emailValidator);
 *
 * console.log(control.errors); // {emailInvalid: true}
 * ```
 *
 * @param control - O `AbstractControl` do formulário a ser validado.
 * @returns Retorna um objeto de erro com a chave `emailInvalid` se o e-mail for inválido, caso contrário retorna `null`.
 */
export function emailValidator(control) {
    if (!control.value) {
        return null;
    }
    const REGEX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (REGEX_EMAIL.test(control.value.toLowerCase())) {
        return null;
    }
    return { emailInvalid: true };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdmFsaWRhdG9ycy9lbWFpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTs7Ozs7Ozs7Ozs7O0dBWUc7QUFDSCxNQUFNLFVBQVUsY0FBYyxDQUFDLE9BQXdCO0lBQ3JELElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO1FBQ2xCLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFFRCxNQUFNLFdBQVcsR0FDZix5SkFBeUosQ0FBQztJQUU1SixJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFO1FBQ2pELE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFFRCxPQUFPLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDO0FBQ2hDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIFZhbGlkYXRpb25FcnJvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG4vKipcclxuICogVmFsaWRhIG8gZm9ybWF0byBkbyBlbmRlcmXDp28gZGUgZS1tYWlsLlxyXG4gKlxyXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5WYWxpZGUgc2UgbyBjYW1wbyBjb3JyZXNwb25kZSBhIHVtIGUtbWFpbCB2w6FsaWRvPC9jYXB0aW9uPlxyXG4gKiBgYGB0eXBlc2NyaXB0XHJcbiAqIGNvbnN0IGNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woJ2JhZEAnLCBlbWFpbFZhbGlkYXRvcik7XHJcbiAqXHJcbiAqIGNvbnNvbGUubG9nKGNvbnRyb2wuZXJyb3JzKTsgLy8ge2VtYWlsSW52YWxpZDogdHJ1ZX1cclxuICogYGBgXHJcbiAqXHJcbiAqIEBwYXJhbSBjb250cm9sIC0gTyBgQWJzdHJhY3RDb250cm9sYCBkbyBmb3JtdWzDoXJpbyBhIHNlciB2YWxpZGFkby5cclxuICogQHJldHVybnMgUmV0b3JuYSB1bSBvYmpldG8gZGUgZXJybyBjb20gYSBjaGF2ZSBgZW1haWxJbnZhbGlkYCBzZSBvIGUtbWFpbCBmb3IgaW52w6FsaWRvLCBjYXNvIGNvbnRyw6FyaW8gcmV0b3JuYSBgbnVsbGAuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZW1haWxWYWxpZGF0b3IoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwge1xyXG4gIGlmICghY29udHJvbC52YWx1ZSkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBjb25zdCBSRUdFWF9FTUFJTCA9XHJcbiAgICAvXigoW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKyhcXC5bXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKSopfChcIi4rXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXF0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvO1xyXG5cclxuICBpZiAoUkVHRVhfRU1BSUwudGVzdChjb250cm9sLnZhbHVlLnRvTG93ZXJDYXNlKCkpKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHJldHVybiB7IGVtYWlsSW52YWxpZDogdHJ1ZSB9O1xyXG59XHJcbiJdfQ==