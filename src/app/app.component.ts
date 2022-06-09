import { Component } from '@angular/core';
import { HttpService} from './http.service';

/* TODO: implement me */
type Model = {
    id: number;
    name: string;
};

export interface ICars {
    color: string;
    id: number;
    image: string;
    model: Model;
    name: string;
    year: number;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [HttpService]
})
export class AppComponent {
    title = 'cars-project';
    response: any;
    carModels: any;

    constructor(private httpService: HttpService) {}

    ngOnInit(): void {
        this.httpService.getData().subscribe((response: any) => {
            this.response = response;
        });
        this.httpService.getCarsModels().subscribe((carModels: any) => {
            this.carModels = carModels;
            console.log(carModels)
        });
    }
}
