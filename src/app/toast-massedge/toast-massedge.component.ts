import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'toast-basic-demo',
    templateUrl: './toast-massedge.component.html',
    standalone: true,
    imports: [ToastModule, ButtonModule, RippleModule],
    providers: [MessageService]
})
export class ToastBasicDemo {
    constructor(private messageService: MessageService) {}

    show() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The Person has been Deleted' });
    }
}