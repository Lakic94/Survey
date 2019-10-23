import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  message = 'Do you want to save changes?';

  public subject: Subject<boolean>;

  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>) {}

  ngOnInit() {}

  onYesResponse() {
    if (this.subject) {
      this.subject.next(true);
      this.subject.complete();
    }
    this.dialogRef.close(true);
  }

  onNoResponse() {
    if (this.subject) {
      this.subject.next(true);
      this.subject.complete();
    }
    this.dialogRef.close(false);
  }
}
