// Authentication middleware for CMS admin panel

const adminAuth = (req, res, next) => {
  const { authorization } = req.headers
  
  // Simple token-based auth (in production, use proper JWT)
  if (authorization === 'Bearer nexus2025-admin-token') {
    next()
  } else {
    res.status(401).json({
      success: false,
      message: 'Unauthorized access'
    })
  }
}

module.exports = { adminAuth }