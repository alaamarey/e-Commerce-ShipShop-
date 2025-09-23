import { BrandsService } from '../../core/services/brands.service';
import { Component ,inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import {NgxPaginationModule } from 'ngx-pagination'
import {  Datum } from '../../core/models/brands-res.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-brands',
  imports: [FormsModule ,SearchPipe ,NgxPaginationModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent  implements OnInit  {

  private readonly brandsService = inject(BrandsService);
  private readonly activatedRoute = inject(ActivatedRoute);

  brandsList: Datum[] = [];  
  searchInput !: string; 
  itemsPerPage!: number;
  currentPage!: number;
  totalItems!: number;

  ngOnInit(): void {



    this.activatedRoute.data.subscribe(data => {
      this.brandsList = data['brand'] ?? []
    } )
  }




  getAllBrands(pageNumber : number = 1 ): void { 
    this.brandsService.getAllBrands(pageNumber).subscribe({
      next: (res => {
        console.log(res);
        this.brandsList = res.data;
        this.itemsPerPage = res.metadata.limit;
        this.currentPage = res.metadata.currentPage;
        this.totalItems = res.results;

      })
    })
  }

}
