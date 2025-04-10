export interface SaveMotoRequest {
  modelo: string
  marca: string
  precoPorDia: number
  disponivel: boolean
}

export interface UpdateMotoRequest {
  modelo: string
  marca: string
  precoPorDia: number
  disponivel: boolean
}

export interface SaveMotoResponse {
  id: number
  modelo: string
  marca: string
  precoPorDia: number
  disponivel: boolean
}

export interface UpdateMotoResponse {
  id: number
  modelo: string
  marca: string
  precoPorDia: number
  disponivel: boolean
}

export interface ListMotoResponse {
  id: number
  modelo: string
  marca: string
  precoPorDia: number
  disponivel: boolean
}

export interface DetailMotoResponse {
  id: number
  modelo: string
  marca: string
  precoPorDia: number
  disponivel: boolean
}
