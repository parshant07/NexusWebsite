const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 3001

// Basic middleware
app.use(cors({
  origin: 'http://localhost:5000',
  credentials: true
}))
app.use(express.json())

// In-memory content storage
const content = {
  hero: { title: "Engineering Digital Excellence", subtitle: "AI-Native Solutions for Modern Business" },
  services: [
    { id: 1, title: "Mobile Development", description: "iOS & Android Apps" },
    { id: 2, title: "Web Development", description: "Modern Web Applications" },
    { id: 3, title: "AI Solutions", description: "Machine Learning & AI" }
  ],
  projects: [
    { id: 1, title: "E-commerce App", description: "Shopping platform" },
    { id: 2, title: "Healthcare System", description: "Patient management" }
  ],
  testimonials: [
    { id: 1, name: "Sarah Johnson", role: "CTO", company: "TechCorp", content: "Excellent work!" },
    { id: 2, name: "Michael Chen", role: "Founder", company: "StartupX", content: "Amazing results!" }
  ],
  faqs: [
    { id: 1, question: "What do you specialize in?", answer: "React, AI, mobile apps" },
    { id: 2, question: "How long are projects?", answer: "4-16 weeks typically" }
  ]
}

// Routes
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server running' })
})

app.post('/api/auth/login', (req, res) => {
  const { password } = req.body
  if (password === 'nexus2025') {
    res.json({ success: true, token: 'admin-token' })
  } else {
    res.status(401).json({ success: false, message: 'Invalid password' })
  }
})

app.get('/api/content', (req, res) => {
  res.json({ success: true, data: content })
})

app.put('/api/content/hero', (req, res) => {
  content.hero = req.body.data
  res.json({ success: true, data: content.hero })
})

app.put('/api/content/services', (req, res) => {
  content.services = req.body.data
  res.json({ success: true, data: content.services })
})

app.put('/api/content/projects', (req, res) => {
  content.projects = req.body.data
  res.json({ success: true, data: content.projects })
})

app.put('/api/content/testimonials', (req, res) => {
  content.testimonials = req.body.data
  res.json({ success: true, data: content.testimonials })
})

app.put('/api/content/faqs', (req, res) => {
  content.faqs = req.body.data
  res.json({ success: true, data: content.faqs })
})

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Missing fields' })
  }
  console.log('Contact:', { name, email, message })
  res.json({ success: true, message: 'Message received!' })
})

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`)
})

module.exports = app