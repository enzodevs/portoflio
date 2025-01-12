// src/components/sections/Contact.tsx
'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Send, Loader2 } from 'lucide-react'
import { useState, FormEvent } from 'react'
import { Notification } from '@/components/ui/notification'

// Validações
const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

const validateInput = (input: string, minLength: number = 3) => {
  return input.trim().length >= minLength
}

export function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notification, setNotification] = useState<{
    isOpen: boolean
    status: 'success' | 'error' | 'loading'
    message: string
  }>({
    isOpen: false,
    status: 'loading',
    message: '',
  })

  // Rate limiting no cliente
  const [lastSubmission, setLastSubmission] = useState(0)
  const SUBMISSION_DELAY = 60000 // 1 minuto entre submissões

  const closeNotification = () => {
    setNotification((prev) => ({ ...prev, isOpen: false }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setNotification({
      isOpen: true,
      status: 'loading',
      message: 'Sending your message...',
    })

    // Validações básicas
    if (!validateInput(name, 2)) {
      setNotification({
        isOpen: true,
        status: 'error',
        message: 'Name must be at least 2 characters long.',
      })
      setTimeout(closeNotification, 5000)
      setIsSubmitting(false)
      return
    }

    if (!validateEmail(email)) {
      setNotification({
        isOpen: true,
        status: 'error',
        message: 'Please enter a valid email address.',
      })
      setTimeout(closeNotification, 5000)
      setIsSubmitting(false)
      return
    }

    if (!validateInput(subject, 3)) {
      setNotification({
        isOpen: true,
        status: 'error',
        message: 'Subject must be at least 3 characters long.',
      })
      setTimeout(closeNotification, 5000)
      setIsSubmitting(false)
      return
    }

    if (!validateInput(message, 10)) {
      setNotification({
        isOpen: true,
        status: 'error',
        message: 'Message must be at least 10 characters long.',
      })
      setTimeout(closeNotification, 5000)
      setIsSubmitting(false)
      return
    }

    // Rate limiting
    const now = Date.now()
    if (now - lastSubmission < SUBMISSION_DELAY) {
      setNotification({
        isOpen: true,
        status: 'error',
        message: 'Please wait a moment before sending another message.',
      })
      setTimeout(closeNotification, 5000)
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
          timestamp: new Date().toISOString(),
          website: '', // Campo honeypot
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setNotification({
        isOpen: true,
        status: 'success',
        message: 'Message sent successfully! Thank you for reaching out.',
      })

      setLastSubmission(now)

      // Resetar formulário
      setName('')
      setEmail('')
      setSubject('')
      setMessage('')

      // Fechar notificação de sucesso após 5 segundos
      setTimeout(closeNotification, 5000)
    } catch {
      setNotification({
        isOpen: true,
        status: 'error',
        message: 'Failed to send message. Please try again later.',
      })
      setTimeout(closeNotification, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact</h2>
              <p className="text-lg text-muted-foreground">
                Interested in working together? Get in touch!
              </p>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <Card className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <input
                    type="text"
                    name="website"
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                    onChange={() => {}} // Campo honeypot
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Name</label>
                      <input
                        id="name"
                        type="text"
                        className="w-full px-4 py-2 border rounded-md bg-background"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isSubmitting}
                        maxLength={100}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <input
                        id="email"
                        type="email"
                        className="w-full px-4 py-2 border rounded-md bg-background"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isSubmitting}
                        maxLength={100}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                    <input
                      id="subject"
                      type="text"
                      className="w-full px-4 py-2 border rounded-md bg-background"
                      placeholder="Message subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      disabled={isSubmitting}
                      maxLength={200}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <textarea
                      id="message"
                      className="w-full px-4 py-2 border rounded-md bg-background min-h-[150px]"
                      placeholder="Your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={isSubmitting}
                      maxLength={1000}
                      required
                    />
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Notification
        isOpen={notification.isOpen}
        status={notification.status}
        message={notification.message}
        onClose={closeNotification}
      />
    </>
  )
}
