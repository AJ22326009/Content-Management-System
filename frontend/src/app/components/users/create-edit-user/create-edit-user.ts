import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../../../services/user/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-edit-user',
  imports: [ReactiveFormsModule],
  templateUrl: './create-edit-user.html',
  styleUrl: './create-edit-user.css',
})
export class CreateEditUser implements OnInit{
  isEditMode: boolean = false;
  userForm: FormGroup;
  rolesNames: string[] = ["editor", "Super Admin", "Manager", "viewer"];
  userId: string = '';
  passwordPlaceholder: string = '';
  passwordValidators: any[] = [];

  success: string = '';
  error: string = '';

  constructor(private fb: FormBuilder,
    private userService: UserService, private route: ActivatedRoute, private router: Router) {

    this.userForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
      password: [''],
      imageUrl: ['']
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.userId = params.get('id') || '';
      if(this.userId){
        this.isEditMode = true;
        this.loadUser();
      }
    })
    this.passwordPlaceholder = this.isEditMode ? 'Leave blank to keep current password' : 'Enter password';
    this.passwordValidators = this.isEditMode ? [] : [Validators.required, Validators.minLength(6)];
    this.userForm.get('password')?.setValidators(this.passwordValidators);
  }

  private loadUser() {
    this.userService.getUserById(this.userId).subscribe(res=>{
      const user = res.user;
      this.userForm.patchValue({
        fullname: user.fullname,
        email: user.email,
        role: user.role.name,
        imageUrl: user.imageUrl
      });
    })
  }

  createUser() {
    if(this.userForm.invalid) {
      return;
    }
    
    this.userService.registerUser(this.userForm.value).subscribe({
      next: (user) => {
        console.log('User created successfully:', user);
        this.userForm.reset();

        this.success = 'User created successfully';
        setTimeout(() => {
          this.success = '';
        }, 3000);

        this.router.navigate(['/users']);
      },
      error: (err) => {
        this.error = 'Error creating user';
        setTimeout(() => {
          this.error = '';
        }, 3000);
      }
    });
  }

  updateUser(userId: string) {
    if(this.userForm.invalid) {
      return;
    }

    this.userService.updateUser(userId, this.userForm.value).subscribe({
      next: (user) => {
        this.success = 'User updated successfully';
        setTimeout(() => {
          this.success = '';
        }, 3000);

        this.router.navigate(['/users']);
      },
      error: (err) => {
        this.error = 'Error updating user';
        setTimeout(() => {
          this.error = '';
        }, 3000);
      }
    });
  }

  submit(){
    if(this.isEditMode){
      this.updateUser(this.userId);
    } else {
      this.createUser();
    }
  }

}
