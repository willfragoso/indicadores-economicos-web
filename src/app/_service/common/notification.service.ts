import {Injectable, NgZone} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root'
})
export class NotificationService {

	constructor(private matSnackBar: MatSnackBar,
				private ngZone: NgZone) {
	}

	showSuccess(message: string, action?: string): void {
		this.ngZone.run(
			() => {
				this.matSnackBar.open(message);
				this.matSnackBar.open(
					message,
					action,
					{
						duration: 5000,
						horizontalPosition: 'end',
						verticalPosition: 'bottom',
						panelClass: ['app-sucess-message']
					}
				);
			}
		);
	}

	showError(message: string, action?: string): void {
		this.ngZone.run(
			() => {
				this.matSnackBar.open(
					message,
					action,
					{
						duration: 10000,
						horizontalPosition: 'end',
						verticalPosition: 'bottom',
						panelClass: ['app-error-message']
					}
				);
			}
		);
	}

}
