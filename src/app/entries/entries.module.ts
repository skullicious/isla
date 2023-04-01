import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntriesRoutingModule } from './entries-routing.module';
import { EntriesListComponent } from './entries-list/entries-list.component';
import { EntryDetailComponent } from './entry-detail/entry-detail.component';
import { SharedModule } from '../shared/shared.module';
import { EntryFormComponent } from './entry-form/entry-form.component';

@NgModule({
  declarations: [EntriesListComponent, EntryDetailComponent, EntryFormComponent],
  imports: [CommonModule, EntriesRoutingModule, SharedModule]
})
export class EntriesModule {}
