import 'dotenv/config'

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in .env')
}

export const env = {
  port: process.env.PORT ?? 3000,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
}
