import { Observable } from "rxjs";
import { SaveClientRequest } from "./clients.models";

export interface IClientService {
  save(request: SaveClientRequest): Observable<SaveClientRequest>

  List(request: SaveClientRequest): Observable<SaveClientRequest>

  Delete(request: SaveClientRequest): Observable<SaveClientRequest>
}