
// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json()

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    })

    const emailTemplate = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
    }
    .header {
      background-color: #f8f9fa;
      padding: 15px;
      border-radius: 6px;
      margin-bottom: 20px;
    }
    .content {
      padding: 15px;
    }
    .field {
      margin-bottom: 15px;
    }
    .label {
      font-weight: bold;
      color: #555;
    }
    .message {
      white-space: pre-wrap;
      background-color: #f8f9fa;
      padding: 15px;
      border-radius: 6px;
      margin-top: 5px;
    }
    .footer {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
      font-size: 0.9em;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Nova Mensagem do Portfolio</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Nome:</div>
        <div>${name}</div>
      </div>
      <div class="field">
        <div class="label">Email:</div>
        <div>${email}</div>
      </div>
      <div class="field">
        <div class="label">Assunto:</div>
        <div>${subject}</div>
      </div>
      <div class="field">
        <div class="label">Mensagem:</div>
        <div class="message">${message}</div>
      </div>
    </div>
    <div class="footer">
      Enviado em ${new Date().toLocaleString('pt-BR', { 
        timeZone: 'America/Sao_Paulo'
      })}
    </div>
  </div>
</body>
</html>
`

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `Portfolio: ${subject}`,
      html: emailTemplate,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ error: 'Erro ao enviar email' }, { status: 500 })
  }
}
