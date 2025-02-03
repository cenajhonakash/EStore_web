import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPath } from 'src/app/constants/api-path';
import { ItemRequest } from 'src/app/dto/inventory/request/item-request.model';
import { ItemResponse } from 'src/app/dto/inventory/response/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = `${environment.baseUrl}${environment.ios_context}${environment.inventory_path}` + ApiPath.ITEM.toString()

  constructor(private _http: HttpClient) { }

  getProducts() {

  }

  addProduct(product: ItemRequest) {
    return this._http.post<ItemResponse>(this.url, product, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }
}
