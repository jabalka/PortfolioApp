import { Component, ChangeDetectionStrategy, signal, Inject, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } 
        from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog'
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { emailValidator, phoneValidator } from '../../shared/validators';
import { CreatePasswordComponent } from '../create-password/create-password.component';
import { AuthService } from '../../client/auth.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAccountComponent {
  isPhone: boolean = true;
  isEmail: boolean = false;
  isReady: boolean = false;
  form: FormGroup;
  errorMessage: string = '';
  // errorMessage = signal('');
  protected readonly nameInputValue = signal('');
  readonly email = new FormControl('', [emailValidator]);
  readonly name = new FormControl('', [Validators.required]);
  readonly phone = new FormControl('', [phoneValidator]);
  readonly dob = new FormControl('', []);
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {userData: any},
    public createAccountDialog: MatDialogRef<CreateAccountComponent>,
    private authService: AuthService,
    private matIconRegistry: MatIconRegistry,
    private domSenitizer: DomSanitizer,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
  ){
    createAccountDialog.disableClose = true; // disable the click outside close dialog
    this.matIconRegistry.addSvgIcon(
      'x-close',
      this.domSenitizer.bypassSecurityTrustResourceUrl('assets/icons/close.svg')
    );

    this.name.valueChanges.subscribe((value: string | null) => {
      if(value && value !== value.trim()){
        this.name.setValue(value.trim(), {emitEvent: false});
      }
    });
    // merge(this.email.statusChanges,
    //    this.email.valueChanges,
    //    this.name.statusChanges, 
    //    this.name.valueChanges
    // )
    // .pipe(takeUntilDestroyed())
    // .subscribe(() => this.updateErrorMessage());

    ///////////////////////////////////
    this.form = this.fb.group({
      name: this.name,
      email: this.email,
      phone: this.phone,
      dob: this.dob,
    });

    // subscripe to form status - update isReady based on forrm status
    this.form.statusChanges.subscribe(status => {
      this.isReady = this.form.valid && !!this.name.value && !!this.dob.value && (!!this.email.value || !!this.phone.value) ;
    })

    // crear errorMessage value when user types in the email or phone fields again
    this.email.valueChanges.subscribe(() => {
      this.errorMessage = '';
    });

    this.phone.valueChanges.subscribe(() => {
      this.errorMessage = '';
    })
  }
  protected onInput(event: Event) {
    // refresh the input character count below the Name's input field hint
    this.nameInputValue.set((event.target as HTMLInputElement).value);
  }

  onXClick(): void {
    this.createAccountDialog.close(false)
  }

  changeInputs(){
    this.isPhone = !this.isPhone;
    this.isEmail = !this.isEmail;
    this.phone.setValue('');
    this.email.setValue('');
  }

  async onSubmit(){
      let existingUser;
      if(this.email.value){
         existingUser = await this.authService.getUser('username', this.email.value);
         if(existingUser){
          this.email.setErrors({ existingUser: true}); //mark email field as invalid
         }
      } else if(this.phone.value){
        existingUser = await this.authService.getUser('username', this.phone.value);
        if(existingUser){
          this.phone.setErrors({ existingUser: true}); //mark phone field as invalid
         }
      }
      console.log(existingUser);
      if(existingUser){
        this.errorMessage = 'User with this email or phone number already exists!'
        this.cdRef.detectChanges(); // Trigger change detection
        return;
      }
    // this needs to be stored in the state and once password 
    //created to combined the object and make request with the full object
    this.createAccountDialog.close(this.form.value);


    // this.openChoosePasswordDialog();
  }
}
