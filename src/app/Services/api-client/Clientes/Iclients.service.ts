import { Observable } from "rxjs";
import { DetailClientResponse, ListClientResponse, SaveClientRequest, UpdateClientRequest, updateClientResponse } from "./clients.models";

export interface IClientService {
  save(request: SaveClientRequest): Observable<SaveClientRequest>

  update(id: number, request: UpdateClientRequest): Observable<updateClientResponse>

  delete(id: number): Observable<void>

  list(): Observable<ListClientResponse[]>

  findById(id: number): Observable<DetailClientResponse>
}
