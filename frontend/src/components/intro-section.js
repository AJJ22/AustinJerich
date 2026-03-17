import { motion } from 'motion/react'
import { ArrowRight, Download } from 'lucide-react'
import profileImage from '../../images/156x182.jpg'

export function IntroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-slate-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-4 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
              <span className="text-blue-400 text-sm">Available for opportunities</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl mb-6">
              Hi, I'm
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Austin Jerich
              </span>
            </h1>
            
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              A passionate software engineer with 5 years of experience building scalable 
              ERP solutions. Now seeking new challenges in modern web development.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href='#contact' className="group px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-all flex items-center gap-2">
                Get in touch
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href='/Austin_Jerich_Resume.pdf' download='Austin_Jerich_Resume.pdf' className="px-6 py-3 border border-slate-700 hover:border-slate-500 rounded-lg transition-all flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download CV
              </a>
            </div>

            <div className="mt-12 flex items-center gap-8">
              <div>
                <div className="text-3xl mb-1">5+</div>
                <div className="text-slate-400 text-sm">Years Experience</div>
              </div>
              <div className="w-px h-12 bg-slate-700" />
              <div>
                <div className="text-3xl mb-1">2</div>
                <div className="text-slate-400 text-sm">Projects Completed</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-blue-500/20 rounded-3xl" />
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-purple-500/20 rounded-3xl" />
              
              {/* Profile image */}
              <div className="relative z-10 aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-500 p-1">
                <div className="w-full h-full rounded-3xl overflow-hidden">
                  <img
                    src={profileImage}
                    alt="Austin Jerich"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Floating contact card */}
              

              {/* Floating location card */}
              
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        
      </motion.div>
    </section>
  );
}
