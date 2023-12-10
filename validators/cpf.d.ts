import { AbstractControl, ValidationErrors } from '@angular/forms';
/**
 * Valida um número de CPF (Cadastro de Pessoas Físicas).
 *
 * @example <caption>Valide se o campo corresponde a um CPF válido</caption>
 * ```typescript
 * const control = new FormControl('11111111111', cpfValidator);
 *
 * console.log(control.errors); // {cpfInvalid: true}
 * ```
 *
 * @param control - O `AbstractControl` do formulário a ser validado.
 * @returns Retorna um objeto de erro com a chave `cpfInvalid` se o CPF for inválido, caso contrário retorna `null`.
 */
export declare function cpfValidator(control: AbstractControl): ValidationErrors | null;
