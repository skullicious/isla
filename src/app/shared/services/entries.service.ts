import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, delay, EMPTY, map, Observable, of, tap, throwError } from 'rxjs';
import { IslaEntry } from '../types/IslaEntry';

@Injectable({
  providedIn: 'root',
})
export class EntriesService {
  private entries$ = new BehaviorSubject<IslaEntry[]>([
    {
      id: '623b31ef3d91e998a3a97b98',
      title: 'sunt nostrud dolor nulla',
      description:
        'Velit sunt sunt ut eu tempor. Commodo aliqua magna esse culpa. Commodo do ex reprehenderit qui. Excepteur qui labore amet cillum occaecat id adipisicing eiusmod. Tempor aliquip et aute ex irure et adipisicing enim aliquip proident adipisicing velit ea laborum. Irure nisi esse enim proident aliqua cupidatat dolor ex do labore sunt. Ex eiusmod consequat officia reprehenderit.\r\nAute nisi quis velit commodo cillum. Officia quis cillum ea anim. Tempor aute esse minim ad commodo aliquip dolor minim Lorem cillum. Mollit esse labore nulla in ut ut ut.\r\n',
      createdAt: new Date('2016-02-05T04:26:46'),
    },
    {
      id: '623b31ef189d8e48d9619d88',
      title: 'ad proident occaecat culpa',
      description:
        'Id aute reprehenderit minim Lorem nulla aliquip. Nulla mollit quis commodo eu fugiat deserunt officia tempor culpa eu esse mollit. Deserunt est sint cupidatat proident.\r\nLaboris aliquip sunt reprehenderit occaecat. Quis sit do elit anim ut culpa. Qui ipsum non duis laboris voluptate ad aliquip tempor deserunt ex. Sit eu excepteur nulla aliquip ex ea ipsum reprehenderit enim. Velit non in ex consequat cupidatat. Consequat incididunt id consectetur quis pariatur cillum sunt do adipisicing.\r\n',
      createdAt: new Date('2018-01-05T04:55:30'),
    },
    {
      id: '623b31ef06c1751226010e10',
      title: 'esse consequat cupidatat anim',
      description:
        'Ut consectetur in ipsum dolore ea. Eu est pariatur sit reprehenderit sit aliquip occaecat reprehenderit in ullamco. Exercitation nulla do ad aliqua laborum mollit consequat ipsum. Esse est nostrud ad laboris fugiat exercitation non et aliqua ex. Ad fugiat consectetur veniam ad duis dolore.\r\nEa amet ex quis commodo occaecat. Nisi ipsum elit exercitation sit non irure reprehenderit ex. Fugiat Lorem enim ullamco consectetur exercitation ullamco. Cillum voluptate veniam enim aliquip consequat eu dolore do occaecat aliquip cillum cupidatat amet. Laborum incididunt officia consequat aute esse ut magna. Voluptate nisi elit minim esse cupidatat ut pariatur eiusmod non in.\r\n',
      createdAt: new Date('2018-02-09T04:24:10'),
    },
    {
      id: '623b31efd857c708129cde89',
      title: 'incididunt sunt incididunt ea',
      description:
        'Ad ea occaecat dolore magna sint dolor ad minim id incididunt. Tempor ut consectetur sit anim non velit quis nisi ullamco consectetur quis tempor deserunt veniam. Id nostrud aute excepteur ut. Officia duis excepteur excepteur incididunt adipisicing velit ut sit sit amet. Id ut pariatur veniam sunt eu id ipsum culpa officia deserunt aute incididunt laboris occaecat.\r\nIpsum id labore commodo duis incididunt laborum non esse adipisicing est incididunt. Cillum adipisicing laboris officia ullamco elit commodo sunt cillum non consectetur dolor qui. Pariatur consequat mollit proident ea sit commodo Lorem sit veniam consequat.\r\n',
      createdAt: new Date('2021-06-30T07:05:28'),
    },
    {
      id: '623b31ef11ded9a98ee24b87',
      title: 'incididunt magna aliquip esse',
      description:
        'Deserunt ex elit labore reprehenderit labore labore ullamco proident aute deserunt culpa do consequat minim. Elit aute laboris elit Lorem labore elit voluptate veniam velit elit nulla. Ad culpa labore ullamco nisi velit cupidatat pariatur. Ullamco aliqua adipisicing adipisicing enim laborum. Occaecat ut pariatur voluptate velit.\r\nLorem anim dolor velit aliqua aliqua. Consectetur incididunt nulla qui amet officia anim eiusmod laboris nisi et. Quis mollit dolor do sunt officia aute adipisicing adipisicing. Exercitation ullamco cillum qui in Lorem adipisicing ipsum. Anim aute excepteur est laborum et cillum. Pariatur cupidatat culpa duis amet fugiat. Non voluptate aliquip velit laboris fugiat ullamco sint anim.\r\n',
      createdAt: new Date('2017-02-07T12:34:52'),
    },
    {
      id: '623b31ef75bee89d396f9a46',
      title: 'consectetur reprehenderit non reprehenderit',
      description:
        'In eiusmod velit tempor pariatur cillum aute quis ipsum nulla labore nulla cillum nostrud cillum. Fugiat anim fugiat irure et incididunt. In enim eiusmod minim sunt esse quis magna velit exercitation culpa pariatur in id. Occaecat laboris dolore voluptate tempor et non minim enim et nulla officia.\r\nExercitation proident sint velit ut ea ex sit laborum reprehenderit ad. Sit et elit nisi tempor. Consectetur culpa laboris velit ut reprehenderit ad cupidatat excepteur aliquip irure. Dolor mollit ad reprehenderit incididunt ex elit et consequat fugiat duis aliqua. Id laborum ut veniam esse adipisicing adipisicing ea ex ea tempor.\r\n',
      createdAt: new Date('2018-10-16T04:09:54'),
    },
    {
      id: '623b31efd58ec6afc2469cbc',
      title: 'Lorem occaecat minim aliquip',
      description:
        'Ea exercitation consequat pariatur reprehenderit excepteur nisi in esse magna labore labore est. Sint id culpa et eiusmod fugiat velit. Eiusmod fugiat sint pariatur velit consequat sunt duis irure incididunt excepteur tempor id aute aute. Non sint veniam veniam qui enim aute elit amet ex ullamco aliquip nisi aute. Consectetur amet anim qui officia enim eu ad laborum culpa aute consectetur. Nulla ipsum do sunt commodo mollit fugiat sunt velit minim nisi nulla velit.\r\nConsequat reprehenderit nostrud laboris occaecat sint laborum quis amet. Fugiat adipisicing ea officia veniam eiusmod. Tempor ex consequat anim ut adipisicing Lorem. Labore occaecat aliquip non ad ut dolor laborum aliqua tempor Lorem labore. Cillum esse reprehenderit qui elit exercitation anim incididunt quis tempor. Voluptate deserunt nisi sunt deserunt.\r\n',
      createdAt: new Date('2015-03-13T11:13:14'),
    },
  ]);

  constructor() {}

  

  createEntry$(entry: IslaEntry) {
    const newEntry = { ...entry, id: this.generateId(), createdAt: new Date() };
    this.entries$.next([...this.entries$.value, newEntry]);
    return of(newEntry.id).pipe(
      delay(2000),
      tap(() => {
        throw new Error('Error in service')
      }
      ));
  }

  updateEntry$(entry: IslaEntry) {
    const newEntry = { ...entry, id: entry.id, updatedAt: new Date() };

    const newEntries = [...this.entries$.value];
    const entryIndex = newEntries.findIndex(item => item.id === newEntry.id);

    newEntries[entryIndex] = newEntry;
    
    this.entries$.next([...newEntries]);
    return of(newEntry.id).pipe(delay(5000));
  }


  getEntryById$(entryId: string): Observable<IslaEntry> {
    return this.getEntries$().pipe(
      map((entries) => entries.find((entry) => entry.id === entryId)),
      map((entry) => {
        if (!entry) {          
          throw new Error('no entry found');
        }
        return entry;
      }),
      catchError(err => {
        this.handleError(err);
        return EMPTY;
      })
    );
  }

  getEntries$(): Observable<IslaEntry[]> {
    return this.entries$.asObservable();
  }

  private handleError(err: string): Observable<never> {  
    
    let errorMessage: string;
   
    console.error(err, 'handling error?');
    return throwError(() => err);
  }

  private generateId() {
    const S4 = () =>
      (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);

    return (
      S4() +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      S4() +
      S4()
    );
  }
}
