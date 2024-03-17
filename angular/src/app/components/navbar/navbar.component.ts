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

  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) public document: Document,
    private role: UserRoleService
  ) {}

  ngOnInit() {
    this.auth.user$.subscribe((user) => {
      //@ts-ignore
      this.userId = user.sub;
    })
    // const res = this.role.getRole(this.userId);
    
    this.role.userRoleSubject.subscribe((data) => {
      if (data.name === 'ProjectManager') 
      {
        this.userRoleName = 'Project Manager';
      }
      else{
        this.userRoleName = data.name;
      }
      
    });



  }
}
