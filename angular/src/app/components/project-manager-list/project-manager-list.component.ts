import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Roles } from '../../models/roles.model';
import { UserOfRole } from '../../models/userOfRole.model';

@Component({
  selector: 'app-project-manager-list',
  templateUrl: './project-manager-list.component.html',
  styleUrl: './project-manager-list.component.scss'
})
export class ProjectManagerListComponent {

  projectManagers:UserOfRole[] = [];
  loading:boolean = false;

  constructor(private userService: UsersService){ }

  ngOnInit() {
    this.loading = true;
    const res = this.userService.getUsersOfRole(Roles['Project Manager']);
    res.then(users =>{
      console.log(users);      
      this.projectManagers = users;  
      this.loading = false;
    })
    
  }
}
