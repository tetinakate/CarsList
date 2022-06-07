import { Component, Input } from '@angular/core';
import { HttpService} from '../../http.service';

@Component({
    selector: 'app-card-item',
    templateUrl: './card-item.component.html',
    styleUrls: ['./card-item.component.scss'],
    providers: [HttpService]
})
export class CardItemComponent {
    @Input() car: any;

    constructor(private httpService: HttpService) {}

    handleDeleteClick(id: string){
        this.httpService.deleteData(id).subscribe()

        // this.httpService.getData().subscribe((res: any) => this.response = res)  
    }
}
