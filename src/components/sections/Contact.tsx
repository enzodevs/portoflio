// src/components/sections/Contact.tsx
'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, MessageSquare, Send } from 'lucide-react'

export function Contact() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Contato</h2>
            <p className="text-lg text-muted-foreground">
              Interessado em trabalhar juntos? Entre em contato!
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="p-6 md:p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nome</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-md bg-background"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border rounded-md bg-background"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Assunto</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md bg-background"
                    placeholder="Assunto da mensagem"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Mensagem</label>
                  <textarea
                    className="w-full px-4 py-2 border rounded-md bg-background min-h-[150px]"
                    placeholder="Sua mensagem..."
                  />
                </div>
                <Button className="w-full" size="lg">
                  Enviar Mensagem
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>

              <div className="mt-8 pt-8 border-t grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href="mailto:seu@email.com"
                  className="flex items-center gap-3 p-4 rounded-lg hover:bg-secondary transition-colors"
                >
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">seu@email.com</p>
                  </div>
                </a>
                <a
                  href="https://linkedin.com/in/seu-perfil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-lg hover:bg-secondary transition-colors"
                >
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">LinkedIn</p>
                    <p className="text-sm text-muted-foreground">Vamos conectar!</p>
                  </div>
                </a>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}