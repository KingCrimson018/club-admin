import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Club } from 'src/app/models.ts/models';
import { AdminService } from 'src/app/services/admin.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-add-club',
  templateUrl: './add-club.page.html',
  styleUrls: ['./add-club.page.scss'],
})
export class AddClubPage implements OnInit {
  clubForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private adminS: AdminService,
    private storageS: StorageService
  ) { 
    this.clubForm = this.fb.group({
      "name": ["", Validators.required],
      "zone": ["", Validators.required],
     })
  }

  ngOnInit() {
  }

  addClub(){
    let newClub: Club = {
      id: '',
      name: this.clubForm.value.name,
      zone: this.clubForm.value.zone,
      total: 0
    }

    this.adminS.addClub(newClub)
  }

}
