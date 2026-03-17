import { motion } from 'motion/react';

export function AboutSection() {
  const skills = [
    'C#', '.NET', 'React', 'TypeScript', 'Node.js', 'REST APIs', 
    'SQL', 'Git', 'Agile', 'ERP Systems', 'JavaScript', 'HTML/CSS'
  ];

  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-5 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <div className="sticky top-32">
              <div className="text-sm uppercase tracking-wider text-blue-600 mb-4">
                About Me
              </div>
              <h2 className="text-5xl mb-6 text-slate-900">
                Crafting Digital Experiences
              </h2>
              <div className="w-20 h-1 bg-blue-600"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-3 space-y-6"
          >
            <p className="text-lg text-slate-600 leading-relaxed">
              I am a software engineering professional actively searching for new employment opportunities. 
              I received a BS in computer science in 2019. Since then, I have held 2 engineering positions.
            </p>
            
            <p className="text-lg text-slate-600 leading-relaxed">
              The majority of my career was spent at <span className="text-slate-900">Epicor Software</span>, 
              where I worked on Kinetic, a SaaS cloud application that assists manufacturers and retailers 
              in efficiently running their businesses. I left Epicor because I would like to gain 
              professional experience outside of ERP development.
            </p>

            <p className="text-lg text-slate-600 leading-relaxed">
              I started this project as a skill building exercise to help me learn React, but also to use 
              as something to demonstrate my web application development knowledge. I plan to continue 
              working on the site by embedding some of my previous and upcoming side projects.
            </p>

            <div className="pt-8">
              <h3 className="text-xl mb-6 text-slate-900">Skills & Technologies</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="px-4 py-2 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 rounded-lg transition-colors cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
