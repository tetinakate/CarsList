import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService} from '../http.service';
import { ModalService } from '../modal';

@Component({
    selector: 'app-card-list',
    templateUrl: './card-list.component.html',
    styleUrls: ['./card-list.component.scss'],
    providers: [HttpService]
})
export class CardListComponent implements OnInit {
    @Input() response: any;
    @Input() carModels: any;

    isUpdate: boolean = false;
    searchText: string = '';
    url: string = 'http://localhost:3000/images/';

    carToEdit: any = {
        id: '',
        name: '',
        model: {
            id: '',
            name: ''
        },
        color: '',
        year: '',
        image: '',
    }
    carToDelete: any = {
        id: '',
        name: '',
        model: {
            id: '',
            name: ''
        },
        color: '',
        year: '',
        image: '',
    }


    constructor(
        private httpService: HttpService,
        private modalService: ModalService
    ) {}

    ngOnInit(): void {
    }

    handleDeleteClick(id: string): void {
        this.response = this.response.filter((res: any) => res.id != id)
        this.httpService.deleteData(id).subscribe();
    }
    openModal(id: string) {
        this.modalService.open(id);
    }

    openModalNew(id: string) {
        this.modalService.openNew(id);
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }

    onSubmitForm(id: string){
        this.modalService.close(id);
    }
    updateCar(car: any) {
        this.carToEdit = car;
    }

    deleteThisCar(car: any) {
        this.carToDelete = car;
    }
    
    onUpdateImage = ($event: Event) => {
        const target = $event.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];
        this.carToEdit.image = file;
    };

    onUpdateCar(updateForm: NgForm){
        
        let formData: any = new FormData();
        formData.append('id', this.carToEdit.id);
        formData.append('name', this.carToEdit.name);
        formData.append('modelId', this.carToEdit.model.id);
        formData.append('color', this.carToEdit.color);
        formData.append('year', this.carToEdit.year);
        formData.append('image', this.carToEdit.image);

        this.httpService.updateData(formData).subscribe({
        error: (e) => {
            console.log(e);
        },
        complete: () => {
            this.httpService.getData().subscribe((response: any) => {
                this.response = response;
            });
            updateForm.reset();
        },
    })
    }

}
