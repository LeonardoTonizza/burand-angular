import { AbstractControl, ValidationErrors } from '@angular/forms';
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
export declare function emailValidator(control: AbstractControl): ValidationErrors | null;
