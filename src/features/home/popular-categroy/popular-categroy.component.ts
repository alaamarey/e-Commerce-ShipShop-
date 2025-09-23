import { ActivatedRoute } from '@angular/router';
import { Datum } from '../../../core/models/categroy-res.interface';
import { CategroyService } from '../../../core/services/categroy.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-popular-categroy',
  imports: [],
  templateUrl: './popular-categroy.component.html',
  styleUrl: './popular-categroy.component.css'
})
export class PopularCategroyComponent  implements  OnInit {

  private readonly categroyService = inject(CategroyService); 
  private readonly activatedRoute = inject(ActivatedRoute); 

  categroiesDataList: Datum[] = {} as Datum[]; 

  ngOnInit(): void {
 this.categroiesDataList = this.activatedRoute.snapshot.data['categroy'] ??  []

  }


  getAllCategroies() : void {
    this.categroyService.getAllCategroies().subscribe({
      next: (res => {
        console.log(res);
        this.categroiesDataList = res.data;
        
      }),
      error: (error => {
      console.log( error );
    })  
  })
  }








}
