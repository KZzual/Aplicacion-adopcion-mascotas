import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface Mascota {
  id?: number;
  nombre: string;
  especie: string;
  raza?: string;
  edad_meses?: number;
  genero?: string;
  ubicacion?: string;
  url_imagen?: string;
  vacunado?: boolean;
  esterilizado?: boolean;
  entrenado?: boolean;
  chip?: string;
}

@Injectable({ providedIn: 'root' })
export class MascotasApiService {
  readonly api = environment.apiBaseUrl + '/api/mascotas';

  constructor(private readonly http: HttpClient) {}

  getMascotas(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(this.api);
  }

  crearMascota(mascota: Mascota): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(this.api, mascota);
  }
}
