import { Component } from '@angular/core';
import { Repo } from '../interface/Repos.interface';

@Component({
  selector: 'app-repo-modal',
  templateUrl: './repo-modal.component.html',
  styleUrls: ['./repo-modal.component.scss']
})
export class RepoModalComponent {
  selectedRepo: Repo | null = null;
}
