import {MatSnackBar} from '@angular/material/snack-bar';

export class SnackBar {

    constructor() {
    }

    openSnackBar(_snackBar: MatSnackBar, message: string, action: string, duration: number, type: string): void {
        // type
        // success : green-500
        // validation : orange-400
        // error: warn

        _snackBar.open(message, action, {
            duration: duration,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: [type, 'snackbar-config'],
        });
    }
}
