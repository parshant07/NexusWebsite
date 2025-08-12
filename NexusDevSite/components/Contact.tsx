import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    message: '',
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simulate API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        company: '',
        projectType: '',
        budget: '',
        message: '',
      })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email Us',
      content: 'hello@nexusappdev.com',
      description: 'Send us an email anytime!'
    },
    {
      icon: '📱',
      title: 'Call Us',
      content: '+1 (555) 123-4567',
      description: 'Mon-Fri from 8am to 6pm.'
    },
    {
      icon: '🏢',
      title: 'Visit Us',
      content: '123 Innovation Drive, Tech City, TC 12345',
      description: 'Come say hello at our office HQ.'
    },
    {
      icon: '⚡',
      title: 'Response Time',
      content: '< 24 hours',
      description: 'We reply to all inquiries quickly.'
    }
  ]

  return (
    <section id="contact" className="section-padding bg-gray-900">
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Let's Start Your <span className="gradient-text">Project</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to transform your ideas into reality? Get in touch with our experts today.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <div className="glass-card p-8">
                <h3 className="text-2xl font-semibold mb-6 text-white">Send us a message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="form-input"
                        placeholder="John Doe"
                      />
                    </motion.div>
                    
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="form-input"
                        placeholder="john@example.com"
                      />
                    </motion.div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Your Company"
                      />
                    </motion.div>
                    
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-2">
                        Project Type
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="form-input"
                      >
                        <option value="">Select a service</option>
                        <option value="mobile-app">Mobile App Development</option>
                        <option value="web-app">Web Application</option>
                        <option value="ai-ml">AI/ML Solutions</option>
                        <option value="cloud">Cloud Solutions</option>
                        <option value="uiux">UI/UX Design</option>
                        <option value="consulting">Consulting</option>
                        <option value="other">Other</option>
                      </select>
                    </motion.div>
                  </div>

                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
                      Project Budget
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="form-input"
                    >
                      <option value="">Select your budget range</option>
                      <option value="10k-25k">$10k - $25k</option>
                      <option value="25k-50k">$25k - $50k</option>
                      <option value="50k-100k">$50k - $100k</option>
                      <option value="100k+">$100k+</option>
                      <option value="discuss">Let's discuss</option>
                    </select>
                  </motion.div>

                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Project Description *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="form-input resize-none"
                      placeholder="Tell us about your project, goals, and requirements..."
                    />
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full btn btn-primary text-lg py-4 ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center space-x-2">
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Sending Message...</span>
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </motion.button>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <motion.div 
                      className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 text-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      Thank you! Your message has been sent successfully. We'll get back to you soon.
                    </motion.div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <motion.div 
                      className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      Sorry, something went wrong. Please try again or contact us directly.
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div variants={itemVariants}>
              <div className="space-y-8">
                <div className="glass-card p-8">
                  <h3 className="text-2xl font-semibold mb-6 text-white">Get in touch</h3>
                  <p className="text-gray-300 mb-8 leading-relaxed">
                    We'd love to hear about your project and explore how we can help bring your vision to life. 
                    Reach out to us through any of the channels below.
                  </p>

                  <div className="grid gap-6">
                    {contactInfo.map((info, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start space-x-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                        whileHover={{ scale: 1.02, x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="text-2xl">{info.icon}</div>
                        <div>
                          <h4 className="font-semibold text-white mb-1">{info.title}</h4>
                          <p className="text-primary-400 font-medium mb-1">{info.content}</p>
                          <p className="text-gray-400 text-sm">{info.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Quick Response Promise */}
                <motion.div 
                  className="glass-card p-8 text-center"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-4xl mb-4">🚀</div>
                  <h4 className="text-xl font-semibold text-white mb-2">Quick Response Guarantee</h4>
                  <p className="text-gray-300">
                    We respond to all inquiries within 24 hours and provide free project consultations 
                    to help you understand the scope and requirements of your project.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact