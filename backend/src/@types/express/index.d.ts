/**
 * Sobre escrevendo tipagem do express
 * ? a rota de criação das pasta de @types/express/index.d.ts é igual que no node modules
 */
declare namespace Express {
  export interface Request {
    user_id: string
  }
}
