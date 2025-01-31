import { Component } from '@angular/core';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent {
  categories = [{ name: 'Cloth', about: 'Cloth', coverImage: 'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=600' }
    ,{ name: 'Cloth', about: 'Cloth', coverImage: 'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=600' }
    ,{ name: 'Cloth', about: 'Cloth', coverImage: 'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=600' }
  ]
}
