import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/services/commom/common.service';
import { ProfileService } from 'src/app/core/services/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileData!:any
  allPrivilages!:any
  
  constructor(private profileService: ProfileService,private _common:CommonService) { }

  ngOnInit(): void {
    this.getProfileData();
    this.getPrivilages();
  }

  getProfileData() {
    this.profileService.getProfileData()
    .subscribe(res =>{
      this.profileData =res
    })
  }

  getPrivilages(){
    this.profileService.getPrivilages()
    .subscribe((res: any) =>{
      this.allPrivilages = res.privilege
    })
  }
  setProfileData(){
    this.profileService.setData(this.profileData)
  }
  
  public get proFileImage():string{
    return this._common.proFileImage
  }
}
