import { Observable } from "rxjs";
import { DetailMotoResponse, ListMotoResponse, SaveMotoRequest, UpdateMotoRequest, UpdateMotoResponse } from "./motos.models";

export interface IMotoService {
  save(request: SaveMotoRequest): Observable<SaveMotoRequest>

  update(id: number, request: UpdateMotoRequest): Observable<UpdateMotoResponse>

  delete(id: number): Observable<void>

  list(): Observable<ListMotoResponse[]>

  findById(id: number): Observable<DetailMotoResponse>
}