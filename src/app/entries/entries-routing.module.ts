import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntriesListComponent } from './entries-list/entries-list.component';
import { EntryDetailComponent } from './entry-detail/entry-detail.component';
import { EntryFormComponent } from './entry-form/entry-form.component';

const routes: Routes = [
  { path: '', component: EntriesListComponent },
  { path: 'create', component: EntryFormComponent },
  { path: ':id', component: EntryDetailComponent },
  {
    path: 'create/:id',    //passing in an id for the params inside component so we can reuse
    component: EntryFormComponent  
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntriesRoutingModule {}
