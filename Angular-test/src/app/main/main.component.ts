import { Component, OnInit } from '@angular/core';
import { SearchResponse, User } from '../interface/User.interface';
import { RequestService } from '../services/request.service';
import { catchError, take } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  users: User[] | null = null;
  timeout: ReturnType<typeof setTimeout> | null = null;
  searchErrorName: string | null = null;

  constructor(private reqServices: RequestService) { }

  ngOnInit(): void {
    this.reqServices.getUsers().pipe(take(1)).subscribe(v => {
      this.users = v
    })
  }

  onInputChange(event: any) {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
    this.timeout = setTimeout(() => {
      this.reqServices.searchUsers(event.target.value as string).pipe(take(1),
        catchError(error => {
          this.searchErrorName = `ERROR: ${error.message}`;
          return 'error'
        })).subscribe((v: string | SearchResponse) => {
          if (typeof v === 'string') {
            return
          }
          this.searchErrorName = null
          this.users = v.items
        })
    }, 500)
  }
}
