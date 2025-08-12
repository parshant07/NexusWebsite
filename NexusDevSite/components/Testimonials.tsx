import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Testimonials = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStart Inc.',
      company: 'TechStart Inc.',
      content: 'Nexus App Developers transformed our business with their exceptional mobile app. The AI-powered features increased our user engagement by 300% and revenue by 150%. Truly outstanding work!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&auto=format&fit=crop&crop=face'
    },
    {
      name: 'Michael Chen',
      role: 'Founder, HealthTech Solutions',
      company: 'HealthTech Solutions',
      content: 'The healthcare management system built by Nexus exceeded all our expectations. Their attention to detail, security implementation, and user experience design is unmatched in the industry.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&auto=format&fit=crop&crop=face'
    },
    {
      name: 'Emily Rodriguez',
      role: 'CTO, FinanceFlow',
      company: 'FinanceFlow',
      content: 'Working with Nexus on our trading platform was a game-changer. Their expertise in real-time systems and security protocols gave us the competitive edge we needed in the fintech market.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&auto=format&fit=crop&crop=face'
    },
    {
      name: 'David Park',
      role: 'Product Manager, RetailGenius',
      company: 'RetailGenius',
      content: 'The e-commerce solution delivered by Nexus increased our online sales by 200%. Their AI recommendation engine and seamless user interface design created an exceptional shopping experience.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&auto=format&fit=crop&crop=face'
    },
    {
      name: 'Lisa Thompson',
      role: 'Director, FoodieConnect',
      company: 'FoodieConnect',
      content: 'Our food delivery app built by Nexus has been a tremendous success. The real-time tracking, intuitive design, and reliable performance have made us the top choice in our market.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&auto=format&fit=crop&crop=face'
    },
    {
      name: 'James Wilson',
      role: 'Founder, ConnectMatch',
      company: 'ConnectMatch',
      content: 'The dating app developed by Nexus revolutionized how people connect. Their AI matching algorithm and secure messaging system created a platform that users love and trust.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&auto=format&fit=crop&crop=face'
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

  const StarIcon = () => (
    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )

  return (
    <section id="testimonials" className="section-padding bg-gray-900">
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
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real Stories from Real Clients Who Trust Nexus
            </p>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="glass-card p-8 hover-lift"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {/* Rating Stars */}
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>

                {/* Testimonial Content */}
                <blockquote className="text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </blockquote>

                {/* Client Info */}
                <div className="flex items-center space-x-4">
                  <motion.div 
                    className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                    <p className="text-primary-400 text-sm font-medium">{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div 
            className="text-center mt-16"
            variants={itemVariants}
          >
            <div className="glass-card p-8 md:p-12 max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                Ready to Join Our Success Stories?
              </h3>
              <p className="text-xl text-gray-300 mb-8">
                Let's discuss how we can transform your business with innovative software solutions.
              </p>
              <motion.a
                href="#contact"
                className="btn btn-primary text-lg px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Project Today
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials