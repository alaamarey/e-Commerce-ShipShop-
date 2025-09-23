import { Component, inject, OnInit , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrandsService } from '../../../core/services/brands.service';
import { BrandsRes, Datum } from '../../../core/models/brands-res.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-popular-brands',
  imports: [],
  templateUrl: './popular-brands.component.html',
  styleUrl: './popular-brands.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PopularBrandsComponent implements OnInit {

  private readonly brandsService = inject(BrandsService);
  private readonly activatedRoute = inject(ActivatedRoute);

  brandsDataList: Datum[] = {} as Datum[];


  ngOnInit(): void {
    this.brandsDataList = this.activatedRoute.snapshot.data['brand'] ?? []; 


  }


  getAllBrands(): void {
  
    this.brandsService.getAllBrands().subscribe({
      next: (res => {
        console.log(res);
        this.brandsDataList = res.data;
      })
    })
  }
}
  




