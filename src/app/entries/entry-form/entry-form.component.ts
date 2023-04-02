import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY, first, Subscription} from 'rxjs';
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
      const sub = this.entries
        .getEntryById$(this.id) // and populate the data
        .pipe(first())
        .subscribe((islaEntry) => {
          this.islaEntryToEdit = islaEntry;
          return this.form.patchValue(islaEntry);
        });
      this.subscriptions.push(sub);
    }
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
    //https://loiane.com/2017/08/angular-reactive-forms-trigger-validation-on-submit/

    if (this.form.valid) {
      let entityId = '';

      if (this.isNew) {        
        //If new, add the item as normal
        const sub = this.entries
          .createEntry$(this.form.value)
          .pipe(
            catchError((err) => {
              this.errorMsg = err; //pass to error msg svc or maybe a banner on page?
              return EMPTY;
            })
          ).subscribe(entity => entityId = entity);

        this.subscriptions.push(sub);
      } else {
        //If in EDIT mode, add the id we got onInit and use that later to find the index of item we want to edit.
        const entryToEdit = {
          ...this.islaEntryToEdit, //get item as returned from obs
          id: this.id!, // replace required fields
          title: this.form.value['title'], // would loop through if a bigger form but doesnt seem worth it
          description: this.form.value['description'],
        };

        const sub = this.entries
          .updateEntry$(entryToEdit)
          .pipe(
            catchError((err) => {
              this.errorMsg = err; //pass to error msg svc or maybe a banner on page?
              return EMPTY;
            })
          ).subscribe(entity => entityId = entity);

          this.subscriptions.push(sub);
        }
      this.router.navigate([`entries/${entityId}`]); //navigate to the newly created entity
    } else {
      this.validateFields(this.form);
    }
  }
}

//https://jasonwatmore.com/post/2020/09/02/angular-combined-add-edit-create-update-form-example
