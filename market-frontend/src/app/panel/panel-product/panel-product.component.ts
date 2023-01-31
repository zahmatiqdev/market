import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-panel-product',
  templateUrl: './panel-product.component.html',
  styleUrls: ['./panel-product.component.css']
})
export class PanelProductComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService){}

  ngOnInit() {
    this.dataStorageService.fetchProducts();
  }
}