import cors from 'cors'

const options = {
  origin: '*',
}

export const corsMiddleware = cors(options)
