import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailValidator(control: AbstractControl): ValidationErrors | null{
    const value = (control.value as string);
    if(!value) { return null;}
    const errors: ValidationErrors = {};
    const isValidEmail =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test((control.value as string));
    if(!isValidEmail){
        errors['invalidEmail'] = 'Pleane enter a valid email.';
    }
   
    return Object.keys(errors).length > 0 ? errors : null;
}

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    if (!value) { return null; }

    const errors: ValidationErrors = {};
    const isValidLength = value.trim().length >= 8;
    const hasNumber = /[0-9]/.test(value.trim());
    const hasSpecialChar = /[!@#$%^&*()_+-]/.test(value.trim());

    if (!isValidLength) {
        // errors['minLength'] = 'Password must be at least 8 characters long';
        errors['error'] = 'Password must be at least 8 characters long';
    } else if (
        (!hasNumber || !hasSpecialChar)){
        errors['error'] = 'Password must contain at least one number and one special character: (!@#$%^&*()_+)';

    }
    // if (!hasNumber) {
    //     // errors['hasNumber'] = 'Password must contain at least one number';
    // }
    // if (!hasSpecialChar) {
    //     // errors['hasSpecialChar'] = 'Password must contain at least one special character: e.g. (!@#$%^&*()_+)';
    //     errors['error'] = 'Password must contain at least one special character: e.g. (!@#$%^&*()_+)';
    // }
    return Object.keys(errors).length > 0 ? errors : null;
}

export function rePasswordValidatorFactory(targetControl: AbstractControl): ValidatorFn {
    return function rePasswordValidator(control: AbstractControl): ValidationErrors | null {
        const areTheSame = targetControl.value === control.value;
        const errors: ValidationErrors = {};

        if(!areTheSame){
            errors['areTheSame'] = 'Passwords do not match!';
        }
        
        return Object.keys(errors).length > 0 ? errors : null;
    }
}


export function phoneValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    if (!value) { return null; }

    const errors: ValidationErrors = {};
    const isValidLength = value.trim().length >= 11;
    const onlyNumbers = /[0-9]/.test(value.trim());

    if (!isValidLength || !onlyNumbers) {
        errors['invalidPhoneNumber'] = 'Please enter a valid phone number.';
    }


    return Object.keys(errors).length > 0 ? errors : null;
}
// Shortened version of the above factory function but less readable
// export function rePasswordValidatorFactory(targetControl: AbstractControl): ValidatorFn {
//     return function rePasswordValidator(control: AbstractControl): ValidationErrors | null {
//         const areTheSame = targetControl.value === control.value;
//         return areTheSame ? null : { areTheSame: 'Passwords do not match!' };
//     }
// }