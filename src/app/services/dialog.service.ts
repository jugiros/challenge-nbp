import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private showDialogSubject: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);

  public readonly showDialog$: Observable<string | undefined> = this.showDialogSubject.asObservable();

  constructor() {}

  public showDialog(message: string): Observable<void> {
    this.showDialogSubject.next(message);

    return new Observable<void>((observer) => {
      const subscription = this.showDialog$.subscribe((msg) => {
        if (!msg) {
          observer.next();
          observer.complete();
        }
      });

      return () => subscription.unsubscribe();
    });
  }

  public closeDialog() {
    this.showDialogSubject.next(undefined);
  }
}
