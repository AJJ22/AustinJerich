import { motion } from 'motion/react'
import { Link } from 'react-router-dom'

export function ProjectsSection() {
  const projects = [
    {
      number: '01',
      title: 'Text Game 2019',
      href: '/TextGame2019',
      description: 'An interactive text-based adventure game (initial iteration written in 2019) built to explore game development concepts and how to integrate it into a web UI. Features branching area layouts and dynamic combat systems.',
      tags: ['React', 'Redux', 'Game Design'],
      year: '2025'
    },
    {
      number: '02',
      title: 'Movie Tracking API',
      href: '/movies',
      description: 'A RESTful API for tracking and managing movie collections with user ratings and recommendations. Built with modern backend technologies and architecture.',
      tags: ['REST API', 'Node.js', 'Express', 'PostgreSQL'],
      year: '2025/2026'
    }
  ]

  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="text-sm uppercase tracking-wider text-blue-600 mb-4">
            Portfolio
          </div>
          <h2 className="text-5xl text-slate-900">
            Featured Projects
          </h2>
        </motion.div>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative border-t border-slate-200 pt-12 hover:border-blue-600 transition-colors">
                <div className="grid md:grid-cols-12 gap-8 items-start">
                  <div className="md:col-span-2">
                    <div className="text-6xl text-slate-200 group-hover:text-blue-600 transition-colors">
                      {project.number}
                    </div>
                  </div>

                  <div className="md:col-span-7">
                    <h3 className="text-3xl mb-4 text-slate-900 group-hover:text-blue-600 transition-colors">
                      <Link to={project.href}>{project.title}</Link>
                    </h3>
                    
                    <p className="text-lg text-slate-600 leading-relaxed mb-6">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-3 mb-6">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-sm text-slate-600 border-b border-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* use if i am not going to embed the project in my portfolio, or if i just want to link the github */}
                    {/* 
                    <div className="flex gap-4">
                      <button className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors">
                        <Github className="w-5 h-5" />
                        <span>View Code</span>
                      </button>
                    </div>
                    */}
                  </div>

                  <div className="md:col-span-3 flex items-start justify-end">
                    <div className="text-right">
                      <div className="text-sm text-slate-400 mb-2">Year</div>
                      <div className="text-2xl text-slate-900">{project.year}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* add back in when i have more than 3 projects */}
        {/* 
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
        
          <button className="px-8 py-4 border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white rounded-lg transition-all">
            View All Projects
          </button>
        
        </motion.div>
        */}
      </div>
    </section>
  )
}
