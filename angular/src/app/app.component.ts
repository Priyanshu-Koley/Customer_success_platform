import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UserRoleService } from './services/user-role.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  userId: string = '';
  constructor(public auth: AuthService,  private role: UserRoleService) { 
    
    this.auth.user$.subscribe((user) => {
      //@ts-ignore
      this.userId = user.sub;
      role.getRole(this.userId);
    });


  }


}
