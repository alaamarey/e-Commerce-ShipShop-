import { routes } from './../../app/app.routes';
import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { CardComponent } from "../../shared/components/card/card.component";
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination'
import { Datum } from '../../core/models/product-res.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [CardComponent, SearchPipe, FormsModule, NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',

})
export class ProductsComponent implements OnInit {


  private readonly productService = inject(ProductService);
  private readonly activatedRoute = inject(ActivatedRoute);


  productList: Datum[] = [];
  searchInput !: string;
  itemsPerPage !: number;
  currentPage !: number;
  totalItems !: number;

  ngOnInit(): void {

    this.activatedRoute.data.subscribe(data => {
      this.productList = data['product'] ?? []
    })
  }



  getAllProducts(pageNumber: number = 1): void {
    this.productService.getAllProducts(pageNumber).subscribe({
      next: (res => {
        console.log(res);
        this.productList = res.data;

        this.itemsPerPage = res.metadata.limit;
        this.currentPage = res.metadata.currentPage;
        this.totalItems = res.results;

      })
    })

  }
}
