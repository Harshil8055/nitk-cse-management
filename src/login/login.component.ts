import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup = null as any;

  formValueChangeSubscription: Subscription = null as any;

  isIncurrectCredentials: boolean = false;

  constructor(
    private route: Router,
    private formBuilder: FormBuilder,
    private elementRef: ElementRef,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  setFormValueChangeSubscription() {
    this.formValueChangeSubscription = this.loginForm.valueChanges.subscribe(() => {
      this.isIncurrectCredentials = false;
      const formControls = this.elementRef.nativeElement.querySelectorAll('[formControlName]');
      if (formControls && formControls.length) {
        formControls.forEach((control: any) => {
          if (control.classList.contains('invalid-control')) {
            control.classList.remove('invalid-control');
          }
        });
      }
    })
  }

  loginButtonClickHandler($event: any) {
    if (this.loginForm.valid) {
      this.authService.loginClickHandler(this.loginForm.value).then((response) => {
        if (response) {
          this.route.navigate(['main']);
        } else {
          this.isIncurrectCredentials = true;
        }
      })
    } else {
      this.focusFirstInvalidControl();
    }
  }

  focusFirstInvalidControl(): any {
    const invalidControls = this.elementRef.nativeElement.querySelectorAll('[formControlName].ng-invalid');
    if (invalidControls && invalidControls.length) {
      const firstInvalidControl = invalidControls[0];
      if (!firstInvalidControl.classList.contains('invalid-control')) {
        firstInvalidControl.classList.add('invalid-control');
      }
      firstInvalidControl.focus();
    }
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.setFormValueChangeSubscription();
  }

  ngOnDestroy() {
    this.formValueChangeSubscription.unsubscribe();
  }

}
