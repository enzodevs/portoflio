// src/components/sections/About.tsx
'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Code2, Laptop, Brain, Rocket } from 'lucide-react'

const features = [
  {
    icon: Code2,
    title: 'Desenvolvimento Web',
    description: 'Experiência com tecnologias modernas como Next.js, React e TypeScript'
  },
  {
    icon: Laptop,
    title: 'Engenharia da Computação',
    description: 'Estudante dedicado com foco em soluções inovadoras'
  },
  {
    icon: Brain,
    title: 'Problem Solving',
    description: 'Apaixonado por resolver problemas complexos com soluções elegantes'
  },
  {
    icon: Rocket,
    title: 'Inovação',
    description: 'Sempre buscando aprender e aplicar novas tecnologias'
  }
]

export function About() {
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
    <section id="about" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Sobre Mim</h2>
            <p className="text-lg text-muted-foreground">
              Estudante de Engenharia da Computação apaixonado por tecnologia e inovação.
              Busco constantemente novos desafios e oportunidades para crescer profissionalmente.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div 
            variants={itemVariants}
            className="mt-12 text-center"
          >
            <p className="text-lg text-muted-foreground">
              Atualmente focado em desenvolvimento web full-stack, 
              com especial interesse em criar experiências únicas e interativas.
              Sempre em busca de aprender novas tecnologias e metodologias para 
              desenvolver soluções inovadoras.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}