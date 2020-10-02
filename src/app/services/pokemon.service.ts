import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { PokeAPI } from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  pokeAPI: any;

  constructor(private http: HttpClient) {
      this.pokeAPI = environment.baseUrl;
    }

  //Obtiene pokemon
  getPokemon(): Observable<PokeAPI> {
    return this.http
      .get<PokeAPI>(`${this.pokeAPI}`)
      .pipe(catchError(this._handleError));
  }

  getPokemonDetails(id): Observable<PokemonDetails> {
    return this.http
      .get<PokemonDetails>(`${this.pokeAPI}/${id}`)
      .pipe(catchError(this._handleError));
  }

  getFilterPokemon(name): Observable<PokeAPI> {
    return this.http
      .get<PokeAPI>(`${this.pokeAPI}/?name=${name}`)
      .pipe(catchError(this._handleError));
  }

  private _handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
