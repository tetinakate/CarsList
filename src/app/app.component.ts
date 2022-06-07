import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
})
export class AppComponent {
    title = 'cars-project';
    response: any;

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.http
            .get('http://localhost:3000/cars/')
            .subscribe((response) => {
                this.response = response;
            });
    }
}
