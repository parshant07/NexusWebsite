import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'


const Showcase = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const projects = [
    {
      title: 'E-commerce Mobile App',
      description: 'A feature-rich shopping application with AI-powered recommendations and seamless payment integration.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&auto=format&fit=crop',
      tags: ['React Native', 'AI/ML', 'Payment Gateway'],
      category: 'Mobile Development'
    },
    {
      title: 'Healthcare Management System',
      description: 'Comprehensive healthcare platform with patient management, telemedicine, and data analytics.',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&auto=format&fit=crop',
      tags: ['Web App', 'Cloud', 'Data Analytics'],
      category: 'Healthcare'
    },
    {
      title: 'Financial Trading Platform',
      description: 'Real-time trading platform with advanced charting, risk management, and automated trading features.',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&auto=format&fit=crop',
      tags: ['Fintech', 'Real-time', 'Security'],
      category: 'Finance'
    },
    {
      title: 'AI-Powered Analytics Dashboard',
      description: 'Business intelligence platform with machine learning insights and predictive analytics.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&auto=format&fit=crop',
      tags: ['AI/ML', 'Analytics', 'Dashboard'],
      category: 'Enterprise'
    },
    {
      title: 'Food Delivery App',
      description: 'Fast and intuitive food delivery platform with real-time tracking and smart recommendations.',
      image: 'https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?w=600&h=400&auto=format&fit=crop',
      tags: ['React Native', 'Real-time Tracking', 'Payment Integration'],
      category: 'Consumer'
    },
    {
      title: 'Dating App',
      description: 'Modern dating platform with AI-powered matching algorithms and secure messaging.',
      image: 'https://images.unsplash.com/photo-1522543558187-768b6df7c25c?w=600&h=400&auto=format&fit=crop',
      tags: ['React Native', 'AI Matching', 'Social Features'],
      category: 'Social'
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
    <section id="showcase" className="section-padding bg-gray-900/50">
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
              Our <span className="gradient-text">Work</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Showcasing Innovation Through Real-World Solutions
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="showcase-card"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  rotateX: 5,
                  rotateY: 5,
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Project Image */}
                <div className="showcase-image h-48 relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary-500/80 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-primary-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 text-primary-300 text-xs font-medium rounded-full hover:bg-white/20 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* View Project Button */}
                  <motion.button
                    className="w-full btn btn-secondary text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Project Details
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Projects CTA */}
          <motion.div 
            className="text-center mt-12"
            variants={itemVariants}
          >
            <motion.button
              className="btn btn-primary text-lg px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Projects
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Showcase