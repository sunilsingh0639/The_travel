import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/core/services/users/user.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
})
export class ListViewComponent implements OnInit {
  @Input()
  title: string = '';
  @Input()
  showAddNew: boolean = false;
  @Input()
  showMultipleDelete: boolean = false;
  @Input()
  addNewLabel: string = '';
  @Input()
  showAddNewButton: boolean = false;
  @Input()
  showCheckbox: boolean = false;
  @Input()
  headers: any[] = [];
  @Output() addNewEvent = new EventEmitter<string>();
  @Input()
  data: any[] = [];
  @Input()
  hideSearchForm: boolean = false;
  @Output() viewEvent = new EventEmitter<string>();
  selected: any[] = [];
  @Output() editEvent = new EventEmitter<string>();
  @Output() searchEvent = new EventEmitter<string>();
  @Output() paginationEvent = new EventEmitter<number>();
  searchForm!: FormGroup;
  @Input()
  totalRecords: number = 0;
  @Input()
  apiPagination: boolean = false;
  // searchForm!:FormGroup;
  // all : any;
  // userList: any;
  @Input()
  pageNumber: number = 1;
  @Input()
  numberOfPages: number[] = [];
  @Input()
  hideDelete: boolean = false;
  constructor(private listService: UserService, private _fb: FormBuilder) {}
  ngOnInit(): void {
    this.searchForm = this._fb.group({
      keyword: [''],
    });
    this.searchForm.controls['keyword'].valueChanges.subscribe((res) => {
      this.searchEvent.emit(res);
    });
  }
  viewUser(id: string) {
    this.viewEvent.emit(id);
  }

  selectedId: any;
  @Output() deleteEvent = new EventEmitter<string>();

  // searchForm!:FormGroup;
  // all : any;
  // userList: any;

  public get keyword(): any {
    return this.searchForm.controls['keyword'];
  }

  addNew() {
    this.addNewEvent.emit('add New');
  }

  editUser(id: string) {
    this.editEvent.emit(id);
  }
  deleteUser() {
    this.deleteEvent.emit(this.selectedId);
  }
  sortBy(field: string, sortType: boolean) {}

  public get pages(): number[] {
    let pages = [];
    if(this.data){
      const totalCount = this.totalRecords > 0 ? this.totalRecords : this.data.length;
      if (totalCount > 0) {
        for (let index = 0; index < totalCount / 10; index++) {
          pages.push(index + 1);
        }
        return pages;
      }
    }

    return [];
  }

  public get startFrom(): number {
    if (this.pageNumber > 1) {
      return this.pageNumber + 5 > this.pages[this.pages.length - 1]
        ? this.pages.length - 5
        : this.pageNumber - 1;
    }
    return 0;
  }
  public get end(): number {
    if (this.pageNumber > 1) {
      return this.pageNumber + 5 > this.pages[this.pages.length - 1]
        ? this.pages[this.pages.length - 1]
        : this.pageNumber + 5;
    }
    return 5;
  }
  onSelect(id: string) {
    if (this.selected.includes(id)) {
      const i = this.selected.indexOf(id);
      this.selected.splice(i, 1);
    } else {
      this.selected.push(id);
    }
  }

  public get isAllSelected(): boolean {
    // if(this.selected.){

    // }
    return false;
  }

  search() {
    this.searchEvent.emit(this.keyword.value);
    this.pageNumber = 1
  }
  getPreviousPageData(){
    this.paginationEvent.emit(this.pageNumber-1);

  }
  getNextPageData(){
    this.paginationEvent.emit(this.pageNumber+1);
  }
  getPageData(page: number){
    this.paginationEvent.emit(page);
  }
}
