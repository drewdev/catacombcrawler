import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private apiUrl = 'https://catacombcrawler-nestjs-production.up.railway.app';

  constructor(private http: HttpClient) {}

  getCharacters(): Observable<any> {
    return this.http.get(`${this.apiUrl}/characters`);
  }

  addCharacter(character: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/characters`, character);
  }

  deleteCharacter(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/characters/${id}`);
  }
}
