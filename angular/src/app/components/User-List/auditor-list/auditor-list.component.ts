import { Component } from '@angular/core';
import { Roles } from '../../../models/roles.model';
import { UserOfRole } from '../../../models/userOfRole.model';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-auditor-list',
  templateUrl: './auditor-list.component.html',
  styleUrl: '../list.scss',
})
export class AuditorListComponent {
  auditors: UserOfRole[] = [];
  loading: boolean = false;

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.loading = true;
    const res = this.userService.getUsersOfRole(Roles.Auditor);
    res.then((users) => {
      console.log(users);
      this.auditors = users;
      this.auditors.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      this.loading = false;
    });
  }
}
