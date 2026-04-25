import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { TablaPredios } from '../tabla-predios/tabla-predios';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-view-predio',
  imports: [RouterLink,CommonModule,TablaPredios],
  templateUrl: './view-predio.html',
  styleUrl: './view-predio.css',
})
export class ViewPredio {

}
