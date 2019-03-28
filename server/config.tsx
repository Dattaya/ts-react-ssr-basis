export default {
  isDev: process.env.NODE_ENV !== 'production',
  port: Number(process.env.PORT) || 3000,
  host: process.env.HOST || 'localhost',
}
