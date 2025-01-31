import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiPath } from 'src/app/constants/api-path';
import { CategoryResponse } from 'src/app/dto/inventory/response/category.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories?: CategoryResponse

  constructor(private _http: HttpClient) { }

  ngOnInit(): void {
  }

}
