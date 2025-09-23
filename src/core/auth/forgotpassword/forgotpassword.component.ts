import { Component, ElementRef, inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../../../shared/components/input/input.component";
import { CartService } from '../../services/cart.service';
import { AuthService } from '../service/auth.service';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  imports: [InputComponent, ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent implements OnInit {

  @ViewChild('email') emailEle !: ElementRef;
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly toastrService = inject(ToastrService);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);
  private readonly renderer = inject(Renderer2);


  forgotPasswordForm !: FormGroup;
  verifyResetCodeForm !: FormGroup;
  resetPasswordForm !: FormGroup;
  stepper: number = 1;
  email !: string;


  ngOnInit() {
    this.initForm();
  }


  initForm() {
    this.forgotPasswordForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]]
    })


    this.verifyResetCodeForm = this.fb.group({
      resetCode: [null, [Validators.required, Validators.pattern(/^\w{4,10}$/)]]
    })


    this.resetPasswordForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      newPassword: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)]]
    })
  }




  forgetPassword(): void {
    if (this.forgotPasswordForm.valid) {
      this.email = this.forgotPasswordForm.get('email')?.value;
      console.log(this.forgotPasswordForm);
      this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe({
        next: (res => {
          if (res.statusMsg === 'success') {
            this.toastrService.success(res.message, 'SHIPSHOP')
            console.log(res);
            this.stepper = 2
          }
        })
      })
    }
  }


  verifyResetCode(): void {
    if (this.verifyResetCodeForm.valid) {
      this.authService.verifyResetCode(this.verifyResetCodeForm.value).subscribe({
        next: (res => {
          if (res.status === 'Success') {

            console.log(res);
            this.stepper = 3;
            this.resetPasswordForm.get('email')?.patchValue(this.email);
            // this.renderer.setAttribute(this.emailEle.nativeElement, 'disabled', 'true');           
          }
        }),
      })
    }
  }


  resetPassword(): void {
    if (this.resetPasswordForm.valid) {
      this.authService.resetPassword(this.resetPasswordForm.value).subscribe({
        next: (res => {
          this.cookieService.set('token', res.token)
          this.router.navigate(['/home']);
          console.log(res);
        })
      })
    }
  }




















}
