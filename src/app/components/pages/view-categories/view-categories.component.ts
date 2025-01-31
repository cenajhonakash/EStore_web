import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoryResponse } from 'src/app/dto/inventory/response/category.model';
import { CategoryService } from 'src/app/service/inventory/category.service';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories: CategoryResponse[] = []
  constructor(private _toast: ToastrService, private _categoryService: CategoryService) { }

  ngOnInit(): void {
    this._categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data
      },
      error: error => {
        console.log('error creating category' + error)
        this._toast.error('Error creating category', 'Warning', { positionClass: 'toast-center-center', timeOut: 2000 })
      }
    })
  }
}
