import { Component } from '@angular/core';
import { CreateUserService } from '../../services/create-user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Roles } from '../../models/roles.model';
import { v4 as uuidv4 } from 'uuid';
import { AssignRoleService } from '../../services/assign-role.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent {
  userForm: any;
  roles = Roles;
  passwordRegex: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
  emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  constructor(
    // private route: ActivatedRoute,
    private userService: CreateUserService,
    private formBuilder: FormBuilder,
    private toast: NgToastService,
    private assignRole: AssignRoleService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(25),
        ],
      ],
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      password: [
        '',
        [Validators.required, Validators.pattern(this.passwordRegex)],
      ],
      role: ['', [Validators.required]],
    });
  }

  addUser() {
    // console.log(this.userForm.value);
    if (this.userForm.valid) {
      const newUser = {
        email: this.userForm.value.email,
        name: this.userForm.value.name,
        user_id: uuidv4(),
        connection: 'Username-Password-Authentication',
        password: this.userForm.value.password,
      };

      const result = this.userService.createUser(newUser);
      
      result
        .then((response) => {
          // console.log(this.userForm.value.role);
          console.log(response);

          //@ts-ignore
          if (response.status === 201) {
            this.toast.success({
              detail: 'Success',
              summary: 'User created successfully',
              duration: 4000,
            });
            this.assignRole.assignRole(this.userForm.value.role, newUser.user_id);
          }
          //@ts-ignore
          else if (response.status === 409) {
            this.toast.error({
              detail: 'Error',
              summary: 'User already exists',
              duration: 4000,
            });
          }

          this.userForm.reset();
        })
        .catch((err) => {
          console.log(err);

          this.toast.error({
            detail: 'Error',
            summary: 'Error creating User',
            duration: 4000,
          });
        });
    } else {
      this.toast.error({
        detail: 'Error',
        summary: 'Please fill all the fields with valid data',
        duration: 4000,
      });
    }
  }
}
