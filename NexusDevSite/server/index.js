const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}))
app.use(compression())
app.use(cors({
  origin: ['http://localhost:5000', 'http://127.0.0.1:5000', 'https://localhost:5000'],
  credentials: true
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Content storage (in-memory for demo)
let contentStore = {
  hero: {
    title: "Engineering Digital Excellence with AI-Native Solutions",
    subtitle: "We are a leading software development company transforming businesses through innovative AI-driven solutions, custom software development, and cutting-edge mobile applications."
  },
  services: [
    {
      id: 1,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications built with cutting-edge technologies for iOS and Android.",
      icon: "📱"
    },
    {
      id: 2,
      title: "Web Development", 
      description: "Modern, responsive web applications using the latest frameworks and technologies.",
      icon: "🌐"
    },
    {
      id: 3,
      title: "AI & Machine Learning",
      description: "Intelligent solutions powered by artificial intelligence and machine learning algorithms.",
      icon: "🤖"
    }
  ],
  projects: [
    {
      id: 1,
      title: "E-commerce Mobile App",
      description: "A feature-rich shopping application with AI-powered recommendations.",
      category: "Mobile Development"
    },
    {
      id: 2,
      title: "Healthcare Management System",
      description: "Comprehensive healthcare platform with patient management and telemedicine.",
      category: "Healthcare"
    }
  ],
  testimonials: [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CTO",
      company: "TechCorp",
      content: "Nexus delivered an outstanding mobile app that exceeded our expectations."
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Founder",
      company: "StartupX",
      content: "Their AI solutions transformed our business operations completely."
    }
  ],
  faqs: [
    {
      id: 1,
      question: "What technologies do you specialize in?",
      answer: "We specialize in React, Next.js, Node.js, React Native, Flutter, and various AI/ML frameworks."
    },
    {
      id: 2,
      question: "How long does a typical project take?",
      answer: "Project timelines vary based on complexity, typically ranging from 4-16 weeks for most applications."
    }
  ]
}

// API Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' })
})

// Authentication
app.post('/api/auth/login', (req, res) => {
  try {
    const { password } = req.body
    
    if (password === 'nexus2025') {
      res.json({
        success: true,
        message: 'Login successful',
        token: 'nexus2025-admin-token'
      })
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid password'
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Authentication error'
    })
  }
})

// Get all content
app.get('/api/content', (req, res) => {
  try {
    res.json({
      success: true,
      data: contentStore
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve content'
    })
  }
})

// Update content section
app.put('/api/content/:sectionName', (req, res) => {
  try {
    const sectionName = req.params.sectionName
    const { data } = req.body
    
    if (!contentStore.hasOwnProperty(sectionName)) {
      return res.status(404).json({
        success: false,
        message: 'Content section not found'
      })
    }
    
    contentStore[sectionName] = data
    
    res.json({
      success: true,
      message: 'Content updated successfully',
      data: contentStore[sectionName]
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update content'
    })
  }
})

// Contact form submission
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, company, projectType, budget, message } = req.body
    
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
      })
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      })
    }
    
    console.log('Contact form submission:', {
      name, email, company, projectType, budget, message,
      timestamp: new Date().toISOString()
    })
    
    res.json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form'
    })
  }
})

// Newsletter subscription
app.post('/api/newsletter', (req, res) => {
  try {
    const { email } = req.body
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      })
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      })
    }
    
    console.log('Newsletter subscription:', {
      email,
      timestamp: new Date().toISOString()
    })
    
    res.json({
      success: true,
      message: 'Successfully subscribed to newsletter!'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to subscribe to newsletter'
    })
  }
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`)
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api`)
  console.log(`🔐 Admin login: POST /api/auth/login`)
  console.log(`📄 Content management: GET/PUT /api/content`)
})

module.exports = app