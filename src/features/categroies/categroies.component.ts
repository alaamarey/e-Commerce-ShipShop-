import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Datum } from '../../core/models/categroy-res.interface';

@Component({
  selector: 'app-categroies',
  imports: [],
  templateUrl: './categroies.component.html',
  styleUrl: './categroies.component.css'
})
export class CategroiesComponent  implements OnInit {


  private readonly activatedRoute = inject(ActivatedRoute); 
  categroiesList: Datum[] = []; 



  ngOnInit(): void {


    this.activatedRoute.data.subscribe(data => {
      this.categroiesList = data['categroy'] ?? []
    })
  }




}
