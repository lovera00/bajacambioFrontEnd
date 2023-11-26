import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GptServiceService {
  private apiUrl = 'https://bajadordecambiosbackend-production.up.railway.app/chatgpt'; // La URL de tu API

  constructor(private http: HttpClient) { }

  cambiarTexto(textoOriginal: string): Observable<any> {
    // Preparar el cuerpo de la solicitud si es necesario
    const body = { pregunta: textoOriginal };

    // Realizar la petición POST y retornar el observable
    return this.http.post(this.apiUrl, body);
  }
}
