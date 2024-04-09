import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UserRoleService } from '../../services/user-role.service';
import { Roles } from '../../models/roles.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  userRoleName: string = "Client";
  loading: boolean = false;

  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) public document: Document,
    private role: UserRoleService
  ) {}

  ngOnInit() {
    this.loading = true;    
    if(this.role.userRoleId != '')
    {      
      if (this.role.userRoleName === 'ProjectManager') 
      {
        this.userRoleName = 'Project Manager';
      }
      else{
        this.userRoleName = this.role.userRoleName;
      }
      this.loading = false;
    }
    else{
      console.log("Role is not setted");
      this.loading = false;
    }
  }
}
