// src/components/sections/Projects.tsx
'use client'

import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Github, ExternalLink, Folder } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

// Tipos para nossos projetos
interface Project {
  title: string
  description: string
  tags: string[]
  image: string
  github?: string
  live?: string
}

// Array de projetos
const projects: Project[] = [
  {
    title: "Projeto 1",
    description: "Descrição do projeto 1. Uma breve explicação sobre o que foi desenvolvido e as principais tecnologias utilizadas.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind"],
    image: "/api/placeholder/600/400",
    github: "https://github.com/seu-usuario/projeto1",
    live: "https://projeto1.com"
  },
  {
    title: "Projeto 2",
    description: "Descrição do projeto 2. Detalhes sobre a implementação e os desafios superados durante o desenvolvimento.",
    tags: ["React", "Node.js", "MongoDB"],
    image: "/api/placeholder/600/400",
    github: "https://github.com/seu-usuario/projeto2",
  },
  // Adicione mais projetos conforme necessário
]

export function Projects() {
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
    <section id="projects" className="py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="container mx-auto px-4"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Projetos</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Uma seleção dos meus projetos mais recentes e relevantes, demonstrando minhas habilidades
            e experiência em desenvolvimento.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="group overflow-hidden h-full flex flex-col">
                <div className="relative overflow-hidden">
                  <div className="aspect-video relative">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {project.github && (
                      <Button size="icon" variant="secondary" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-5 w-5" />
                        </a>
                      </Button>
                    )}
                    {project.live && (
                      <Button size="icon" variant="secondary" asChild>
                        <a href={project.live} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Folder className="h-5 w-5 text-primary" />
                    {project.title}
                  </CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}