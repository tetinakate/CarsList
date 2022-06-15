import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
    submitted: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private httpService: HttpService,
        private modalService: ModalService
    ) {}

    ngOnInit() {
        this.formAddCar = this.formBuilder.group({
            name: ['', Validators.required],
            modelId: ['', Validators.required],
            color: ['', Validators.required],
            year: ['', [Validators.required, Validators.maxLength(4), Validators.minLength(4)]],
            image: [null, Validators.required],
        });
    }
    get f() {
        return this.formAddCar.controls;
    }

    onChange = ($event: Event) => {
        const target = $event.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];
        this.imgCar = file;
    };

    closeModalAdd(id: string) {
        this.modalService.close(id);
    }

    onSubmit() {
        this.submitted = true;
        if (this.formAddCar.invalid) {
            return;
        }

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
        
        this.submitForm.emit();
    }
}
