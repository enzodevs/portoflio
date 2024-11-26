// src/components/sections/Skills.tsx
'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'

interface Skill {
  name: string
  category: 'frontend' | 'backend' | 'tools' | 'languages'
  level: number // 0 to 100
  icon?: string
}

const skills: Skill[] = [
  // Frontend
  { name: 'React', category: 'frontend', level: 90 },
  { name: 'Next.js', category: 'frontend', level: 85 },
  { name: 'TypeScript', category: 'frontend', level: 85 },
  { name: 'Tailwind CSS', category: 'frontend', level: 90 },
  { name: 'HTML/CSS', category: 'frontend', level: 95 },
  
  // Backend
  { name: 'Node.js', category: 'backend', level: 80 },
  { name: 'Express', category: 'backend', level: 75 },
  { name: 'MongoDB', category: 'backend', level: 70 },
  { name: 'SQL', category: 'backend', level: 75 },
  
  // Tools
  { name: 'Git', category: 'tools', level: 85 },
  { name: 'Docker', category: 'tools', level: 70 },
  { name: 'VS Code', category: 'tools', level: 90 },
  
  // Languages
  { name: 'JavaScript', category: 'languages', level: 90 },
  { name: 'Python', category: 'languages', level: 75 },
  { name: 'Java', category: 'languages', level: 70 }
]

const categories = {
  frontend: 'Frontend Development',
  backend: 'Backend Development',
  tools: 'Development Tools',
  languages: 'Programming Languages'
}

export function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section id="skills" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills</h2>
            <p className="text-lg text-muted-foreground">
            My technical skills and the tools I use in development.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(Object.keys(categories) as Array<keyof typeof categories>).map((category) => (
              <motion.div key={category} variants={itemVariants}>
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{categories[category]}</h3>
                  <div className="space-y-4">
                    {skills
                      .filter(skill => skill.category === category)
                      .map((skill, index) => (
                        <motion.div
                          key={index}
                          className="space-y-2"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-sm text-muted-foreground">
                              {skill.level}%
                            </span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-primary"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: 0.2 }}
                              viewport={{ once: true }}
                            />
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}