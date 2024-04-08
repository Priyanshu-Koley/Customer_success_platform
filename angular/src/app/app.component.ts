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
  userRoleID: string = '';
  loading: boolean = false;
  
  constructor(public auth: AuthService,  private role: UserRoleService) {

    try {
      this.loading = true;
      this.auth.user$.subscribe(async (user: any) => 
      {
        //@ts-ignore
        this.userId = user.sub;
        let res = await role.getRole(this.userId, true);
        this.userRoleID = res.id;
        this.loading = false;
      });
      
    } 
    catch (error) {
      console.log(error);
      this.loading = false;
      
    }
  }

  setLoading(value: boolean) {
    this.loading = value;
  }


}
