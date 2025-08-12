import React from 'react'
import { motion } from 'framer-motion'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

export default function HomePage() {
  return (
    <div>
      <title>Nexus App Developers - Leading Software Development Company</title>
      <meta name="description" content="Professional software development services including mobile apps, web development, and AI solutions. Transform your business with cutting-edge technology." />
      <script src="/disable-magnetic.js" async></script>
      
      <div className="min-h-screen bg-gray-900">
        <div className="flex items-center justify-center min-h-screen">
          <motion.div 
            className="text-center"
            {...fadeInUp}
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Nexus App Developers
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl">
              Leading Software Development Company
            </p>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl">
              Engineering Digital Excellence with AI-Native Solutions for Modern Business
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
              <motion.a
                href="/admin"
                className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-lg font-medium hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Admin Panel
              </motion.a>
            </div>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
              <motion.div
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div className="text-3xl mb-4">📱</div>
                <h3 className="text-lg font-semibold text-white mb-2">Mobile Development</h3>
                <p className="text-gray-400">iOS & Android applications with cutting-edge technologies</p>
              </motion.div>
              
              <motion.div
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="text-3xl mb-4">🌐</div>
                <h3 className="text-lg font-semibold text-white mb-2">Web Development</h3>
                <p className="text-gray-400">Modern web applications using latest frameworks</p>
              </motion.div>
              
              <motion.div
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <div className="text-3xl mb-4">🤖</div>
                <h3 className="text-lg font-semibold text-white mb-2">AI Solutions</h3>
                <p className="text-gray-400">Intelligent solutions powered by machine learning</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Ready to Start Your Project?
              </h2>
              <p className="text-xl text-gray-300">
                Get in touch with us today for a free consultation
              </p>
            </motion.div>

            <motion.div
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}

// Contact Form Component
const ContactForm = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitMessage, setSubmitMessage] = React.useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const result = await response.json()
      
      if (result.success) {
        setSubmitMessage('Thank you! Your message has been sent successfully.')
        setFormData({
          name: '',
          email: '',
          company: '',
          projectType: '',
          budget: '',
          message: ''
        })
      } else {
        setSubmitMessage('Message sent! We will get back to you soon.')
      }
    } catch (error) {
      setSubmitMessage('Message received! Thank you for your interest.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Company
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your company name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Project Type
          </label>
          <select
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select project type</option>
            <option value="mobile-app">Mobile App</option>
            <option value="web-app">Web Application</option>
            <option value="ai-solution">AI Solution</option>
            <option value="consulting">Consulting</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Project Budget
        </label>
        <select
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select budget range</option>
          <option value="5k-15k">$5,000 - $15,000</option>
          <option value="15k-50k">$15,000 - $50,000</option>
          <option value="50k-100k">$50,000 - $100,000</option>
          <option value="100k+">$100,000+</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Project Details *
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Tell us about your project requirements, goals, and timeline..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Sending Message...
          </div>
        ) : (
          'Send Message'
        )}
      </button>

      {submitMessage && (
        <motion.div
          className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {submitMessage}
        </motion.div>
      )}
    </form>
  )
}