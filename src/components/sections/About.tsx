// src/components/sections/About.tsx
'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Code2, Laptop, Brain, Rocket } from 'lucide-react'

const features = [
  {
    icon: Code2,
    title: 'Web Development',
    description: 'Experience with modern technologies such as Next.js, React and TypeScript'
  },
  {
    icon: Laptop,
    title: 'Computer Engineering',
    description: 'Dedicated student with a focus on innovative solutions'
  },
  {
    icon: Brain,
    title: 'Problem Solving',
    description: 'Passionate about solving complex problems with elegant solutions'
  },
  {
    icon: Rocket,
    title: 'Innovation',
    description: 'Always looking to learn and apply new technologies'
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <p className="text-lg text-muted-foreground">
            I boost business with technological solutions.
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
            Currently focused on full-stack web development, with a
            special interest in creating unique and interactive experiences.
            Always looking to learn new technologies and methodologies to develop innovative solutions.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}