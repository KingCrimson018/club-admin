import { Component, OnInit } from '@angular/core';
import { ClubService } from 'src/app/services/club.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {

  constructor(
    public clubS: ClubService,
    private userS: UserService
  ) { }

  ngOnInit() {

  }

}
