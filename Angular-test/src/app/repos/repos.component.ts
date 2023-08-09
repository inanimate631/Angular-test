import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../services/request.service';
import { Repo } from '../interface/Repos.interface';
import { RepoModalComponent } from '../repo-modal/repo-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss']
})
export class ReposComponent implements OnInit {

  @ViewChild('repositoryModal', { static: false }) repoModal!: RepoModalComponent;
  userLogin: string | undefined;
  repos: Repo[] = [];

  constructor(private route: ActivatedRoute, private reqServices: RequestService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userLogin = params['login'];
      console.log(this.userLogin)
    });
    this.reqServices.getRepos(this.userLogin as string).subscribe(v => {
      console.log(v)
      this.repos = v
    })
  }

  openModal(repo: Repo) {
    const modalRef = this.modalService.open(RepoModalComponent, {
      ariaLabelledBy: 'modal-basic-title'
    });
    modalRef.componentInstance.selectedRepo = repo;
  }
}
