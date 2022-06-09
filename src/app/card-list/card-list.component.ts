import { Component, OnInit, Input } from '@angular/core';
import { HttpService} from '../http.service';
import { ModalService } from '../modal';
import { Car } from '../interfaces';
import { FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-card-list',
    templateUrl: './card-list.component.html',
    styleUrls: ['./card-list.component.scss'],
    providers: [HttpService]
})
export class CardListComponent implements OnInit {
    car: Car = {
        name: '',
        model: '',
        color: '',
        year: '',
        image: '',
    }

    @Input() response: any;
    @Input() carModels: any;
    searchText: string = '';

    constructor(
        private httpService: HttpService,
        private modalService: ModalService
    ) {}

    ngOnInit(): void {
    }

    handleDeleteClick(id: string){
        this.response = this.response.filter((res: any) => res.id != id)
        this.httpService.deleteData(id).subscribe()

        // this.httpService.getData().subscribe((res: any) => this.response = res)  
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

}
