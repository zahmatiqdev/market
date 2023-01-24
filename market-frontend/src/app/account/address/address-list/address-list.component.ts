import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {

  addresses: any;

  constructor(private addressService: AddressService,
              private router: Router,
              private route: ActivatedRoute){}

  ngOnInit(): void {
    this.addresses = this.onListAddress();
  }

  onListAddress() {
    this.addressService.getListAddressRequest()
        .subscribe(data => {
          console.log(data);
          this.addresses = data;
    })
  }

  onCreateAddress() {
    this.router.navigate(['create'], {relativeTo: this.route});
  }
}