import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private showDialogSubject: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);

  public readonly showDialog$: Observable<string | undefined> = this.showDialogSubject.asObservable();

  constructor() {}

  public showDialog(message: string) {
    this.showDialogSubject.next(message);
  }

  public closeDialog() {
    this.showDialogSubject.next(undefined);
  }
}
