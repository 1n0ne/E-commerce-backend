import nodemailer from 'nodemailer'

import { dev } from '../config'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: dev.app.smtpUsername,
    pass: dev.app.smtpPassword
  }
})

interface EmailDataType {
  email: string
  subject: string
  html: string
}

export const handleSendEmail = async (emailData: EmailDataType) => {
  try {
    const mailOptions = {
      from: dev.app.smtpUsername,
      to: emailData.email,
      subject: emailData.subject,
      html: emailData.html
    }
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error('Message encountered while sending email', error)
    throw error
  }
}
