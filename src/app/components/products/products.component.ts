import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AddProductComponent } from '../add-product/add-product.component';
import {
  MatDialog
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { WarningDialogComponent } from '../warning-dialog/warning-dialog.component';



@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, MatButtonModule, MatIconModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  readonly dialog = inject(MatDialog);


  productsList: any;
  filteredProducts: any;

  stars = [1, 2, 3, 4, 5];

  constructor(private productService: ProductsService, private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.getProducts('');
  }

  async getProducts(searchKey: any) {
    // const products = await this.productService.getProducts();
    // console.log("productsList", products);
    // this.productsList = products;
    // this.filteredProducts = searchKey ? this.productsList.filter((product: any) => {
    //   const productTitle = product.title;
    //   return productTitle.toLowerCase().search(searchKey) !== -1;
    // }) : products;

    this.productService.getProducts().subscribe(res => {
      this.productsList = res;
      this.filteredProducts = searchKey ? this.productsList.filter((product: any) => {
          const productTitle = product.title;
          return productTitle.toLowerCase().search(searchKey) !== -1;
        }) : this.productsList;
    },
    (err) => {
      console.log(`error:${err}`);
    }
  )

  }

  filterProducts(event: any) {
    const searchKey = event.target.value;
    this.getProducts(searchKey);
  }

  addProduct() {
    console.log("hi");
    const dialogRef = this.dialog.open(AddProductComponent, {
      height: '320px',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      console.log("formData", res);
      const {title, price, image } = res?.data;
      const newProd = {
        title:title,
        price:price,
        image:image
      }
      this.productService.addProducts(newProd).subscribe(res => {
        console.log("res:",res);
        this.snackBar.open('Product added successfully!', 'Close', {
          duration: 3000, 
        });

        this.getProducts('');
      },
      (err) => {
        console.log(`error:${err}`);
      }
    );
      
    });
  }

  editProduct(product:any){
    console.log("editProd:", product);
    const dialogRef = this.dialog.open(AddProductComponent, {
      height: '320px',
      width: '500px',
      data:product
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      
      const {title, price, image } = res?.data;
      console.log("okkk",{title, price, image});
      const editProd = {
        id: product._id,
        title:title,
        price:price,
        image:image,
        rating:{rate:4}
      }

      this.productService.editProducts(editProd).subscribe(res => {
        console.log("res:",res);
        this.snackBar.open('Product edited successfully!', 'Close', {
          duration: 3000, 
        });

        this.getProducts('');
      },
      (err) => {
        console.log(`error:${err}`);
      }
    );

    });
  }

  deleteProduct(id:any){
    console.log("prodId:",id);
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      height: '140px',
      width: '360px',
    });
    dialogRef.afterClosed().subscribe((res: any) => {  
      if(res.delete){
        this.productService.deleteProducts(id).subscribe(res => {
          console.log("res:",res);
          this.snackBar.open('Product deleted successfully!', 'Close', {
            duration: 3000, 
          });
  
          this.getProducts('');
        },
        (err) => {
          console.log(`error:${err}`);
        }
      );
        
      }
    
    });
  }


}
