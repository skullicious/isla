import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { EntriesService } from 'src/app/shared/services/entries.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { IslaEntry } from 'src/app/shared/types/IslaEntry';

import { EntryFormComponent } from './entry-form.component';

fdescribe('EntryFormComponent', () => {
  let component: EntryFormComponent;
  let fixture: ComponentFixture<EntryFormComponent>;
  let formBuilder: FormBuilder;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  let entriesService: EntriesService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryFormComponent ],
      imports: [ SharedModule, NoopAnimationsModule ],
      providers: [ 
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { id: '666' } } }
        },
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') }
        }      
    ],
    })
    .compileComponents();
  });

  const islaEntry: IslaEntry = { id: '666', title: 'test', description: 'description', createdAt: new Date() };

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryFormComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    entriesService = TestBed.inject(EntriesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('forms', () => {  

    it('should add new entry then navigate to details page in create mode', () => {
      spyOn(entriesService, 'createEntry$').and.returnValue(of('666')); //needs to return so can nav
      component.isNew = true;
      component.form.patchValue({ title: 'test', description: 'description' });

      component.submit();

      expect(entriesService.createEntry$).toHaveBeenCalledWith({ title: 'test', description: 'description' } as IslaEntry);
      expect(router.navigate).toHaveBeenCalledWith(['entries/666']);
    });


    it('on getEntryById should get entry by id and populate form in edit mode', () => {
      
      spyOn(entriesService, 'getEntryById$').and.returnValue(of(islaEntry));

      component.ngOnInit();

      expect(entriesService.getEntryById$).toHaveBeenCalledWith('666');
      expect(component.isNew).toBe(false);
      expect(component.islaEntryToEdit).toEqual(islaEntry);
      expect(component.form.value.title).toEqual(islaEntry.title);
      expect(component.form.value.description).toEqual(islaEntry.description);
    });  
  });

  describe('validation', () => {

      it('should return valid if title is empty', () => {
      component.form.setValue({
        'title': '',
        'description': 'a description'
      })
      expect(component.form.valid).toEqual(false);
    });

    it('should return valid if description is empty', () => {
      component.form.setValue({
        'title': 'valid title',
        'description': ''
      })
      expect(component.form.valid).toEqual(false);
    });

    it('should return valid if all fields empty', () => {
      component.form.setValue({
        'title': '',
        'description': ''
      })
      expect(component.form.valid).toEqual(false);
    });
  });

  describe('submit', () => {

    it('should NOT navigate on submit if form is NOT valid', () => {
      spyOn(component, 'validateFields').and.callThrough();

      component.form.setValue({
        'title': '',
        'description': ''
      });

      component.submit();

      expect(component.form.valid).toEqual(false);
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should navigate on submit if form IS valid', () => {
      spyOn(component, 'validateFields').and.callThrough();

      component.form.setValue({
        'title': 'this is valid',
        'description': 'this is also valid'
      });

      component.submit();

      expect(component.form.valid).toEqual(true);
      expect(router.navigate).toHaveBeenCalled();
    });
  })  
});
