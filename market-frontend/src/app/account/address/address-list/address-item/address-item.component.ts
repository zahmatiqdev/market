import { Component, OnInit, Input } from '@angular/core';
import { Address } from 'src/app/models/address.model';

@Component({
  selector: 'app-address-item',
  templateUrl: './address-item.component.html',
  styleUrls: ['./address-item.component.css']
})
export class AddressItemComponent implements OnInit {
  @Input() address: Address;
  @Input() index: number;

  ngOnInit() {
  }

}