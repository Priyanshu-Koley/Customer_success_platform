import { Component } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { Roles } from '../../../models/roles.model';
import { UserOfRole } from '../../../models/userOfRole.model';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrl: '../list.scss',
})
export class AdminListComponent {
  admins: UserOfRole[] = [];
  loading: boolean = false;

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.loading = true;
    const res = this.userService.getUsersOfRole(Roles.Admin);
    res.then((users) => {
      console.log(users);
      this.admins = users;
      this.admins.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      this.loading = false;
    });
  }
}
