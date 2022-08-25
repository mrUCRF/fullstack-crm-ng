import { Subscription } from 'rxjs';
import { AuthService } from './../shared/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.sass']
})
export class RegisterPageComponent implements OnInit, OnDestroy {
form!: FormGroup
aSub!: Subscription
  constructor(private authService: AuthService, private router: Router) { }
  ngOnDestroy(): void {
    if(this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })

  }
onSubmit() {
  this.form.disable()
this.authService.register(this.form.value).subscribe({
  next: () => {
    this.router.navigate(['/login'], {
      queryParams: {
        registered: true
      }
    })
  },
  error: err => {
    console.log(`Error status ${err.status} - ${err.statusText}`) //    console.warn(err)
    this.form.enable()

  }
})
}
}
