import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPath } from 'src/app/constants/api-path';
import { CategoryResponse } from 'src/app/dto/inventory/response/category.model';
import { CategoryRequest } from 'src/app/dto/inventory/request/category-request.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = `${environment.baseUrl}${environment.ios_context}${environment.inventory_path}` + ApiPath.CATEGORY.toString()

  constructor(private _http: HttpClient) { }

  getCategories() {
    return this._http.get<CategoryResponse[]>(this.url);
  }

  addCategory(category: CategoryRequest) {
    console.log('created url - ' + this.url)
    //this._http.post<CategoryResponse>('http://Jyoti:8585/v1/inventory/category', category, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
    return this._http.post<CategoryResponse>(this.url, category, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  deleteCategory(cId: String) {
    return this._http.delete<CategoryResponse>(this.url + '/' + cId);
  }

  updateCategory(category: CategoryRequest, cId: any) {
    return this._http.put<CategoryResponse>(this.url + '/' + cId, category, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }
}
