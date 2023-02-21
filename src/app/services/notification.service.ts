import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Injectable({ providedIn: 'root' })
export class NotificationService {
    private notificationSubject: Subject<NotificationMessage> = new Subject<NotificationMessage>();

    constructor(
        private toastrService: ToastrService
    ) { }

    sendMessage(message: NotificationMessage) {
        this.notificationSubject.next(message);
    }

    success(message: string) {
        this.toastrService.success(message);
    }

    error(message: string) {
        this.toastrService.error(message);
    }
    warning(message: string) {
        this.toastrService.warning(message);
    }
    info(message:string) {
        this.toastrService.info(message);
    }
}

export interface NotificationMessage {
  message: string;
  type: NotificationType;
}
export enum NotificationType {
  success = 1,
  warning = 2,
  error = 3,
  info = 4
}
