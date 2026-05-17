import { Injectable } from '@angular/core';
import { toast, ExternalToast } from 'ngx-sonner';

const defaults: ExternalToast = {
  duration: 4500,
  closeButton: true,
};

/**
 * DevCollab toast API — wraps ngx-sonner for consistent messaging.
 * Dialogs: use Angular CDK Dialog when confirmation UI is needed.
 */
@Injectable({ providedIn: 'root' })
export class NotificationService {
  welcome(userName: string): void {
    toast.success(`Welcome back, ${userName}`, {
      ...defaults,
      duration: 5500,
      description: 'You are signed in to DevCollab Assets.',
    });
  }

  signedOut(): void {
    toast.info('Signed out', {
      ...defaults,
      duration: 3500,
      description: 'Your session has ended. See you next time.',
    });
  }

  success(message: string, options?: ExternalToast): void {
    toast.success(message, { ...defaults, ...options });
  }

  error(message: string, options?: ExternalToast): void {
    toast.error(message, { ...defaults, duration: 6000, ...options });
  }

  info(message: string, options?: ExternalToast): void {
    toast.info(message, { ...defaults, ...options });
  }

  warning(message: string, options?: ExternalToast): void {
    toast.warning(message, { ...defaults, ...options });
  }

  loading(message: string, options?: ExternalToast): string | number {
    return toast.loading(message, { ...options });
  }

  dismiss(id?: string | number): void {
    toast.dismiss(id);
  }
}
