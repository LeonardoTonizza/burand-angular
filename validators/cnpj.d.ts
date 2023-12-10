import { AbstractControl, ValidationErrors } from '@angular/forms';
/**
 * Valida um número de CNPJ (Cadastro Nacional da Pessoa Jurídica).
 *
 * @example <caption>Valide se o campo corresponde a um CNPJ válido</caption>
 * ```typescript
 * const control = new FormControl('11111111111111', cnpjValidator);
 *
 * console.log(control.errors); // {cnpjInvalid: true}
 * ```
 *
 * @param control - O `AbstractControl` do formulário a ser validado.
 * @returns Retorna um objeto de erro com a chave `cnpjInvalid` se o CNPJ for inválido, caso contrário retorna `null`.
 */
export declare function cnpjValidator(control: AbstractControl): ValidationErrors | null;
