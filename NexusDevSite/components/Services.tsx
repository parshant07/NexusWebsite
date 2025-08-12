import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Services = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const services = [
    {
      icon: '📱',
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications built with cutting-edge technologies for iOS and Android.',
      features: ['iOS & Android Development', 'React Native & Flutter', 'App Store Optimization', 'Maintenance & Support'],
      color: 'from-primary-500 to-primary-600'
    },
    {
      icon: '🌐',
      title: 'Web Development',
      description: 'Modern, responsive web applications using the latest frameworks and technologies.',
      features: ['React & Next.js', 'Node.js & Express', 'Progressive Web Apps', 'E-commerce Solutions'],
      color: 'from-accent-green to-green-600'
    },
    {
      icon: '🤖',
      title: 'AI & Machine Learning',
      description: 'Intelligent solutions powered by artificial intelligence and machine learning algorithms.',
      features: ['Custom AI Models', 'Natural Language Processing', 'Computer Vision', 'Predictive Analytics'],
      color: 'from-accent-pink to-pink-600'
    },
    {
      icon: '☁️',
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and deployment solutions for modern applications.',
      features: ['AWS & Azure', 'Docker & Kubernetes', 'CI/CD Pipelines', 'Microservices Architecture'],
      color: 'from-accent-cyan to-blue-600'
    },
    {
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive user interfaces designed with user experience as the top priority.',
      features: ['User Research', 'Wireframing & Prototyping', 'Design Systems', 'Usability Testing'],
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: '🔧',
      title: 'DevOps & Consulting',
      description: 'Technical consulting and DevOps solutions to optimize your development workflow.',
      features: ['Infrastructure as Code', 'Monitoring & Analytics', 'Security Best Practices', 'Team Training'],
      color: 'from-yellow-500 to-orange-600'
    },
  ]

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

  return (
    <section id="services" className="section-padding bg-gray-900">
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
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive Solutions for Your Digital Journey
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="service-card"
                variants={itemVariants}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Service Icon */}
                <motion.div 
                  className="service-icon"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-4xl">{service.icon}</span>
                </motion.div>

                {/* Service Content */}
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-primary-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2 text-sm text-gray-400">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center justify-center space-x-2">
                        <span className="text-primary-400">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Learn More Button */}
                  <motion.button
                    className={`mt-6 px-6 py-2 bg-gradient-to-r ${service.color} text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Services