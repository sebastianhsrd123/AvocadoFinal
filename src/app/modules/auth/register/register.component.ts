import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@data/services/api/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public RegisterForm: FormGroup;
  public RegisteredForm: FormGroup;
  public show=false;

  constructor(
    private formBuilder: FormBuilder,
    private authservice: AuthService)
    {
      this.RegisterForm = this.formBuilder.group({
        name:['',
        [ Validators.required,
          Validators.maxLength(35),
          Validators.minLength(3),
          Validators.pattern(
            /[a-zA-Z]*\s?[a-zA-Z]+$/
            )
        ]
      ],
        lastname:['',
        [ Validators.required,
          Validators.maxLength(35),
          Validators.minLength(3),
          Validators.pattern(
            /[a-zA-Z]+\s?[a-zA-Z]+?\s?[a-zA-Z]+?\s?[a-zA-Z]+?\s?[a-zA-Z]+?$/
            )
        ]
      ],
        email:['',
        [Validators.required,
        Validators.pattern(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\0-9]+\.)+[a-zA-Z]{2,}))$/
          )
        ]],
        direction:['',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(40),
        ]],
        password:['',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20)
        ]
      ],
        RepeatPassword:['',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20)
        ]
      ]

      })
      this.RegisteredForm =  this.RegisterForm
    }

  changeStatusModal(){
    if(this.show == false){
      this.show = true;
    }
    else{
      this.show = false;
    }

  }

  Registered(){
    this.RegisteredForm.value.name = this.RegisterForm.value.name + " " + this.RegisterForm.value.lastname;
    this.RegisteredForm.removeControl('RepeatPassword');
    this.RegisteredForm.removeControl('lastname');
    this.authservice.Register(this.RegisteredForm.value).subscribe(user => {
      console.log(user);
    })
    console.log("Registrado", this.RegisteredForm.value );
  }

}
