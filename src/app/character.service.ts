import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Método para obtener los personajes
  getCharacters(): Observable<any> {
    return this.http.get(`${this.apiUrl}/characters`);
  }

  // Método para agregar un nuevo personaje
  addCharacter(character: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/characters`, character);
  }

  // Método para eliminar un personaje
  deleteCharacter(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/characters/${id}`);
  }
}
