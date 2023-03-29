import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, of, switchMap } from 'rxjs';
import { EntriesService } from '../../../app/shared/services/entries.service';
import { IslaEntry } from '../../../../src/app/shared/types/IslaEntry';

@Component({
  selector: 'app-entries-list',
  templateUrl: './entries-list.component.html',
  styleUrls: ['./entries-list.component.scss'],
})
export class EntriesListComponent implements OnInit {
  entries$!: Observable<IslaEntry[]>;
  displayedColumns: string[] = ['title', 'description', 'createdAt', 'updatedAt'];

  sortDataBehaviorSubject = new BehaviorSubject<Sort>({active: '', direction: ''}); //behave subject so we can have a default to emit
  sortDataAction$ = this.sortDataBehaviorSubject.asObservable();    //observable to when .next(sort) is triggered the comine latest kicks off since entries has already emitted

  constructor(
    private entries: EntriesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.entries$ = this.entries.getEntries$();    
  }

  sortData(sort: Sort): void {
    this.sortDataBehaviorSubject.next(sort);
  }
                                                                
   public data$ = combineLatest([this.entries.getEntries$(),   //get latest from the sort click and table
    this.sortDataAction$]).pipe(                                        
      switchMap(([unsortedEntry, sort]) => {             //cancel if another click comes through - and start again
        if (!sort.active || sort.direction === '') {
          return of(unsortedEntry);                  //return untouched table if no Sort behavior
        } else {
            const sortedData = unsortedEntry.map(item => ({
              ...item
            }) as IslaEntry);        
        
             sortedData.sort((a, b) => {
              const isAsc = sort.direction === 'asc';
              switch (sort.active) {
            case 'title':
              return this.compare(a.title, b.title, isAsc);
            case 'description':
              return this.compare(a.description, b.description, isAsc);
            case 'createdAt':
              return this.compare(a.createdAt.toString(), b.createdAt.toString(), isAsc);
            case 'updatedAt':
                return this.compare((a.updatedAt ?? 0).toString(), (b.updatedAt ?? 0).toString(), isAsc);              
            default:
              return 0;
          }})

        return of(sortedData);
  }}));

  compare(a: number | string, b: number | string, isAsc: boolean) {   //from angular docs
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  goToEntryDetail(entryId: string) {
    this.router.navigate([entryId], { relativeTo: this.route });
  }
}
