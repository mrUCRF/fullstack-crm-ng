import { AuthService } from './../shared/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  form!: FormGroup
  aSub!: Subscription //устраняем утечку памяти

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) { }
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
    this.route.queryParams.subscribe((params: Params) => {
      if(params['registered']) {
        //now you can connect to the system using your data
        MaterialService.toast('Now, you can log in using this data')
      } else if (params['accesDenied']) {
        //log in firts
        MaterialService.toast('To get started, log in')
      } else if (params['sessionFailed']) {
        MaterialService.toast('Session ended, please log in again')
      }
    })
  }
 onSubmit() {
  // const user = {
  //   email: this.form.value.email,
  //   password: this.form.value.password
  // }
  this.form.disable()
this.aSub = this.auth.login(this.form.value).subscribe({
  next: () => this.router.navigate(['/overview']),
  error: err => {
    MaterialService.toast(err.error.message) //    console.warn(err)
    this.form.enable()
  }
 })
 }
}
