import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    })
  }

  const { password } = req.body

  if (!password) {
    return res.status(400).json({
      success: false,
      message: 'Password is required'
    })
  }

  if (password === 'nexus2025') {
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token: 'nexus2025-admin-token'
    })
  } else {
    return res.status(401).json({
      success: false,
      message: 'Invalid password'
    })
  }
}