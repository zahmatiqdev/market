import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { AddressService } from 'src/app/services/address.service';


@Component({
  selector: 'app-address-edit',
  templateUrl: './address-edit.component.html',
  styleUrls: ['./address-edit.component.css']
})
export class AddressEditComponent implements OnInit {

  id: number;
  editMode = true;
  addressForm: FormGroup;

  constructor(private addressService: AddressService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.addressService.updateAddress(this.id, this.addressForm.value);
    } else {
      this.addressService.addAddress(this.addressForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let addressName: string = '';

    if (this.editMode) {
      const address = this.addressService.getAddress(this.id);
      addressName = address.name || '';      
    }

    this.addressForm = new FormGroup({
      name: new FormControl(addressName, Validators.required)
    });
  }
}