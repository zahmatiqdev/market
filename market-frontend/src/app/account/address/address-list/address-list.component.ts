import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Address } from 'src/app/models/address.model';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {

  addresses: Address[];
  subscription: Subscription;

  constructor(private addressService: AddressService,
              private router: Router,
              private route: ActivatedRoute){}

  ngOnInit() {
    this.subscription = this.addressService.addressesChanged
      .subscribe(
        (addresses: Address[]) => {
          this.addresses = addresses;
        }
      );
    this.addresses = this.addressService.getAddresses();
  }

  onCreateAddress() {
    this.router.navigate(['create'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
