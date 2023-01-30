import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Address } from 'src/app/models/address.model';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-address-detail',
  templateUrl: './address-detail.component.html',
  styleUrls: ['./address-detail.component.css']
})
export class AddressDetailComponent implements OnInit {

  address_object: Address;
  address: Address;
  id: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private addressService: AddressService) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.onGetAddressDetail(this.id)
        }
      );
  }

  onGetAddressDetail(id: number) {
    return this.addressService.getRetrieveAddressRequest(id)
        .subscribe(data => {
          console.log(data);
          this.address = new Address(data.id, data.name)

    })
  }
  
  onEditAddress() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteAddress(){
    this.addressService.deleteAddress(this.id, this.address_object);
    this.router.navigate(['/address']);
  }

}

