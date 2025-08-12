import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Services',
      links: [
        'Mobile App Development',
        'Web Development',
        'AI & Machine Learning',
        'Cloud Solutions',
        'UI/UX Design',
        'DevOps & Consulting'
      ]
    },
    {
      title: 'Technologies',
      links: [
        'React & React Native',
        'Node.js & Express',
        'Python & Django',
        'AWS & Azure',
        'PostgreSQL & MongoDB',
        'Docker & Kubernetes'
      ]
    },
    {
      title: 'Industries',
      links: [
        'Healthcare',
        'Finance & Fintech',
        'E-commerce',
        'Education',
        'Real Estate',
        'Logistics'
      ]
    },
    {
      title: 'Company',
      links: [
        'About Us',
        'Our Team',
        'Careers',
        'Blog',
        'Case Studies',
        'Contact'
      ]
    }
  ]

  const socialLinks = [
    { name: 'LinkedIn', url: '#', icon: 'linkedin' },
    { name: 'Twitter', url: '#', icon: 'twitter' },
    { name: 'GitHub', url: '#', icon: 'github' },
    { name: 'Dribbble', url: '#', icon: 'dribbble' }
  ]

  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="max-w-7xl mx-auto container-padding">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <motion.div 
                className="flex items-center space-x-3 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-pink rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
                <span className="text-xl font-bold text-white">Nexus</span>
              </motion.div>
              
              <p className="text-gray-400 mb-6 leading-relaxed">
                Transforming businesses through innovative software solutions and AI-driven technologies.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    className="w-10 h-10 bg-white/10 hover:bg-primary-500/20 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary-400 transition-colors"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="sr-only">{social.name}</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      {social.icon === 'linkedin' && (
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      )}
                      {social.icon === 'twitter' && (
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      )}
                      {social.icon === 'github' && (
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      )}
                      {social.icon === 'dribbble' && (
                        <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.626 0 12 0zm7.568 5.302c1.4 1.5 2.252 3.5 2.299 5.653-.3-.1-3.3-.6-6.399-.3-.1-.3-.2-.5-.4-.8-.2-.3-.4-.7-.6-1C16.968 7.9 19.368 6.3 19.568 5.302zM12 2.1c2.1 0 4 .8 5.4 2.1-.2.1-2.4 1.5-4.9 2.9C11.2 5.4 9.9 3.5 8.5 2c1.1-.6 2.3-1 3.5-1zm-3.9 1.4c1.4 1.4 2.6 3.2 3.9 4.9-4.9 1.3-9.2 1.3-9.7 1.3-.7-2.9.5-5.5 2.6-7.4.7 0 2.2 0 3.2 1.2zm-5.5 8.2v-.4c.5 0 5.6 0 11.2-1.5.2.4.4.7.5 1.1 0 .1 0 .1-.1.2-5.7 1.8-8.7 6.7-8.9 7.1-1.6-1.4-2.7-3.6-2.7-6.1 0-.1 0-.3 0-.4zm4.1 7.4c.1-.2 2.1-3.7 6.8-5.1 1.2 3.1 1.7 5.7 1.8 6.4-1.4.6-2.9 1-4.5 1-.8-.1-1.5-.3-2.2-.6-.5-.3-.9-.6-1.3-1-.3-.4-.4-.7-.6-1.1zm7.9-1.1c-.1-.5-.6-2.9-1.6-5.9 2.8-.4 5.3.3 5.6.4-.4 2.4-1.9 4.4-4 5.5z"/>
                      )}
                    </svg>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Footer Sections */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-white mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <motion.a
                        href="#"
                        className="text-gray-400 hover:text-primary-400 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        {link}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="py-8 border-t border-gray-800">
          <motion.div 
            className="glass-card p-8 max-w-4xl mx-auto text-center"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-4">
              Stay Updated with Tech Insights
            </h3>
            <p className="text-gray-300 mb-6">
              Subscribe to our newsletter for the latest trends in software development, 
              AI innovations, and industry best practices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="form-input flex-1"
              />
              <motion.button
                className="btn btn-primary whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Footer */}
        <div className="py-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Nexus App Developers. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <motion.a
                href="#"
                className="text-gray-400 hover:text-primary-400 transition-colors"
                whileHover={{ y: -2 }}
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-400 hover:text-primary-400 transition-colors"
                whileHover={{ y: -2 }}
              >
                Terms of Service
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-400 hover:text-primary-400 transition-colors"
                whileHover={{ y: -2 }}
              >
                Cookie Policy
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer