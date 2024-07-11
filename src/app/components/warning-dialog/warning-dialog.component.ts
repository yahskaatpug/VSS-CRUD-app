import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-warning-dialog',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './warning-dialog.component.html',
  styleUrl: './warning-dialog.component.css'
})
export class WarningDialogComponent {
  constructor(private dialogRef: MatDialogRef<WarningDialogComponent>){}
  close(){
    this.dialogRef.close();
  }

  delete(){
    this.dialogRef.close({delete:true});
  }
}
