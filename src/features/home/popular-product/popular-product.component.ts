import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from "../../../shared/components/card/card.component";
import { ProductService } from '../../../core/services/product.service';
import { Datum, ProductRes } from '../../../core/models/product-res.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-popular-product',
  imports: [CardComponent],
  templateUrl: './popular-product.component.html',
  styleUrl: './popular-product.component.css'
})
export class PopularProductComponent implements OnInit {

   private readonly productService = inject(ProductService); 
   private readonly activatedRoute = inject(ActivatedRoute); 

  productList: Datum[] ={} as Datum[];

  ngOnInit(): void {
    // this.getAllProducts();
this.productList = this.activatedRoute.snapshot.data['product'] ?? [] 
  }



  getAllProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (res => {
        console.log(res.data);
        this.productList = res.data ; 

      })
    })
  }





}
