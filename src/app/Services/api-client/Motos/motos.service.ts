import { Injectable } from '@angular/core';
import { IMotoService } from './Imotos.service';
import { Observable } from 'rxjs';
import { SaveMotoRequest, UpdateMotoRequest, ListMotoResponse, DetailMotoResponse, SaveMotoResponse, UpdateMotoResponse } from './motos.models';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environtes';

@Injectable({
  providedIn: 'root'
})
export class MotosService implements IMotoService {

  private readonly basePath = environments.apiUrl

  constructor(private http: HttpClient) { }


  save(request: SaveMotoRequest): Observable<SaveMotoRequest> {
    return this.http.post<SaveMotoResponse>(`${this.basePath}/api/motos`, request)
  }

  update(id: number, request: UpdateMotoRequest): Observable<UpdateMotoResponse> {
    return this.http.put<UpdateMotoResponse>(`${this.basePath}/api/motos/${id}`, request)
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.basePath}/api/motos${id}`)
  }

  list(): Observable<ListMotoResponse[]> {
    return this.http.get<ListMotoResponse[]>(`${this.basePath}/api/motos`)
  }

  findById(id: number): Observable<DetailMotoResponse> {
    return this.http.get<DetailMotoResponse>(`${this.basePath}/api/motos${id}`)
  }
}
