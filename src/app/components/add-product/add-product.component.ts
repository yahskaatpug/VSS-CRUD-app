import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  productForm!: FormGroup;
  add_edit:any = 'Add';


  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: string,
    private dialogRef: MatDialogRef<AddProductComponent>) { }

  ngOnInit() {
    console.log("akshay",this.data);
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required]
    });

    if(this.data){
      this.add_edit='Edit';
      this.setFormData();
    }
  }

  setFormData(){
    const {title, price, image}:any = this.data;
    this.productForm.setValue({
      title:title,
      price:price,
      image:image
    });
  }

  submit() {
    if (this.productForm.valid) {
      const formData = this.productForm.value;
      console.log(formData);
      // Send data to backend or perform other actions
      this.dialogRef.close({ data: formData})
    }
  }

  close(){
    this.dialogRef.close({});
  }

}
