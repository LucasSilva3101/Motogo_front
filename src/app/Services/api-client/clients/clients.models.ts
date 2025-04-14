export interface SaveClientRequest {
  nome: string
  email: string
  telefone: string
  endereco: string
  dataNasc: string
}

export interface UpdateClientRequest {
  nome: string
  email: string
  telefone: string
  endereco: string
  dataNasc: string
}

export interface SaveClientResponse {
  id: number
  nome: string
  email: string
  telefone: string
  endereco: string
  dataNasc: string
}

export interface updateClientResponse {
  id: number
  nome: string
  email: string
  telefone: string
  endereco: string
  dataNasc: string
}

export interface ListClientResponse {
  id: number
  nome: string
  email: string
  telefone: string
  endereco: string
  dataNasc: string
}

export interface DetailClientResponse {
  id: number
  nome: string
  email: string
  telefone: string
  endereco: string
  dataNasc: string
}
