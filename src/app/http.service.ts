import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
 
@Injectable({ providedIn: 'root' })
export class HttpService{
    constructor(private http: HttpClient){ }

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
    }

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

    addData(values: any): Observable<any> {
        console.log(values);
        // return values
        return this.http.post(this.baseUrl, values, this.httpOptions)
            .pipe(
                catchError(error => {
                    if (error.status === 401 || error.status === 403) {
                      // handle error
                    }
                    return throwError(() => error);
                  })
            )
        
        // return this.http.get(`${this.baseUrl}${id}`).pipe(
        //     tap(() => console.log('Fetch data ok')),
        //     catchError((err: any) => err)
        // )
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