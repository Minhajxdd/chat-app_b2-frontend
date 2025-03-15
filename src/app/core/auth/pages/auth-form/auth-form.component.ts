import { Component, DestroyRef, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthFormService } from './auth-service';
import { authFormTemplateModel, DataModel } from './auth-form.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { getAuthFormTemplate } from './auth-form-template';

@Component({
  selector: 'app-auth-form',
  imports: [],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css'
})
export class AuthFormComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destoryRef = inject(DestroyRef);
  private readonly authService = inject(AuthFormService);

  isRegister: boolean = true;
  authForm!: FormGroup<authFormTemplateModel>;

  errMsg = signal<string>('');

  constructor(private fb: FormBuilder) {
    const subscription = this.route.url.subscribe((url) => {
      const path = url[0].path;
      this.isRegister = path === 'register';
      this.authForm = this.fb.group(getAuthFormTemplate(this.isRegister));
    });

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onSubmit() {
    if (this.propertyIsValid('fullname')) {
      return this.errMsg.set(`Please Enter a valid Full Name`);
    }

    if (this.propertyIsValid('email')) {
      return this.errMsg.set('Please Enter Valid Email');
    }

    if (this.propertyIsValid('password')) {
      return this.errMsg.set(
        'Password Should Be 6 Characters & Should Contain One Number or Symbol'
      );
    }

    if (this.propertyIsValid('repassword')) {
      return this.errMsg.set(
        'Password Should Be 6 Characters & Should Contain One Number or Symbol'
      );
    }

    if (this.isRegister) {
      if (
        this.authForm.controls.password.value !==
        this.authForm.controls.repassword?.value
      ) {
        return this.errMsg.set('Both Passwords should be same');
      }

      return this.register();
    }
    return this.logIn();
  }

  register() {
    const fullName = this.authForm.controls.fullname?.value;
    const email = this.authForm.controls.email?.value;
    const password = this.authForm.controls.password?.value;

    if (!fullName || !email || !password) {
      return this.errMsg.set('All Fields are required');
    }

    const data: DataModel = {
      fullName,
      email,
      password,
    };

    const subscription = this.authService.register(data).subscribe({
      error: (err: string) => {
        return this.errMsg.set(err);
      },
      complete: () => {
        this.router.navigate(['/']);
      },
    });

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  logIn() {
    const email = this.authForm.controls.email?.value;
    const password = this.authForm.controls.password?.value;

    if (!email || !password) {
      return this.errMsg.set('All Fields are required');
    }

    const data: DataModel = {
      email,
      password,
    };

    const subscription = this.authService.login(data).subscribe({
      error: (err: string) => {
        return this.errMsg.set(err);
      },
      complete: () => {
        this.router.navigate(['/']);
      },
    });

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  propertyIsValid(propertyName: keyof typeof this.authForm.controls) {
    const control = this.authForm.controls[propertyName];
    return control?.touched && control?.invalid;
  }

}
