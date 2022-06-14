import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

    //@Input() filterText: any;
    @Output() changeSearch = new EventEmitter<string>();
    outputText : string = '';

    response: any;

    constructor() {}

    onChangeSearch(value: any) {
        this.changeSearch.emit(value);
    }

    ngOnInit(): void {}
}
