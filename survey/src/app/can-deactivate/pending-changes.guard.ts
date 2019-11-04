import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable()
export class PendingChangesGuard
  implements CanDeactivate<ComponentCanDeactivate> {
  confirmDlg: MatDialogRef<ConfirmDialogComponent>;

  constructor(private dialog: MatDialog) {}

  canDeactivate(component: any) {
    const subject = new Subject<boolean>();

    if (!component.checked) {
      this.confirmDlg = this.dialog.open(ConfirmDialogComponent, {
        disableClose: true,
        height: '200px'
      });
      this.confirmDlg.componentInstance.subject = subject;

      this.confirmDlg.afterClosed().subscribe(response => {
        if (response) {
          component.saveQuestion();
        }
      });

      return subject.asObservable();
    }
    return true;
  }
}
