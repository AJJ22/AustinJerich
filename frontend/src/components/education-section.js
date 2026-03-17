import { motion } from 'motion/react';

export function EducationSection() {
  const timeline = [
    {
      year: '2019',
      title: 'BS - Computer Science',
      institution: 'Buena Vista University',
      location: 'Storm Lake, IA',
      description: 'Graduated with a Bachelor of Science degree in Computer Science, building a strong foundation in software engineering principles.'
    },
    {
      year: '2015',
      title: 'High School Diploma',
      institution: 'Eden Prairie High School',
      location: 'Eden Prairie, MN',
    }
  ];

  return (
    <section className="py-32 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="text-sm uppercase tracking-wider text-blue-600 mb-4">
            Background
          </div>
          <h2 className="text-5xl text-slate-900">
            Education
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-slate-300"></div>

          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative mb-16 md:mb-24 ${
                index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'
              }`}
            >
              <div className="md:max-w-lg">
                {/* Timeline dot */}
                <div className={`absolute left-8 md:left-1/2 w-4 h-4 bg-blue-600 rounded-full -translate-x-1/2 shadow-lg ${
                  index % 2 === 0 ? 'md:translate-x-1/2' : 'md:-translate-x-1/2'
                }`}>
                  <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-75"></div>
                </div>

                <div className={`ml-16 md:ml-0 ${index % 2 === 0 ? 'md:mr-16' : 'md:ml-16'}`}>
                  <div className="inline-block px-4 py-1 bg-blue-600 text-white rounded-full text-sm mb-4">
                    {item.year}
                  </div>
                  
                  <h3 className="text-2xl mb-2 text-slate-900">
                    {item.title}
                  </h3>
                  
                  <div className="text-lg text-slate-700 mb-1">
                    {item.institution}
                  </div>
                  
                  <div className="text-slate-500 mb-4">
                    {item.location}
                  </div>
                  
                  <p className="text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
