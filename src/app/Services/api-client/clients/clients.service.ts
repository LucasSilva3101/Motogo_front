import { Injectable } from "@angular/core"
import { environments } from "src/environments/environtes"
import { HttpClient } from "@angular/common/http"
import { DetailClientResponse, ListClientResponse, SaveClientRequest, SaveClientResponse, UpdateClientRequest, updateClientResponse } from "./clients.models"
import { Observable } from "rxjs"
import { IClientService } from "./Iclients.service"



@Injectable({
  providedIn: 'root'
})
export class ClientsService implements IClientService {

  private readonly basePath = environments.apiUrl

  constructor(private http: HttpClient) { }

  save(request: SaveClientRequest): Observable<SaveClientRequest> {
    return this.http.post<SaveClientResponse>(`${this.basePath}/api/clientes`, request)
  }

  update(id: number, request: UpdateClientRequest): Observable<updateClientResponse> {
    return this.http.put<updateClientResponse>(`${this.basePath}/api/clientes/${id}`, request)
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.basePath}/api/clientes${id}`)
  }

  list(): Observable<ListClientResponse[]> {
    return this.http.get<ListClientResponse[]>(`${this.basePath}/api/clientes`)
  }

  findById(id: number): Observable<DetailClientResponse> {
    return this.http.get<DetailClientResponse>(`${this.basePath}/api/clientes${id}`)
  }
}
