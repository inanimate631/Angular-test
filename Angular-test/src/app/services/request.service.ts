import { Observable, catchError, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchResponse, User } from '../interface/User.interface';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private url = 'https://api.github.com/'

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get(`${this.url}users`) as Observable<User[]>
  }

  searchUsers(name: string) {
    return this.http.get<SearchResponse>(`${this.url}search/users?q=${name}`)
  }
}
