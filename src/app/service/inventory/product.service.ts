import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPath } from 'src/app/constants/api-path';
import { ImageDetails } from 'src/app/dto/imageDetails.model';
import { ItemRequest } from 'src/app/dto/inventory/request/item-request.model';
import { ItemResponse } from 'src/app/dto/inventory/response/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = `${environment.baseUrl}${environment.ios_context}${environment.inventory_path}` + ApiPath.ITEM.toString()

  constructor(private _http: HttpClient) { }

  getAllProducts() {
    return this._http.get<ItemResponse[]>(this.url);
  }

  addProduct(product: ItemRequest, images: ImageDetails[]) {
    const fdata = new FormData()
    fdata.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));
    images.forEach(file => {
      fdata.append('otherImages', file!.file as Blob, file.file!.name)
    });
    return this._http.post<ItemResponse>(this.url, fdata);
  }
}
