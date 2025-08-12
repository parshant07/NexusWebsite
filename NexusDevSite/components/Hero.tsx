import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Hero = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  const floatingCards = [
    { icon: '📱', title: 'Mobile Apps', delay: 0.5 },
    { icon: '🤖', title: 'AI Solutions', delay: 0.7 },
    { icon: '🌐', title: 'Web Development', delay: 0.9 },
    { icon: '⚡', title: 'Digital Transformation', delay: 1.1 },
  ]

  return (
    <section id="home" className="min-h-screen flex items-center section-padding bg-gradient-to-br from-gray-900 via-gray-900 to-primary-900/20">
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div
          ref={ref}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              variants={itemVariants}
            >
              Engineering Digital{' '}
              <span className="gradient-text">Excellence</span>{' '}
              with AI-Native Solutions
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-300 mb-8 leading-relaxed"
              variants={itemVariants}
            >
              We are a leading software development company transforming businesses through 
              innovative AI-driven solutions, custom software development, and cutting-edge 
              mobile applications.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              variants={itemVariants}
            >
              <motion.a
                href="#contact"
                className="btn btn-primary text-lg px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Project
              </motion.a>
              <motion.a
                href="#showcase"
                className="btn btn-secondary text-lg px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Our Work
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
              variants={itemVariants}
            >
              {[
                { number: '100+', label: 'Projects Delivered' },
                { number: '50+', label: 'Happy Clients' },
                { number: '5+', label: 'Years Experience' },
                { number: '24/7', label: 'Support' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-2xl lg:text-3xl font-bold text-primary-400 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Floating Cards Visual */}
          <div className="relative lg:h-96">
            <div className="relative w-full h-full flex items-center justify-center">
              {floatingCards.map((card, index) => (
                <motion.div
                  key={index}
                  className="absolute glass-card p-6 hover-glow"
                  initial={{ 
                    opacity: 0, 
                    scale: 0.8,
                    x: Math.random() * 400 - 200,
                    y: Math.random() * 400 - 200,
                  }}
                  animate={inView ? {
                    opacity: 1,
                    scale: 1,
                    x: [
                      Math.cos(index * (Math.PI / 2)) * 120,
                      Math.cos(index * (Math.PI / 2)) * 140,
                      Math.cos(index * (Math.PI / 2)) * 120,
                    ],
                    y: [
                      Math.sin(index * (Math.PI / 2)) * 120,
                      Math.sin(index * (Math.PI / 2)) * 100,
                      Math.sin(index * (Math.PI / 2)) * 120,
                    ],
                  } : {}}
                  transition={{
                    duration: 2,
                    delay: card.delay,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">{card.icon}</div>
                    <div className="text-sm font-medium text-white whitespace-nowrap">
                      {card.title}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero