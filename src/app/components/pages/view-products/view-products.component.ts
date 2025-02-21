import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AppConstants } from 'src/app/constants/app-constants';
import { ImageDetails } from 'src/app/dto/imageDetails.model';
import { ItemRequest } from 'src/app/dto/inventory/request/item-request.model';
import { CategoryResponse } from 'src/app/dto/inventory/response/category.model';
import { ItemResponse } from 'src/app/dto/inventory/response/product.model';
import { LoaderService } from 'src/app/service/common/loader.service';
import { CategoryService } from 'src/app/service/inventory/category.service';
import { ProductService } from 'src/app/service/inventory/product.service';
import { setProducts } from 'src/app/store/inventory/product.action';
import { AppHelper } from 'src/app/util/helper';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {

  // categories: ItemResponse[] = []
  products: ItemResponse[] = []
  pickedItem?: ItemResponse
  isAdmin: any;
  toUpdateItem: ItemRequest = new ItemRequest(undefined, '', '', '', undefined, undefined, undefined, '')
  images: ImageDetails[] = [];
  cId: any;
  searchQuery: string = '';
  filteredProducts: ItemResponse[] = []

  // sortedBy: string = 'name'; // Default sorting by name
  currentPage: number = 1;
  itemsPerPage: number = 10; // Number of products per page
  page: number = AppConstants.DEFAULT_PAGE_NUMBER;
  pageSize: number = AppConstants.PAGE_SIZE;  // Initial page size
  collectionSize: number = AppConstants.MAX_ITEM_SIZE; // Total number of items

  selectedImage: string = '';

  constructor(private _toast: ToastrService, private _categoryService: CategoryService, public _loader: LoaderService, private _helper: AppHelper, private modalService: NgbModal
    , private _pStore: Store<{ products: ItemResponse[] }>, private _productService: ProductService, private _route: ActivatedRoute) { }

  // ngOnInit(): void {
  //   this._pStore.select("products").subscribe({
  //     next: products => {
  //       if (products.length > 0) {
  //         console.log('Products already in store')
  //         this.products = products
  //         this.validateAndFilterProductForCategory()
  //       } else {
  //         console.log('Loading category from backend')
  //         this._productService.getAllProducts().subscribe({
  //           next: (data) => {
  //             this.products = data
  //             if (this.products.length > 0)
  //               this._pStore.dispatch(setProducts({ products: this.products }))
  //             this.validateAndFilterProductForCategory()
  //           },
  //           error: (error) => {
  //             console.log('error loading category' + error)
  //             this._toast.error('Error loading category', 'Warning', { positionClass: 'toast-center-center', timeOut: 3000 })
  //           }
  //         });
  //       }
  //     }
  //   })
  // }

  ngOnInit(): void {
    console.log('Loading Products')

    this.cId = this._route.snapshot.paramMap.get('cId')
    console.log('category id from router: ' + this.cId)
    if (this.cId) {
      this.validateAndFilterProductForCategory()
    } else
      this.loadProducts()
  }

  open(content: any, item: ItemResponse) {
    // console.log('Inside open Item modal')
    this.pickedItem = item
    //console.log('Picked item is: ' + JSON.stringify(this.pickedItem))
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true });
  }

  updateProduct(itemId: string) {
    console.log('Update req body: ' + JSON.stringify(this.toUpdateItem))
    this._productService.updateProduct(itemId, this.toUpdateItem, this.images).subscribe({
      next: (data) => {
        console.log('Succesfully updated product: ' + JSON.stringify(data))
        this._toast.success('Succesfully updated product: ' + this.pickedItem?.name, 'Warning', { positionClass: 'toast-center-center', timeOut: 3000 })
        this.modalService.dismissAll()
      },
      error: (error) => {
        console.log('error updating product' + error)
        this._toast.error('Error updating product: ' + this.pickedItem?.name, 'Warning', { positionClass: 'toast-center-center', timeOut: 3000 })
      }
    })
  }

  deleteProduct(itemId: string) { }
  // Handle image selection
  onImageChange(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.images = Array.from(files).map(file => {
        if (file.type != 'image/png' && file.type != 'image/jpeg' && file.type != 'image/webp') {
          this._toast.warning('Format not supported for file: ' + file.name, 'Warning', { positionClass: 'toast-center-center', timeOut: 3000 })
        } else if (file.size > 60000) { // 30000 = 30KB
          this._toast.warning('Size not supported for file: ' + file.name, 'Warning', { positionClass: 'toast-center-center', timeOut: 3000 })
        }
        else {
          const pu = URL.createObjectURL(file);
          const imgD: ImageDetails = { previewImage: pu, file: file }
          return imgD
        }
        return { previewImage: '', file: undefined }
      }).filter(file => file.previewImage != '');
    }
  }

  filterProducts() {
    if (this.searchQuery.trim() === '') {
      console.log('No search query passed. Loading all products')
      // this._pStore.select("products").subscribe({
      //   next: products => {
      //     console.log('No search query passed. Loading all products')
      //     this.products = products
      //   }
      // })
      this.loadProducts()
    } else {
      this.products = this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  // private validateAndFilterProductForCategory() {
  //   this.cId = this._route.snapshot.paramMap.get('cId')
  //   console.log('category id from router: ' + this.cId)
  //   if (this.cId) {
  //     this.products = this.products.filter(p => p.cId === this.cId)
  //     this.modalService.dismissAll()
  //   }
  // }

  private validateAndFilterProductForCategory() {
    this._productService.getProductsForCategory(this.cId, this.page, this.pageSize).subscribe({
      next: products => {
        if (products.length > 0)
          this.products = products
      }, error: error => {
        console.log('error loading category' + error)
        this._toast.error('Error loading category', 'Warning', { positionClass: 'toast-center-center', timeOut: 3000 })
      }
    })
    this.products = this.products.filter(p => p.cId === this.cId)
    this.modalService.dismissAll()
  }

  loadProducts() {
    this._productService.getProducts(this.page, this.pageSize).subscribe({
      next: products => {
        if (products.length > 0)
          this.products = products
      }, error: error => {
        console.log('error loading category' + error)
        this._toast.error('Error loading category', 'Warning', { positionClass: 'toast-center-center', timeOut: 3000 })
      }
    })
  }

  onPageChange(number: any) {
    console.log('on page: ' + number)
    this.cId = this._route.snapshot.paramMap.get('cId')
    console.log('category id from router: ' + this.cId)
    if (this.cId) {
      this.validateAndFilterProductForCategory()
    } else
      this.loadProducts()
  }

  openImageModal(content: any, imageUrl: any) {
    this.selectedImage = imageUrl
    this.modalService.open(content,  { ariaLabelledBy: 'modal-basic-title', centered: true });
  }
}

