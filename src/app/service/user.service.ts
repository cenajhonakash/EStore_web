import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../dto/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _httpmodule: HttpClient) { }

  registerNewUser(user: User){
    return this._httpmodule.post<User>('http://localhost:8085/v1/ups', user)
  }
}
