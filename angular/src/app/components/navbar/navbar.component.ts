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
  userId: string = Roles.Client;
  userRoleName: string = "Client";
  loading: boolean = false;

  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) public document: Document,
    private role: UserRoleService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.auth.user$.subscribe((user) => {
      //@ts-ignore
      this.userId = user.sub;
      console.log("User data: "+JSON.stringify(user));
      
    })
    try{      
      if (this.role.userRoleName === 'ProjectManager') 
      {
        this.userRoleName = 'Project Manager';
      }
      else{
        this.userRoleName = this.role.userRoleName;
      }
      this.loading = false;
    }
    catch (error) {
      console.log(error);
      this.loading = false;
    }

  }
}
