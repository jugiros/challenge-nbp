import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DialogService } from "../../services/dialog.service";
import { Subscription } from 'rxjs';
import { Router } from "@angular/router";

@Component({
  selector: 'app-dialog-message',
  templateUrl: './dialog-message.component.html',
  styleUrls: ['./dialog-message.component.css']
})
export class DialogMessageComponent implements OnInit, OnDestroy {
  @Input() onConfirm: () => void = () => {};
  @Input() onCancel: () => void = () => {};

  private dialogSubscription: Subscription | undefined;
  showDialog = false;
  message: string | undefined;

  constructor(private dialogService: DialogService, private router: Router) {}

  ngOnInit(): void {
    this.dialogSubscription = this.dialogService.showDialog$.subscribe((message: string | undefined) => {
      this.message = message;
      this.showDialog = !!message;
    });
  }

  ngOnDestroy(): void {
    this.dialogSubscription?.unsubscribe();
  }

  closeDialog() {
    this.dialogService.closeDialog();
    this.showDialog = false;
  }

  confirmAction() {
    if (this.onConfirm) {
      this.onConfirm();
    }
    this.closeDialog();
  }
}
