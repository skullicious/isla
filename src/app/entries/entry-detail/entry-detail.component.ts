import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { EntriesService } from '../../../../src/app/shared/services/entries.service';
import { IslaEntry } from '../../../../src/app/shared/types/IslaEntry';

@Component({
  selector: 'app-entry-detail',
  templateUrl: './entry-detail.component.html',
  styleUrls: ['./entry-detail.component.scss'],
})
export class EntryDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute, private entries: EntriesService, private router: Router) {}

  entry$!: Observable<IslaEntry>;

  ngOnInit(): void {
    this.entry$ = this.route.params.pipe(
      map((params) => params['id']),
      switchMap((id) => this.entries.getEntryById$(id))
    );
  }

  editEntry(entry: IslaEntry) {
    this.router.navigate([`entries/create/${entry.id}`]); //Just navigating here and passing the id to determin if edit or not
  }
}
