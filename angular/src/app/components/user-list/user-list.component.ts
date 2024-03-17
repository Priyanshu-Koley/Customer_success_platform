import { Component, resolveForwardRef } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {

  users:User[] = [];
  loading:boolean = false;

  constructor(private userService: UsersService){ }

  ngOnInit() {
    this.loading = true;
    const res = this.userService.getAllUser();
    res.then(users =>{
      // console.log(users);    
      console.log("re-render");
      console.log(users);
      
      this.users = users;  
      this.loading = false;
    })
    
  }
}
