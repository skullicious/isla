import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY, first, Observable, Subscription, tap} from 'rxjs';
import { EntriesService } from '../../../../src/app/shared/services/entries.service';
import { IslaEntry } from '../../../../src/app/shared/types/IslaEntry';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss'],
})
export class EntryFormComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  errorMsg: string = '';

  id = null;
  isNew = false;

  islaEntryToEdit!: IslaEntry;

  islaEntryToEdit$: Observable<IslaEntry> | undefined;

  createdEntry$: Observable<string> | undefined;

  editedEntry$: Observable<string> | undefined;

  options = this.route.snapshot.params['id']; //if there is an id being passed we are editing

  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private entries: EntriesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.isNew = this.id === undefined ? true : false;

    this.form = this.fb.group({
      title: ['', Validators.required], //https://blog.logrocket.com/angular-formbuilder-reactive-form-validation/#whatisformvalidationinangular
      description: ['', Validators.required], // In our environment we pass in formitems with all different validators ie for GUIDS, regex evaluations, numbers etc...
    });

    if (!this.isNew && this.id) {
      //if in edit mode we are going to use the getEntry by id observable
    this.islaEntryToEdit$ = this.entries
      .getEntryById$(this.id) // and populate the data
      .pipe(
        first(),
        tap(islaEntry => {
          this.form.patchValue(islaEntry);
        })
      )}
    }

   hasErrors(fieldName: string): boolean {
    return (
      this.form.controls[fieldName]?.invalid &&
      (this.form.controls[fieldName]?.dirty ||
        this.form.controls[fieldName]?.touched)
    );
  }

  hasRequiredError(fieldName: string): boolean {
    return this.form.controls[fieldName]?.errors?.['required'] === true;
  }

  validateFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

  submit() {
    if (this.form.valid) {
      let entityId = '';

      if (this.isNew) {        
        this.createdEntry$ = this.entries
          .createEntry$(this.form.value)
          .pipe(
            tap(entity => this.router.navigate([`entries/${entity}`]))
          )
      } else {
        const entryToEdit: IslaEntry = {
          ...this.islaEntryToEdit,
          id: this.id!,
          title: this.form.value['title'],
          description: this.form.value['description'],
        };

        this.editedEntry$ = this.entries
          .updateEntry$(entryToEdit)
          .pipe(
            tap(entity => this.router.navigate([`entries/${entity}`]))
          )} 
    } else {
      this.validateFields(this.form);
    }
  }
}

//https://jasonwatmore.com/post/2020/09/02/angular-combined-add-edit-create-update-form-example
