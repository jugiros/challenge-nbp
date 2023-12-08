import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dialog-message',
  templateUrl: './dialog-message.component.html',
  styleUrls: ['./dialog-message.component.css']
})
export class DialogMessageComponent {
  @Input() message: string | undefined;
  @Input() onConfirm: () => void = () => {};
  @Input() onCancel: () => void = () => {};
}
