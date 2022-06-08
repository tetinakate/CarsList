import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Car } from '../interfaces';

@Component({
  selector: 'form-editor',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @Input() car: any;
  @Output() submitted = new EventEmitter<any>();

  profileForm = new FormGroup({
    name: new FormControl(''),
    model: new FormControl(''),
    color: new FormControl(''),
    year: new FormControl(''),
    image: new FormControl(''),
  });
  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.submitted.emit(this.profileForm.value);
    console.warn(this.profileForm.value);
    this.profileForm.reset();
  }
}