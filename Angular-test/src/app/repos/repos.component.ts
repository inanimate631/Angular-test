import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../services/request.service';
import { Repo } from '../interface/Repos.interface';
import { RepoModalComponent } from '../repo-modal/repo-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss'],
})
export class ReposComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  userLogin: string | undefined;
  repos: Repo[] = [];

  constructor(
    private route: ActivatedRoute,
    private reqServices: RequestService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.userLogin = params['login'];
    });

    this.reqServices
      .getRepos(this.userLogin as string)
      .pipe(takeUntil(this.destroy$))
      .subscribe((repos: Repo[]) => {
        this.repos = repos;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openModal(repo: Repo) {
    const modalRef = this.modalService.open(RepoModalComponent, {
      ariaLabelledBy: 'modal-basic-title',
    });
    modalRef.componentInstance.selectedRepo = repo;
  }
}
