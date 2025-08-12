import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const faqs = [
    {
      question: 'How long does it take to develop a custom software solution?',
      answer: 'Project timelines vary based on complexity and requirements. Simple mobile apps typically take 3-4 months, while complex enterprise solutions may take 6-12 months. We provide detailed timelines during our initial consultation and maintain transparent communication throughout the development process.'
    },
    {
      question: 'What technologies and frameworks do you specialize in?',
      answer: 'We specialize in modern technologies including React, React Native, Next.js, Node.js, Python, AI/ML frameworks, cloud platforms (AWS, Azure), and database systems (PostgreSQL, MongoDB). Our team stays current with the latest industry trends and continuously expands our technical expertise.'
    },
    {
      question: 'Do you provide ongoing support and maintenance after project completion?',
      answer: 'Yes, we offer comprehensive post-launch support including bug fixes, security updates, performance optimization, and feature enhancements. Our maintenance packages are flexible and can be customized based on your specific needs and budget requirements.'
    },
    {
      question: 'How do you ensure the security and privacy of our data?',
      answer: 'We implement industry-standard security protocols including data encryption, secure authentication, regular security audits, and compliance with GDPR, HIPAA, and other relevant regulations. All our team members sign NDAs, and we follow strict data handling procedures.'
    },
    {
      question: 'Can you help migrate our existing legacy systems to modern platforms?',
      answer: 'Absolutely! We specialize in legacy system modernization and migration. Our approach includes thorough analysis of existing systems, gradual migration strategies, data integrity preservation, minimal downtime deployment, and comprehensive testing to ensure smooth transitions.'
    },
    {
      question: 'What is your development process and how do you ensure quality?',
      answer: 'We follow an agile development methodology with regular sprints, continuous integration, automated testing, code reviews, and quality assurance processes. Clients receive regular updates, demos, and can provide feedback throughout the development cycle to ensure the final product meets their expectations.'
    },
    {
      question: 'Do you work with startups and small businesses or only large enterprises?',
      answer: 'We work with businesses of all sizes, from startups to large enterprises. Our flexible engagement models and scalable solutions are designed to meet the unique needs and budgets of different business stages. We offer special packages for startups and MVP development.'
    },
    {
      question: 'How do you handle project communication and updates?',
      answer: 'We maintain transparent communication through dedicated project managers, regular status meetings, shared project dashboards, and your preferred communication channels (Slack, Microsoft Teams, email). You\'ll receive weekly progress reports and have direct access to our development team when needed.'
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section id="faq" className="section-padding bg-gray-900/50">
      <div className="max-w-4xl mx-auto container-padding">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get answers to common questions about our development process, services, and approach
            </p>
          </motion.div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="glass-card overflow-hidden"
                variants={itemVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
              >
                <motion.button
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-200"
                  onClick={() => toggleFAQ(index)}
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  whileTap={{ scale: 0.995 }}
                >
                  <h3 className="text-lg font-semibold text-white pr-8">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <svg 
                      className="w-6 h-6 text-primary-400" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M19 9l-7 7-7-7" 
                      />
                    </svg>
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6">
                        <motion.p 
                          className="text-gray-300 leading-relaxed"
                          initial={{ y: -10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          {faq.answer}
                        </motion.p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div 
            className="text-center mt-12"
            variants={itemVariants}
          >
            <div className="glass-card p-8">
              <h3 className="text-xl font-semibold mb-4 text-white">
                Still have questions?
              </h3>
              <p className="text-gray-300 mb-6">
                Our team is here to help you understand how we can bring your vision to life.
              </p>
              <motion.a
                href="#contact"
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Our Team
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQ