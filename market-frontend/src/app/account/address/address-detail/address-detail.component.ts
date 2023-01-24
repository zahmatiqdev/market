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

  address: any;
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
          this.address = this.onGetAddressDetail(this.id)
        }
      );
  }

  onGetAddressDetail(id: number) {
    this.addressService.getRetrieveAddressRequest(id)
        .subscribe(data => {
          console.log(data);
          this.address = data;
    })
  }
  
  onEditAddress() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }


}

