import { motion } from 'motion/react'
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react'

export function ContactSection() {
  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'austinjrch8@gmail.com',
      href: 'mailto:austinjrch8@gmail.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '(952) 500-3024',
      href: 'tel:9525003024'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Minneapolis, MN',
      href: null
    }
  ]

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/AJJ22', name: 'GitHub' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/austin-jerich-75a120119/', name: 'LinkedIn' }
  ]

  return (
    <section className="py-32 px-6 bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="text-sm uppercase tracking-wider text-blue-400 mb-4">
            Get In Touch
          </div>
          <h2 className="text-5xl mb-6">
            Let's Connect
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            I'm currently looking for new opportunities. Feel free to reach out 
            if you have any questions or just want to connect!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {contactInfo.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              {item.href ? (
                <a
                  href={item.href}
                  className="block group"
                >
                  <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <div className="text-sm text-slate-500 mb-2">{item.label}</div>
                  <div className="text-lg group-hover:text-blue-400 transition-colors">{item.value}</div>
                </a>
              ) : (
                <div>
                  <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <div className="text-sm text-slate-500 mb-2">{item.label}</div>
                  <div className="text-lg">{item.value}</div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div className="text-sm text-slate-500 mb-4">Connect with me</div>
          <div className="flex gap-4 justify-center">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="group flex items-center gap-3 px-6 py-3 bg-slate-800 hover:bg-blue-600 rounded-lg transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
                <span>{social.name}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}