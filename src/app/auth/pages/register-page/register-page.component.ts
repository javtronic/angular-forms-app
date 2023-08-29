import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import * as customValidators from './../../../shared/validators/validators';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { EmailValidator } from 'src/app/shared/validators/email-validator.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    name:['', [Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)]],
    // email:['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern) ], [ new EmailValidator() ]],
    email:['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern) ], [ this.emailValidator ]],
    username:['', [Validators.required, this.validatorsService.cantBeStrider]],
    password:[ '',[Validators.required, Validators.minLength(6)]],
    password2:[ '',[Validators.required]],

  }, {
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo('password','password2'),
    ]
  });

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidator: EmailValidator
    ){}

  isValidField( field: string ): boolean | null {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  onSubmit():void {
    this.myForm.markAllAsTouched();  
    // if(this.myForm.invalid){
    //   return;
    // }

    // console.log(this.myForm.value);
    
    // //reset strings vacios por defecto
    // this.myForm.reset({price: 0, inStorage: 0});
  }
}
