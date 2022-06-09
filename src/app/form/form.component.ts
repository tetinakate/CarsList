import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { HttpService } from '../http.service';

@Component({
    selector: 'form-editor',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})
export class FormComponent {
    @Input() car: any;
    @Input() carModels: any;
    @Output() submitted = new EventEmitter<any>();

    imgCar!: any;
    base64code!: any;


    addCar = new FormGroup({
        name: new FormControl(''),
        modelId: new FormControl(''),
        color: new FormControl(''),
        year: new FormControl(''),
        image: new FormControl(''),
    });

    constructor(private httpService: HttpService) {}

    onChange = ($event: Event) => {
        const target = $event.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];
        this.convertToBase64(file);
    }
    convertToBase64(file: File) {
        const observable = new Observable((subscriber: Subscriber<any>) => {
            this.readFile(file, subscriber)
        });

        observable.subscribe((d) => {
            this.imgCar = d;
            this.base64code = d;
        })
    }
    readFile(file: File, subscriber: Subscriber<any>) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            subscriber.next(fileReader.result);
            subscriber.complete();
        };
        fileReader.onerror = () => {
            subscriber.error();
            subscriber.complete();
        }
    }

    onSubmit() {
        let { name, modelId, color, year, image } = this.addCar.value
        let Model = Number(modelId);
        let Year = Number(year);
        
        this.httpService.addData(name, Model, color, Year, this.imgCar).subscribe((result) => {
            console.warn(this.addCar.value);
            this.addCar.reset();
        });
    }
}
