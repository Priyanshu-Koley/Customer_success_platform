import { Component } from '@angular/core';
import { UserOfRole } from '../../../models/userOfRole.model';
import { UsersService } from '../../../services/users.service';
import { Roles } from '../../../models/roles.model';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrl: '../list.scss',
})
export class ClientListComponent {
  clients: UserOfRole[] = [];
  loading: boolean = false;

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.loading = true;
    const res = this.userService.getUsersOfRole(Roles.Client);
    res.then((users) => {
      console.log(users);
      this.clients = users;
      this.clients.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      this.loading = false;
    });
  }
}
