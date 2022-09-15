import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import { AuthService } from '@data/services/api/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public show = false;

  constructor(
    private formBuilder: FormBuilder,
    private authservice: AuthService
    )
    {
      this.loginForm = this.formBuilder.group({
        email: ['',
          [
            Validators.required,
            Validators.pattern(
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\0-9]+\.)+[a-zA-Z]{2,}))$/
            )
          ]
        ],
        password: ['',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20)
          ]
        ]
      });
    }

  authenticate(){
    console.log("Autenticado", this.loginForm.value);
    this.authservice.login(this.loginForm.value).subscribe(user => {
      this.show = user.error
      console.log(user.error);
    })

  }

  ngOnInit(): void {
  }

}
