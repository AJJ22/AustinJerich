import { Navigation } from './navigation.js'
import { IntroSection } from './intro-section.js'
import { AboutSection } from './about-section.js'
import { EducationSection } from './education-section.js'
import { ProjectsSection } from './projects-section.js'
import { ContactSection } from './contact-section.js'

export default function home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <div id="home">
            <IntroSection />
        </div>
        <div id="about">
            <AboutSection />
        </div>
        <div id="education">
            <EducationSection />
        </div>
        <div id="projects">
            <ProjectsSection />
        </div>
        <div id='contact'>
            <ContactSection />
        </div>
      </main>
      <footer className="bg-slate-900 text-slate-300 py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-2">© {new Date().getFullYear()} Austin Jerich. All rights reserved.</p>
          <p className="text-sm text-slate-400">
            Built with React, Tailwind CSS, and Motion
          </p>
        </div>
      </footer>
    </div>
  );
}