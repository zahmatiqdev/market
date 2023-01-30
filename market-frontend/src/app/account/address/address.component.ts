import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  constructor(private dataStorageService: DataStorageService){
  }

  ngOnInit() {
    this.dataStorageService.fetchAddresses();
  }
}
