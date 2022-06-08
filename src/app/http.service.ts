import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
 
@Injectable({ providedIn: 'root' })
export class HttpService{
    constructor(private http: HttpClient){ }

    private baseUrl = 'http://localhost:3000/cars/'
     
    getData(): Observable<any> {
        return this.http.get(this.baseUrl).pipe(
            tap(() => console.log('Fetch data ok')),
            catchError((err: any) => err)
        )
    }

    deleteData(id: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}${id}`, {responseType: 'text'}).pipe(
            tap(() => console.log('Delete data ok')),
            catchError((err: any) => err)
        )
    }
}