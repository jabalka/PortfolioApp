import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordValidator, rePasswordValidatorFactory } from '../../shared/validators';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrl: './create-password.component.scss'
})
export class CreatePasswordComponent {
  isReady: boolean = false;
  form: FormGroup;
  readonly password = new FormControl('', [passwordValidator]);
  readonly rePassword = new FormControl('', [rePasswordValidatorFactory(this.password)]);

  constructor(
    private fb: FormBuilder,
    public createPasswordDialog: MatDialogRef<CreatePasswordComponent>,
    private matIconRegistry: MatIconRegistry,
    private domSenitizer: DomSanitizer,
  ){
    createPasswordDialog.disableClose = true; // disable the click outside close dialog
    this.matIconRegistry.addSvgIcon(
      'x-close',
      this.domSenitizer.bypassSecurityTrustResourceUrl('assets/icons/close.svg')
    );

    this.form = this.fb.group({
      password: this.password,
      rePassword: this.rePassword,
    })
    // subscripe to form status - update isReady based on forrm status
    this.form.statusChanges.subscribe(status => {
      this.isReady = this.form.valid && !!this.password.value && !!this.rePassword.value;
    })
  }

  protected onInput(event: Event) {
    // this.nameInputValue.set((event.target as HTMLInputElement).value);
  }

  onXClick(): void {
    this.createPasswordDialog.close(false)
  }

  onSubmit(){
    // this needs to be stored in the state and once password 
    //created to combined the object and make request with the full object
    this.createPasswordDialog.close(this.form.value)
  }

  
}
