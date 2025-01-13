import { Component, Renderer2, ElementRef, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/core/services/clients/client.service';
import { ClientListHeader } from 'src/app/modal/table-headers';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  constructor(private route: Router, private _Client: ClientService, private _fb: FormBuilder) { }
  @Output() addNewEvent = new EventEmitter<string>();
  tableTitle: string = 'Clients';
  headers: any[] = ClientListHeader;
  showAddNew: boolean = true;
  selectedClient: any;
  searchForm!: FormGroup;
  filteredClient!: any[];
  ClientList!: any[];
  ngOnInit(): void {
    this.getClientList();
    this.initializeForm()

  }

  addNewClient() {
    this.route.navigate(['app/clients/add-new'])
  }
  public viewClientData: any
  viewClient(i: any) {
    this.selectedClient = this.filteredClient.find(res => res.id == i);
  }

  initializeForm() {
    this.searchForm = this._fb.group({
      keyword: [''],
    });
  }
  getClientList(): void {
    this._Client.getClientList().subscribe((res: any) => {
      this.selectedClient = res.data[0];
      this.ClientList = res?.data;
      this.filteredClient = res?.data;
      console.log(  this.filteredClient)
    })
  }

  deleteClient(id: string){
    this._Client.deleteClient(id).subscribe((res: any) => {
    this.getClientList();
    })
  }
  selected: boolean = false;

  editClient(i: string) {

    this.route.navigateByUrl("/app/clients/edit-client/" + i)

  }

  search(keyword: any) {
    if (keyword && keyword !== null) {
      this.filteredClient = keyword ? this.ClientList.filter((res: any) => {
        return res.clientName.toLowerCase().includes(keyword.toLowerCase()) || res.contactPerson.includes(keyword);
      }) : this.ClientList
    }
    else {
      this.filteredClient = this.ClientList;
    }
  }

}
