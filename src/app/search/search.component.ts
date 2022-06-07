import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
    @Output() filterText = new EventEmitter<string>();

    response: any;

    constructor(private http: HttpClient) {}

    addNewItem(value: string) {
        this.filterText.emit(value);
    }

    ngOnInit(): void {}
}
