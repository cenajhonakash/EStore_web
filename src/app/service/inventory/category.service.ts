import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPath } from 'src/app/constants/api-path';
import { CategoryResponse } from 'src/app/dto/inventory/category.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = `${environment.baseUrl}/${environment.inventory_path}/` + ApiPath.CATEGORY.toString()

  constructor(private _http: HttpClient) { }

  getCategories() {
    return this._http.get<CategoryResponse>(this.url);
  }
}
