import { Component } from '@angular/core';
import { UserRoleService } from '../../services/user-role.service';
import { Roles } from '../../models/roles.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  activePage: number = 1;
  userRoleId: string = '';
  userRoleName: string = '';
  roles = Roles;

  constructor(private role:UserRoleService){}

  ngOnInit(): void {
    if(this.role.userRoleId != '' )
    {
      this.userRoleId = this.role.userRoleId;
      this.userRoleName = this.role.userRoleName;
    }
    else
    {
      this.userRoleId = this.roles.Client;     
    }
  }

}
