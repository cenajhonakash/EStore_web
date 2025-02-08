import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPath } from 'src/app/constants/api-path';
import { CategoryResponse } from 'src/app/dto/inventory/response/category.model';
import { CategoryRequest } from 'src/app/dto/inventory/request/category-request.model';
import { environment } from 'src/environments/environment';
import { ImageDetails } from 'src/app/dto/imageDetails.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = `${environment.baseUrl}${environment.ios_context}${environment.inventory_path}` + ApiPath.CATEGORY.toString()

  constructor(private _http: HttpClient) { }

  getCategories() {
    return this._http.get<CategoryResponse[]>(this.url);
  }

  addCategory(category: CategoryRequest, images: ImageDetails[]) {
    const fdata = new FormData()
    fdata.append('category', new Blob([JSON.stringify(category)], { type: 'application/json' }));
    images.forEach(file => {
      fdata.append('otherImages', file!.file as Blob, file.file!.name)
    });
    return this._http.post<CategoryResponse>(this.url, fdata);
  }

  deleteCategory(cId: String) {
    return this._http.delete<CategoryResponse>(this.url + '/' + cId);
  }

  updateCategory(category: CategoryRequest, cId: any) {
    return this._http.put<CategoryResponse>(this.url + '/' + cId, category, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }
}
