import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { ICountriesResponse } from "../interfaces/countries-response/countries-response.interface";
import { countriesList } from "../types/countries-list";

@Injectable({
    providedIn: 'root',
})

export class CoutriesService {
    
    constructor(private readonly _httpClient: HttpClient){}

    getCoutries(): Observable<countriesList> {
        return this._httpClient.get<ICountriesResponse>('https://countriesnow.space/api/v0.1/countries/positions').pipe(
            map((countriesResponse) => { return countriesResponse.data})
        );
    }
}