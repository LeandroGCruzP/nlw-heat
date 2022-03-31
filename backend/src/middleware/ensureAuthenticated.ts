import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

type SubProps = {
  sub: string
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization

  /**
   * Verificando se o token está vazio
   */
  if (!authToken) {
    return response.status(401).json({
      erroCode: "token.invalid"
    })
  }

  /**
   * Ignorando a primeira posição com a virgula
   * buscando o valor do token
   */
  const [, token] = authToken.split(" ")

  try {
    /**
     * O sub é o ID do usuário logado
     */
    const { sub } = verify(token, process.env.JWT_SECRET) as SubProps

    request.user_id = sub

    return next()
  } catch (err) {
    return response.status(401).json({ errorCode: "token.expired" })
  }
}
