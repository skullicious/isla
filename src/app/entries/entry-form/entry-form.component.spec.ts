import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { EntriesService } from 'src/app/shared/services/entries.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { IslaEntry } from 'src/app/shared/types/IslaEntry';
import { TestScheduler } from 'rxjs/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { EntryFormComponent } from './entry-form.component';

describe('EntryFormComponent', () => {
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

  const mockIslaEntry: IslaEntry = { id: '666', title: 'test', description: 'description', createdAt: new Date() };

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

  describe('Marbles tests', () => {
    let testScheduler: TestScheduler;
  
    beforeEach(() => {
      testScheduler = new TestScheduler((actual, expected) =>
        expect(actual).toEqual(expected)
      );
    });

    it('createEntry$ should return entity ID', () => {
      const createEntrySpy = spyOn(entriesService, 'createEntry$').and.returnValue(of('666'));
      const entryToAdd = mockIslaEntry;
      const expectedEntityId = '666';
  
      testScheduler.run(({ expectObservable }) => {
        const output = '(a|)';
        const expected = { a: expectedEntityId };                                                          
  
        expectObservable(entriesService.createEntry$(entryToAdd)).toBe(output, expected);
      });
      
      expect(createEntrySpy).toHaveBeenCalledOnceWith(entryToAdd);
      expect(component.errorMsg).toBe('');
    });

    // fit('createEntry$ should handle error', () => {
    //   const createEntrySpy = spyOn(entriesService, 'createEntry$').and.returnValue(throwError('error'));
    //   const entryToAdd = mockIslaEntry;
    //   const expectedError = 'Error: BANG!';
  
    //   testScheduler.run(({ expectObservable }) => {
    //     const output = '#';
    //     const expected = { a: expectedError };                                                          
  
    //     expectObservable(entriesService.createEntry$(entryToAdd)).toBe(output, expected);
    //   });
      
    //   expect(createEntrySpy).toHaveBeenCalledOnceWith(entryToAdd);
    //   // expect(component.errorMsg).toBe('Error: BANG!');
    // });
  
    it('updateEntry$ should return entity ID', () => {
      const updateEntrySpy = spyOn(entriesService, 'updateEntry$').and.callThrough();
      const entryToEdit = mockIslaEntry;
      const expectedEntityId = '666';
  
      testScheduler.run(({ expectObservable }) => {
        const output = '(a|)';
        const expected = { a: expectedEntityId };                                                          
  
        expectObservable(entriesService.updateEntry$(entryToEdit)).toBe(output, expected);
      });
      
      expect(updateEntrySpy).toHaveBeenCalledOnceWith(entryToEdit);
      expect(component.errorMsg).toBe('');
    });

    // fit('updateEntry$ should handle error', () => {
    //   const updateEntrySpy = spyOn(entriesService, 'updateEntry$').and.returnValue(throwError('error'));
    //   const entryToAdd = mockIslaEntry;
    //   const expectedError = 'Error: BANG!';
  
    //   testScheduler.run(({ expectObservable }) => {
    //     const output = '#';
    //     const expected = { a: expectedError };                                                          
  
    //     expectObservable(entriesService.createEntry$(entryToAdd)).toBe(output, expected);
    //   });
      
    //   expect(updateEntrySpy).toHaveBeenCalledOnceWith(entryToAdd);
    //   // expect(component.errorMsg).toBe('Error: BANG!');
    // });

    it('getEntryById$ should return isla entry', () => {

      const getEntryByIdSpy = spyOn(entriesService, 'getEntryById$').and.returnValue(of(mockIslaEntry));
     
      const expectedEntityId = '666';
  
      testScheduler.run(({ expectObservable }) => {
        const output = '(a|)';
        const expected = { a: mockIslaEntry };       
  
        expectObservable(entriesService.getEntryById$(expectedEntityId)).toBe(output, expected);
      });
      
      expect(getEntryByIdSpy).toHaveBeenCalledOnceWith('666');
      expect(component.errorMsg).toBe('');
    });

    // fit('getEntryById$ should handle error', () => {
    //   const getEntryByIdSpy = spyOn(entriesService, 'getEntryById$').and.returnValue(throwError('error'));
     
    //   const expectedEntityId = '666';
  
    //   testScheduler.run(({ expectObservable }) => {
    //     const output = '#';
    //     const expected = { a: mockIslaEntry };       
  
    //     expectObservable(entriesService.getEntryById$(expectedEntityId)).toBe(output, expected);
    //   });
      
    //   expect(getEntryByIdSpy).toHaveBeenCalledOnceWith('666');
    //   expect(component.errorMsg).toBe('');
    // });
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
      
      spyOn(entriesService, 'getEntryById$').and.returnValue(of(mockIslaEntry));

      component.ngOnInit();

      expect(entriesService.getEntryById$).toHaveBeenCalledWith('666');
      expect(component.isNew).toBe(false);
      expect(component.islaEntryToEdit).toEqual(mockIslaEntry);
      expect(component.form.value.title).toEqual(mockIslaEntry.title);
      expect(component.form.value.description).toEqual(mockIslaEntry.description);
    });  
  });

  describe('hasRequiredError', () => {

    it('should return FALSE if field does not exist', () => {
      const fieldName = 'non-existent-field';
      expect(component.hasRequiredError(fieldName)).toBeFalse();
    });

    it('should return TRUE if a field has required error', () => {
      const fieldName = 'title';
      component.form.controls[fieldName].setErrors({ required: true });
      expect(component.hasRequiredError(fieldName)).toBeTrue();
    });

    it('should return FALSE if a field does NOT have required error', () => {
      const fieldName = 'title';
      component.form.controls[fieldName].setErrors({ required: false });
      expect(component.hasRequiredError(fieldName)).toBeFalse();
    });

    it('should return TRUE if a field has required error', () => {
      const fieldName = 'title';
      component.form.controls[fieldName].setErrors({ required: true });
      expect(component.hasRequiredError(fieldName)).toBeTrue();
    });

    it('should return FALSE if a field does NOT have required error', () => {
      const fieldName = 'title';
      component.form.controls[fieldName].setErrors({ required: false });
      expect(component.hasRequiredError(fieldName)).toBeFalse();
    });
  })

  describe('validation', () => {

    // tried  some unit tests by approaching it using querySelector and changing the values,  
    // emitting the input and fixture.detectChanges() but for some reason it always though the for was valid?
    // seemed to be an issue with waiting for fixture.whenStable().then().... 

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

  // Was going to try some marbles tests here to test the observables etc but wasnt sure if you'd want me to 
  // import packages or if you handled that kind of stuff with test scheduler /async etc.
});
