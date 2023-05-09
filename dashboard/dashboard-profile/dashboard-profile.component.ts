import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

import { User } from 'src/app/user';


@Component({
  selector: 'll-dashboard-profile',
  templateUrl: './dashboard-profile.component.html',
  styleUrls: ['./dashboard-profile.component.scss']
})
export class DashboardProfileComponent implements OnInit {
  users: User[] = [];
 
  user : User = new User (); 
  addUserModalVisible = false;
  id:number;

  newUser: User = {
    idUser:0,
    username: '',
    firstname:'',
    lastname:'',
    password: '',
    email: '',
    numTel: '',
    role: '',
    enabled: true,
    locked: false,
    image:''
    
  };
   
  constructor(private userService: UserService ) { }

  ngOnInit(): void {
    this.getAllUsers();
    
    
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe({
     next: (data: User[]) => {
        this.users = data;
      },
      error:(error) => {
        console.log(error);
      }
  });
  }

  onAddUser(addUserForm: NgForm) {
    const newUser = addUserForm.value;
    this.userService.addUser(newUser)
      .subscribe((result) => {
        console.log(result);
        this.getAllUsers();
        addUserForm.reset();
       
      }, (error) => {
        console.error(error);
      });
  }
  

  deleteUser(idUser: number) {
    this.userService.deleteUser(idUser).subscribe({
      next: () => {
        console.log(`User with id ${idUser} deleted successfully.`);
        // Remove the deleted user from the users array
        this.users = this.users.filter(user => user.idUser !== idUser);
      },
      error:(error) => {
        console.log(error);
      }
    });
  }


  
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.newUser.image = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  
  onUpdateUser(): void {
    this.userService.updateUser(this.id,this.newUser)
    
      .subscribe(data => {
        console.log(data);
        alert('User info has been modified !');
        this.ngOnInit();
        
      });
  }

  edit(user){
    this.newUser=user;
  }

  


  
 

}