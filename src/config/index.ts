import 'dotenv/config'

export const dev = {
  app: {
    port: Number(process.env.SERVER_PORT),

    defaultImagePath: String(process.env.DEFAULT_IMAGE_PATH),

    jwtUserActivationKey: String(process.env.JWT_USER_ACTIVATION_KEY),

    smtpUsername: String(process.env.SMTP_USERNAME),
    smtpPassword: String(process.env.SMTP_PASSWORD),
    jwtUserlogin: String(process.env.SMTP_LOGIN_USER),
    jwtrestUSerPassword: String(process.env.SMTP_PASSWORD)
  },
  db: {
    url: String(process.env.MONGODB_URL)
  }
}
