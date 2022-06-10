import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
 
export interface Car {
    name: string,
    modelId: number,
    color: string,
    year: number,
    image: string
}

@Injectable({ providedIn: 'root' })
export class HttpService{
    constructor(private http: HttpClient){ }

    private baseUrl = 'http://localhost:3000/cars'
    private modelsUrl = 'http://localhost:3000/models'
     
    getData(): Observable<any> {
        return this.http.get(this.baseUrl).pipe(
            tap(() => console.log('Fetch getData ok')),
            catchError((err: any) => err)
        )
    }
    getDataById(id: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id}`).pipe(
            tap(() => console.log('Fetch getDataById ok')),
            catchError((err: any) => err)
        )
    }

    getCarsModels(): Observable<any> {
        return this.http.get(`${this.modelsUrl}`).pipe(
            tap(() => console.log('Fetch models ok')),
            catchError((err: any) => err)
        )
    }

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'multipart/form-data'
        })
    }

    addData(data: any): Observable<any> {
        return this.http.post(this.baseUrl, data)
            .pipe(
                catchError(error => throwError(() => error))
            )
    }

    updateData(id: string, values: any): Observable<any> {
        console.log(values);
        return values
    }

    deleteData(id: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`, {responseType: 'text'}).pipe(
            tap(() => console.log('Delete data ok')),
            catchError((err: any) => err)
        )
    }
}