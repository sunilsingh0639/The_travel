import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from 'src/app/core/services/spinner/spinner.service';
import { UserService } from 'src/app/core/services/users/user.service';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss'],
})
export class AddNewComponent implements OnInit {
  userForm!: FormGroup;
  editMode: boolean = false;
  selectedId: any;
  userById: any;
  roleName: any;
  rolesList : any;
  editButton!:boolean;
  allPrivileges: any[] = [];
  selectedRole: any;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private _router: Router,
    private _activate: ActivatedRoute,
    private _dialog: MatDialog,
    private _spinner: SpinnerService,
    private _toast: ToastrService
  ) {
    this.initlizationinfoForm();
  }
  ngOnInit(): void {
    this.initlizationinfoForm();
    this.editButton=false

    if (this._router.url.includes('edit-user')) {
      this.editMode = true;
      this._activate.paramMap.subscribe((params) => {
        this.selectedId = params.get('id');
        this.updateData();
      });
    }
    this.getPreviligs();
  }

  initlizationinfoForm() {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      mobile: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      role: ['', Validators.required],
    });
  }

  updateData() {
    if (this.editMode) {
      this.userService.getUserById(this.selectedId).subscribe((res: any) => {
        this.userById = res;
        this.userForm.patchValue({
          firstName: res.firstName,
          middleName: res.middleName,
          lastName: res.lastName,
          gender: res.gender,
          mobile: res.mobile,
          email: res.email,
          role: res.role?.id,
        });
      });
    }
  }

  addNewUser() {
    this.roleName = this.rolesList.find((res: { id: any; }) => res.id == this.userForm.value.role).name;
   this.selectedRole.listOfPrivilege.forEach((element: any) => {
    if(element.active){
      element.toBeDeleted = false;
    } else{
      element.toBeDeleted = true;
    }
   });
    if (this.editMode) {
      const editbody = {
        id: Number(this.selectedId),
        firstName: this.userForm.value.firstName,
        middleName: this.userForm.value.middleName,
        lastName: this.userForm.value.lastName,
        gender: this.userForm.value.gender,
        email: this.userForm.value.email,
        password: 'abcfirst@123',
        assignedRoles: [this.selectedRole],
        mobile: this.userForm.value.mobile,
        role: {
          id: this.userForm.value.role,
          name: this.roleName,
        },
      };
      this._spinner.show();
      this.userService.updateUser(editbody).subscribe((res) => {
        this._spinner.hide();
        this.userForm.reset();
        this.editMode = false;
        this._toast.success('User deatils updated successfully.', 'Success!');
        this._router.navigate(['app/users']);
      });
    } else {
      const body = {
        firstName: this.userForm.value.firstName,
        middleName: this.userForm.value.middleName,
        lastName: this.userForm.value.lastName,
        // lastName: this.userForm.controls['lastName'].value,
        gender: this.userForm.value.gender,
        city: 'jaipur',
        email: this.userForm.value.email,
        name: 'abcfirst',
        password: 'abcfirst14@123',
        mobile: this.userForm.value.mobile,
        createdOn: new Date().toLocaleDateString().replaceAll('/','-'),
        updatedOn: new Date().toDateString().replaceAll('/','-'),
        loginCreated: true,
        suspended: false,
        assignedRoles: [this.selectedRole],
        role: {
          id: this.userForm.value.role,
          name: this.roleName,
        },
        designation: {
          id: 1,
        },
        module: {
          id: 1,
        },
        passwordExpired: '09-03-2023',
        profilePicture: 'my profile',
        slackId: 'slack Id',
        registrationStatus: 'REQUESTED',
      };

      this.userService.addNewUser(body).subscribe((res) => {
        this._toast.success('User deatils saved successfully.', 'Success!');
        this._router.navigate(['app/users']);
      });
    }
  }

  get userform() {
    return this.userForm.controls;
  }
  get email() {
    return this.userForm.controls['email'];
  }

  navigate() {
    this._router.navigate(['app/users']);
  }

  getRole() {
    this.userService.getRoleList()
    .subscribe((res:any) => {
      res.data.forEach((element: any) => {
        element.display = this.capitalizeString(element.name)
      });
        this.rolesList = res.data;
        this.rolesList.forEach((element: { listOfPrivilege: any[]; }) => {
          const temp = [...this.allPrivileges];
          temp.forEach((subElement : any) => {
              const isAvilable = element.listOfPrivilege.findIndex((res: any) => res.name == subElement.name);
              subElement.active = isAvilable > -1 ? true : false;
            
          });
          element.listOfPrivilege = [...temp];
      });
      this.selectedRole = {...this.rolesList[0]};
      this.userForm.patchValue({
        role: this.rolesList[0].id
      })
      });
  }
  capitalizeString(str: string) {
    const words = str.split('_');
    const capitalizedWords = words.map(word => {
      word = word.toLowerCase();
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    const capitalizedStr = capitalizedWords.join(' ');
  
    return capitalizedStr;
  }
  editUser(){
    this.editButton=true
  }
  editfalse(){
    this.editButton=false
  }
  getPreviligs() {
    this._spinner.show();
    this.userService.getPreviligs()
    .subscribe((res:any) => {
      this.allPrivileges = res.data;
      this.getRole();
      });
  }
  updateRole(){
    this._spinner.show();
    const id = this.userForm.value.role;
      this.userService.getPreviligsByRole(id)
      .subscribe((res:any) => {
        this.selectedRole = res;
        this.selectedRole.listOfPrivilege = this.allPrivileges;
        this.selectedRole.listOfPrivilege.forEach((element: any) => {
        const isAvilable = res.privilege.findIndex((res: any) => res.name == element.name);
        element.active = isAvilable > -1 ? true : false;   
        element.toBeDeleted = isAvilable > -1 ? true : false;   

        });
        });
  }
}
