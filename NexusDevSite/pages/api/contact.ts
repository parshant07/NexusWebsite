import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    })
  }

  const { name, email, company, projectType, budget, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and message are required'
    })
  }

  // In production, you would:
  // 1. Send email using a service like SendGrid, Nodemailer, or Resend
  // 2. Store the contact form submission in a database
  // 3. Send confirmation email to the user
  // 4. Notify your team about the new contact

  console.log('New contact form submission:', {
    name,
    email,
    company,
    projectType,
    budget,
    message,
    submittedAt: new Date().toISOString()
  })

  // Simulate processing delay
  setTimeout(() => {
    return res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: { name, email }
    })
  }, 1000)
}