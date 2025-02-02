import { Component, OnInit, signal, TemplateRef, WritableSignal } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategoryResponse } from 'src/app/dto/inventory/response/category.model';
import { LoaderService } from 'src/app/service/common/loader.service';
import { CategoryService } from 'src/app/service/inventory/category.service';
import { AppHelper } from 'src/app/util/helper';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories: CategoryResponse[] = []
  pickedCategory?: CategoryResponse
  isAdmin: any;

  constructor(private _toast: ToastrService, private _categoryService: CategoryService, public _loader: LoaderService, private _helper: AppHelper, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.isAdmin = this._helper.isRoleAdmin()
    this._categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data
      },
      error: error => {
        console.log('error loading category' + error)
        this._toast.error('Error loading category', 'Warning', { positionClass: 'toast-center-center', timeOut: 2000 })
      }
    })
  }


  open(content: any, category: CategoryResponse) {
    this.pickedCategory = category
    // TODO for STORE-MANAGER role, view sales data of the category in last one month | Call view Sales API
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true });
  }

  deleteCategory(content: any, category: CategoryResponse) {
    this.pickedCategory = category
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true })
      .result.then((result) => {
        // Call service
        this._categoryService.deleteCategory(category.id).subscribe({
          next: (data) => {
            this._toast.success('Deleted category: ' + category.name, 'Success', { positionClass: 'toast-center-center', timeOut: 3000 })
            this.modalService.dismissAll();
            this.categories = this.categories.filter(c => c.id != category.id);
          },
          error: error => {
            console.log('error creating category' + error)
            this._toast.error('Error deleting category: ' + category.name, 'Warning', { positionClass: 'toast-center-center', timeOut: 3000 })
          }
        })
      });
  }
}
