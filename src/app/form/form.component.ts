import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Car } from '../interfaces';
import { HttpService } from '../http.service';

@Component({
  selector: 'form-editor',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @Input() car: any;
  @Input() carModels: any;
  @Output() submitted = new EventEmitter<any>();

  addCar = new FormGroup({
    name: new FormControl(''),
    model: new FormControl(''),
    color: new FormControl(''),
    year: new FormControl(''),
    image: new FormControl(''),
  });

  constructor(private httpService: HttpService) {}

  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.httpService.addData(this.addCar.value).subscribe((result) =>{
      console.warn(this.addCar.value);
      this.addCar.reset();
    })
    // this.submitted.emit(this.addCar.value);
  }
}