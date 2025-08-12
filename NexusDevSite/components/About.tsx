import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'


const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section id="about" className="section-padding bg-gray-900/50">
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
              About <span className="gradient-text">Nexus App Developers</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Pioneering Innovation Through Technology Excellence
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text Content */}
            <motion.div className="space-y-8" variants={itemVariants}>
              <div className="grid gap-6">
                <div className="glass-card p-8 hover-lift">
                  <h3 className="text-2xl font-semibold mb-4 text-primary-400">Our Mission</h3>
                  <p className="text-gray-300 leading-relaxed">
                    To empower businesses with cutting-edge software solutions that drive growth, 
                    enhance efficiency, and create meaningful digital experiences for users worldwide.
                  </p>
                </div>

                <div className="glass-card p-8 hover-lift">
                  <h3 className="text-2xl font-semibold mb-4 text-accent-green">Our Vision</h3>
                  <p className="text-gray-300 leading-relaxed">
                    To be the global leader in AI-driven software development, setting new standards 
                    for innovation, quality, and customer satisfaction in the digital transformation landscape.
                  </p>
                </div>

                <div className="glass-card p-8 hover-lift">
                  <h3 className="text-2xl font-semibold mb-4 text-accent-pink">Our Values</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start space-x-3">
                      <span className="text-primary-400 mt-1">✓</span>
                      <div>
                        <strong>Innovation:</strong> Constantly pushing boundaries with latest technologies
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-primary-400 mt-1">✓</span>
                      <div>
                        <strong>Quality:</strong> Delivering excellence in every line of code
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-primary-400 mt-1">✓</span>
                      <div>
                        <strong>Collaboration:</strong> Building strong partnerships with our clients
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-primary-400 mt-1">✓</span>
                      <div>
                        <strong>Agility:</strong> Adapting quickly to changing market demands
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Image and Badge */}
            <motion.div className="relative" variants={itemVariants}>
              <div className="relative">
                <motion.div
                  className="relative overflow-hidden rounded-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=500&auto=format&fit=crop"
                    alt="Software Development Team"
                    className="w-full h-auto object-cover"
                  />
                </motion.div>

                {/* Experience Badge */}
                <motion.div
                  className="absolute -bottom-6 -right-6 glass-card p-6 text-center"
                  initial={{ scale: 0, rotate: -45 }}
                  animate={inView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ delay: 1, duration: 0.5, type: 'spring' }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <div className="text-3xl font-bold text-primary-400 mb-1">5+</div>
                  <div className="text-sm text-gray-300 whitespace-nowrap">
                    Years of Excellence
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About