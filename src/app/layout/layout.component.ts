import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../core/services/commom/common.service';
import { NotificationService } from '../feature/notification.service';
import { AdminMenuList, SubscribersIndividualMenuList, SubscribersMenuList } from '../modal/menu';
import { ProfileService } from '../core/services/profile/profile.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  menuList: any[] = [];
  showProfileMenu: boolean = false;
  settingLink: string = '';
  profile: any;
  allNotifications: any;
  allDownloads: any;

  constructor(private router: Router, private _service: CommonService,
    private notifiService: NotificationService, private editProfileService: ProfileService) {
    this.settingLink = '/app/profile/adm-settings';
  }

  ngOnInit(): void {
    // this.getUserProfile();
  }

  // changeUser(type: string){
  //   if(type == 'admin'){
  //     this.menuList = AdminMenuList;
  //     this.settingLink = '/app/profile/adm-settings'
  //   }
  //   else if(type == 'subscriber'){
  //     this.menuList = SubscribersMenuList;
  //     this.settingLink = '/app/profile/settings'
  //   } else{
  //     this.menuList = ClientMenuList;
  //     this.settingLink = '/app/profile/settings'
  //   }

  // }

  viewMoreNotifications() {
    this.router.navigateByUrl("/app/profile/notification")
  }

  viewMoreDownloads() {
    this.router.navigateByUrl("/app/profile/download-notification")
  }


  public isMatchUrl(url: string): boolean {
    if (this.router.url.includes(url)) {
      return true
    }
    return false;
  }

  /**
   * getUserProfile
   * 
   */
  getUserProfile() {
    this._service.getUserProfile()
      .subscribe((res: any) => {
        this.profile = res;
        this.getProfilePriviligs()
        if (res.subscriberVoLoginResponse.subscriberType === 'TAX_PROFESSIONAL') {
          this.menuList = SubscribersMenuList;
        }
        else if (res.subscriberVoLoginResponse.subscriberType === 'INDIVIDUAL_COMPANY') {
          this.menuList = SubscribersIndividualMenuList;
        }
        else {
          this.menuList = AdminMenuList;
        }
        if (res.profilePicture) {
          this.getProfilePic(res);
        }
      })
  }

  getProfilePic(res: any) {
    const reqData = {
      imagepath: res.profilePicture,
      imagename: res.profilePicture,
    }
    this.editProfileService.getProfilePic(reqData).subscribe((res => {
      this._service.setProfilePic(res?.profilePictureLink)
    }))
  }

  getProfilePriviligs() {
    this.editProfileService.getProfilePriviligs()
      .subscribe((res => {
        res.privilege.forEach((element: any) => {
          if (!element.privilegeCode) {
            element.privilegeCode = element.name.replaceAll(' ', '').toLowerCase()
          }
        });
        this.menuList = this.findCommonMenus(this.menuList, res.privilege, 'privilegeCode');
      }))
  }
  notifications() {
    this.notifiService.notificationList(2)
      .subscribe((res: any) => {
        console.log(res)
        this.allNotifications = res.uiNotifications
      })
  }

  downloadRecon() {
    this.notifiService.downloadRecons(2)
      .subscribe((res: any) => {

      })
  }
  findCommonMenus(arr1: any, arr2: any, key: string) {
    const valueSet = arr2.map((item: any) => item[key]);
    let temp = [];
    for (const item of arr1) {
      if (item.childrens.length == 0 && valueSet.indexOf(item[key]) > -1) {
        temp.push(item);
      }
      if (item.childrens.length > 0) {
        let childrens: any[] = [];
        item.childrens.forEach((element: any) => {
          if (valueSet.indexOf(element[key]) > -1) {
            childrens.push(element);
          }
        });
        if (childrens.length > 0) {
          item.childrens = [...childrens];
          temp.push(item);
        }
      }
    }

    return temp;
  }




  public get subsType(): string {
    return this._service.subsType;
  }

  downloadFileExportes() {
    this.notifiService.downloadFileExportes().subscribe((res: any) => {
      this.allDownloads = res
    })
  }
  public get proFileImage(): string {
    return this._service.proFileImage ? this._service.proFileImage : 'assets/images/users/user-dummy-img.jpg'
  }
}
