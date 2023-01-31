import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-panel-product-item',
  templateUrl: './panel-product-item.component.html',
  styleUrls: ['./panel-product-item.component.css']
})
export class PanelProductItemComponent implements OnInit {
  @Input() product: Product;
  
  ngOnInit() {}

}