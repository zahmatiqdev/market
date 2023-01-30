import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-address-create',
  templateUrl: './address-create.component.html',
  styleUrls: ['./address-create.component.css']
})
export class AddressCreateComponent implements OnInit {

  constructor(private addressService: AddressService) {}

  ngOnInit() {}

  onCreateAddress(postData: {id: number, name: string}){
    this.addressService.postCreateAddressRequest(postData)
        .subscribe(data => {
          console.log(data);
          this.addressService.addAddress(data);
    });
  }

  onCancel() {}
}
