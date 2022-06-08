import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { CardListComponent } from './card-list/card-list.component';
import { CardItemComponent } from './card-list/card-item/card-item.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';
import { ModalModule } from './modal';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        SearchComponent,
        CardListComponent,
        CardItemComponent,
        FilterPipe,
    ],
    imports: [BrowserModule, HttpClientModule, FormsModule, ModalModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
