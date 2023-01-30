import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Address } from '../models/address.model';
import { DataStorageService } from '../shared/data-storage.service';
import { AddressService } from './address.service';

@Injectable({ providedIn: 'root' })
export class AddressResolverService implements Resolve<Address[]> {

  constructor(private dataStorageService: DataStorageService,
              private addressService: AddressService) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const addresses = this.addressService.getAddresses();

    if (addresses.length === 0) {
      return this.dataStorageService.fetchAddresses();
    } else {
      return addresses;
    }
  }

}
