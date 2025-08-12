import type { NextApiRequest, NextApiResponse } from 'next'

// In-memory content store (in production, use a database)
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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  if (method === 'GET') {
    return res.status(200).json({
      success: true,
      data: contentStore
    })
  }

  if (method === 'PUT') {
    try {
      const { section, data } = req.body
      
      if (!section || !data) {
        return res.status(400).json({
          success: false,
          message: 'Section and data are required'
        })
      }

      if (section in contentStore) {
        (contentStore as any)[section] = data
        return res.status(200).json({
          success: true,
          message: `${section} updated successfully`,
          data: (contentStore as any)[section]
        })
      } else {
        return res.status(404).json({
          success: false,
          message: 'Content section not found'
        })
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to update content'
      })
    }
  }

  return res.status(405).json({
    success: false,
    message: 'Method not allowed'
  })
}