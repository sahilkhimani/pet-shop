import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackbar : MatSnackBar) { }
  
  open( options : {
    message : string , 
    action? : string ,
    duration? : number,
    verticalPosition? : 'top' | 'bottom',
    horizontalPosition? : 'start' | 'center' | 'end' | 'left' | 'right',
    panelClass? : string | string[]
  }) : void {
    this.snackbar.open(
      options.message, options.action ?? 'Close', {
        duration : options.duration ?? 3000,
        verticalPosition : options.verticalPosition ?? 'top',
        horizontalPosition : options.horizontalPosition ?? 'right',
        panelClass : options.panelClass ?? ''
      }
    )
  }
}
