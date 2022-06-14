import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpService } from '../http.service';
import { ModalService } from '../modal';

@Component({
    selector: 'form-editor',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})
export class FormComponent {
    @Input() carModels: any;
    @Input() response: any;

    @Output() submitForm = new EventEmitter<any>();

    imgCar!: any;
    formAddCar: any = FormGroup;
    selectedModel: any;

    constructor(
        private formBuilder: FormBuilder,
        private httpService: HttpService,
        private modalService: ModalService
    ) {}

    ngOnInit() {
        this.formAddCar = this.formBuilder.group({
            name: [''],
            modelId: [''],
            color: [''],
            year: [''],
            image: [null],
        });
    }

    onChange = ($event: Event) => {
        const target = $event.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];
        this.imgCar = file;
    };

    closeModalAdd(id: string) {
        this.modalService.close(id);
    }

    onSubmitForm() {
        this.submitForm.emit();
    }

    onSubmit() {
        let formData: any = new FormData();
        formData.append('name', this.formAddCar.get('name')?.value);
        formData.append('modelId', this.formAddCar.get('modelId')?.value);
        formData.append('color', this.formAddCar.get('color')?.value);
        formData.append('year', this.formAddCar.get('year')?.value);
        formData.append('image', this.imgCar);

        this.httpService.addData(formData).subscribe((result): void => {
            this.response.push(result);
            this.formAddCar.reset();
        })
    }
}
