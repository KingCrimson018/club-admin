import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { User } from 'src/app/models.ts/models';
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
    private userS: UserService,
    private actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
    
  }

  disableUser(memberId: string){
    this.clubS.disableMember(memberId);
    this.clubS.getMembers(this.clubS.club?.id || "").forEach(res => {
      res.docs.forEach(member => {
        this.clubS.members.push(member.data())
      })
    })
  }

  enableUser(memberId: string){
    this.clubS.enableMember(memberId);
    this.clubS.getMembers(this.clubS.club?.id || "").forEach(res => {
      res.docs.forEach(member => {
        this.clubS.members.push(member.data())
      })
    })
  }

  async presentActionSheet(member: User){
    let action = ""
    if(member.disable == true){
      action = "Enable"
    }else{
      action = "Disable"
    }
    const actionSheet = await this.actionSheetController.create({
      header: "options",
      buttons: [
        {
          text: action,
          role: "destructive",
          handler: () => {
            if(member.disable == true){
              this.enableUser(member.id)
            }else{
              this.disableUser(member.id)
            }
          }
        }, 
        {
          text: "Cancel",
          role: "Cancel",
          handler: () => {
            actionSheet.dismiss()
          }
        }
      ]
    })
    await actionSheet.present()
  }
}
