import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntryFormComponent } from './entries/entry-form/entry-form.component';

const routes: Routes = [
  {
    path: 'entries',
    loadChildren: () =>
      import('./entries/entries.module').then((m) => m.EntriesModule),
  },
  {
    path: '',
    redirectTo: 'entries',
    pathMatch: 'full',
  },
  {
    path: 'entries/create/:id',    //passing in an id for the params inside component so we can reuse
    component: EntryFormComponent  
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
