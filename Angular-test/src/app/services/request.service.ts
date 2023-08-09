import { Observable, catchError, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchResponse, User } from '../interface/Main.interface';
import { Repo } from '../interface/Repos.interface';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private url = 'https://api.github.com/'

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}users`);
  }

  searchUsers(name: string): Observable<SearchResponse> {
    return this.http.get<SearchResponse>(`${this.url}search/users?q=${name}`);
  }

  getRepos(login: string): Observable<Repo[]> {
    return this.http.get<Repo[]>(`${this.url}users/${login}/repos`);
  }
}
