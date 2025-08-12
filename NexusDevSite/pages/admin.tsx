import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts'
import { 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Globe, 
  Mail, 
  Phone, 
  Send, 
  BarChart3, 
  PieChart as PieChartIcon, 
  Activity,
  Eye,
  MousePointer,
  Calendar,
  Clock,
  User,
  Settings,
  LogOut,
  Search,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react'

interface Content {
  heroTitle: string
  heroSubtitle: string
  aboutText: string
  servicesTitle: string
  services: Array<{
    title: string
    description: string
    icon: string
  }>
}

interface Message {
  id: string
  name: string
  email: string
  message: string
  timestamp: string
  status: 'new' | 'read' | 'replied'
}

interface AnalyticsData {
  visitors: Array<{ date: string; count: number }>
  conversions: Array<{ month: string; leads: number; conversions: number }>
  traffic: Array<{ source: string; visitors: number; color: string }>
  engagement: Array<{ page: string; views: number; time: number }>
}

const mockMessages: Message[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@techstartup.com',
    message: 'Hi, we need a mobile app for our e-commerce platform. Can you help us with React Native development?',
    timestamp: '2025-01-10T14:30:00Z',
    status: 'new'
  },
  {
    id: '2',
    name: 'Mike Chen',
    email: 'mike@digitalagency.com',
    message: 'Looking for AI integration services for our client projects. What\'s your experience with OpenAI APIs?',
    timestamp: '2025-01-10T12:15:00Z',
    status: 'read'
  },
  {
    id: '3',
    name: 'Lisa Rodriguez',
    email: 'lisa@healthtech.io',
    message: 'We need a HIPAA-compliant web application for patient management. Can you provide a quote?',
    timestamp: '2025-01-10T10:45:00Z',
    status: 'replied'
  }
]

const mockAnalytics: AnalyticsData = {
  visitors: [
    { date: '2025-01-04', count: 245 },
    { date: '2025-01-05', count: 312 },
    { date: '2025-01-06', count: 289 },
    { date: '2025-01-07', count: 356 },
    { date: '2025-01-08', count: 423 },
    { date: '2025-01-09', count: 489 },
    { date: '2025-01-10', count: 567 }
  ],
  conversions: [
    { month: 'Oct', leads: 45, conversions: 12 },
    { month: 'Nov', leads: 67, conversions: 18 },
    { month: 'Dec', leads: 89, conversions: 24 },
    { month: 'Jan', leads: 123, conversions: 34 }
  ],
  traffic: [
    { source: 'Organic Search', visitors: 2340, color: '#667eea' },
    { source: 'Direct', visitors: 1890, color: '#4facfe' },
    { source: 'Social Media', visitors: 1245, color: '#43e97b' },
    { source: 'Referral', visitors: 890, color: '#fa709a' },
    { source: 'Email', visitors: 567, color: '#f093fb' }
  ],
  engagement: [
    { page: 'Homepage', views: 3420, time: 245 },
    { page: 'Services', views: 2180, time: 312 },
    { page: 'Portfolio', views: 1890, time: 189 },
    { page: 'About', views: 1567, time: 198 },
    { page: 'Contact', views: 1234, time: 156 }
  ]
}

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [content, setContent] = useState<Content | null>(null)
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [analytics] = useState<AnalyticsData>(mockAnalytics)
  const [activeTab, setActiveTab] = useState<'dashboard' | 'content' | 'messages' | 'analytics'>('dashboard')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [replyText, setReplyText] = useState('')

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content')
      const data = await response.json()
      setContent(data)
    } catch (error) {
      console.error('Error fetching content:', error)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      
      if (response.ok) {
        setIsAuthenticated(true)
        setPassword('')
      } else {
        setMessage('Invalid password')
      }
    } catch (error) {
      setMessage('Login failed')
    }
  }

  const handleContentUpdate = async (updatedContent: Content) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedContent)
      })
      
      if (response.ok) {
        setContent(updatedContent)
        setMessage('Content updated successfully!')
        setTimeout(() => setMessage(''), 3000)
      }
    } catch (error) {
      setMessage('Update failed')
    }
    setIsLoading(false)
  }

  const handleReply = (messageId: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, status: 'replied' as const }
          : msg
      )
    )
    setSelectedMessage(null)
    setReplyText('')
    setMessage('Reply sent successfully!')
    setTimeout(() => setMessage(''), 3000)
  }

  const markAsRead = (messageId: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId && msg.status === 'new'
          ? { ...msg, status: 'read' as const }
          : msg
      )
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
        </div>

        <motion.div
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 w-full max-w-md shadow-2xl relative z-10"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Header Section */}
          <div className="text-center mb-10">
            <motion.div
              className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            >
              <Settings className="w-10 h-10 text-white" />
            </motion.div>
            <motion.h1 
              className="text-3xl font-bold text-white mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Admin Portal
            </motion.h1>
            <motion.p 
              className="text-gray-400 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Secure access to Nexus dashboard
            </motion.p>
          </div>
          
          <motion.form 
            onSubmit={handleLogin} 
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Settings className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 transition-all duration-300 text-lg"
                required
              />
            </div>
            
            <motion.button
              type="submit"
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] focus:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center justify-center space-x-3">
                <span>Access Dashboard</span>
                <motion.div
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  →
                </motion.div>
              </span>
            </motion.button>
          </motion.form>

          {message && (
            <motion.div
              className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                <span>{message}</span>
              </div>
            </motion.div>
          )}

          {/* Footer */}
          <motion.div 
            className="mt-8 pt-6 border-t border-white/10 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <p className="text-gray-500 text-sm">
              Nexus App Developers © 2025
            </p>
            <div className="flex items-center justify-center space-x-2 mt-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-xs">System Online</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              transition={{
                duration: Math.random() * 10 + 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-lg">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Nexus Admin</h1>
                <p className="text-gray-400 text-sm">Content & Analytics Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <RefreshCw className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-600/30 transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-6 mt-6">
            {[
              { id: 'dashboard' as const, label: 'Dashboard', icon: BarChart3 },
              { id: 'analytics' as const, label: 'Analytics', icon: TrendingUp },
              { id: 'messages' as const, label: 'Messages', icon: MessageSquare },
              { id: 'content' as const, label: 'Content', icon: Settings }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600/30 text-blue-300 border border-blue-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.id === 'messages' && messages.filter(m => m.status === 'new').length > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {messages.filter(m => m.status === 'new').length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {message && (
          <motion.div
            className="mb-6 p-4 bg-green-600/20 border border-green-500/30 rounded-lg text-green-300 backdrop-blur-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {message}
          </motion.div>
        )}

        {activeTab === 'dashboard' && <DashboardView analytics={analytics} messages={messages} />}
        {activeTab === 'analytics' && <AnalyticsView analytics={analytics} />}
        {activeTab === 'messages' && (
          <MessagesView 
            messages={messages} 
            onReply={handleReply}
            onMarkAsRead={markAsRead}
            selectedMessage={selectedMessage}
            setSelectedMessage={setSelectedMessage}
            replyText={replyText}
            setReplyText={setReplyText}
          />
        )}
        {activeTab === 'content' && content && (
          <ContentEditor
            content={content}
            onUpdate={handleContentUpdate}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  )
}

// Dashboard View Component
function DashboardView({ analytics, messages }: { analytics: AnalyticsData; messages: Message[] }) {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Visitors', value: '12.4K', change: '+12%', icon: Users, color: 'blue' },
          { title: 'New Messages', value: messages.filter(m => m.status === 'new').length.toString(), change: '+3', icon: MessageSquare, color: 'green' },
          { title: 'Conversion Rate', value: '24.8%', change: '+5%', icon: TrendingUp, color: 'purple' },
          { title: 'Page Views', value: '45.2K', change: '+18%', icon: Eye, color: 'orange' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                <p className="text-green-400 text-sm mt-1">{stat.change}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                stat.color === 'blue' ? 'bg-blue-500/20' :
                stat.color === 'green' ? 'bg-green-500/20' :
                stat.color === 'purple' ? 'bg-purple-500/20' :
                'bg-orange-500/20'
              }`}>
                <stat.icon className={`w-6 h-6 ${
                  stat.color === 'blue' ? 'text-blue-400' :
                  stat.color === 'green' ? 'text-green-400' :
                  stat.color === 'purple' ? 'text-purple-400' :
                  'text-orange-400'
                }`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visitors Chart */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Weekly Visitors</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analytics.visitors}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(31, 41, 55, 0.8)', 
                  border: '1px solid rgba(75, 85, 99, 0.3)',
                  borderRadius: '8px'
                }}
              />
              <Area type="monotone" dataKey="count" stroke="#667eea" fill="#667eea" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Traffic Sources</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analytics.traffic}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="visitors"
              >
                {analytics.traffic.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(31, 41, 55, 0.8)', 
                  border: '1px solid rgba(75, 85, 99, 0.3)',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Messages */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Recent Messages</h3>
        <div className="space-y-4">
          {messages.slice(0, 3).map((msg) => (
            <div key={msg.id} className="flex items-start space-x-4 p-4 bg-white/5 rounded-lg">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-white">{msg.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    msg.status === 'new' ? 'bg-red-500/20 text-red-400' :
                    msg.status === 'replied' ? 'bg-green-500/20 text-green-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {msg.status}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">{msg.email}</p>
                <p className="text-gray-300 mt-2">{msg.message.substring(0, 100)}...</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Analytics View Component
function AnalyticsView({ analytics }: { analytics: AnalyticsData }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Analytics Overview</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600/20 border border-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-all">
          <Download className="w-4 h-4" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Conversion Chart */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Leads vs Conversions</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={analytics.conversions}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(31, 41, 55, 0.8)', 
                border: '1px solid rgba(75, 85, 99, 0.3)',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="leads" fill="#667eea" />
            <Bar dataKey="conversions" fill="#43e97b" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Engagement Metrics */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Page Engagement</h3>
        <div className="space-y-4">
          {analytics.engagement.map((page, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div>
                <h4 className="font-medium text-white">{page.page}</h4>
                <p className="text-gray-400 text-sm">{page.views} views</p>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">{page.time}s</p>
                <p className="text-gray-400 text-sm">avg. time</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Messages View Component
function MessagesView({ 
  messages, 
  onReply, 
  onMarkAsRead, 
  selectedMessage, 
  setSelectedMessage, 
  replyText, 
  setReplyText 
}: {
  messages: Message[]
  onReply: (id: string) => void
  onMarkAsRead: (id: string) => void
  selectedMessage: Message | null
  setSelectedMessage: (message: Message | null) => void
  replyText: string
  setReplyText: (text: string) => void
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Messages</h2>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 space-y-4">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              className={`p-4 rounded-lg cursor-pointer transition-all ${
                selectedMessage?.id === msg.id 
                  ? 'bg-blue-600/20 border border-blue-500/30' 
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              }`}
              onClick={() => {
                setSelectedMessage(msg)
                if (msg.status === 'new') {
                  onMarkAsRead(msg.id)
                }
              }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-white">{msg.name}</h4>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  msg.status === 'new' ? 'bg-red-500/20 text-red-400' :
                  msg.status === 'replied' ? 'bg-green-500/20 text-green-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {msg.status}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-2">{msg.email}</p>
              <p className="text-gray-300 text-sm line-clamp-2">{msg.message}</p>
              <p className="text-gray-500 text-xs mt-2">
                {new Date(msg.timestamp).toLocaleDateString()}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Message Detail & Reply */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{selectedMessage.name}</h3>
                  <p className="text-gray-400">{selectedMessage.email}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400 text-sm">
                    {new Date(selectedMessage.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4 mb-6">
                <p className="text-gray-300">{selectedMessage.message}</p>
              </div>

              {/* Reply Form */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-white">Reply</h4>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply..."
                  rows={6}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex space-x-4">
                  <button
                    onClick={() => onReply(selectedMessage.id)}
                    className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Reply</span>
                  </button>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">Select a message</h3>
              <p className="text-gray-400">Choose a message from the list to view details and reply</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Content Editor Component
function ContentEditor({ content, onUpdate, isLoading }: {
  content: Content
  onUpdate: (content: Content) => void
  isLoading: boolean
}) {
  const [editedContent, setEditedContent] = useState(content)

  const handleInputChange = (field: keyof Content, value: any) => {
    setEditedContent(prev => ({ ...prev, [field]: value }))
  }

  const handleServiceChange = (index: number, field: string, value: string) => {
    const newServices = [...editedContent.services]
    newServices[index] = { ...newServices[index], [field]: value }
    setEditedContent(prev => ({ ...prev, services: newServices }))
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Content Management</h2>
      
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2 font-medium">Hero Title</label>
            <input
              type="text"
              value={editedContent.heroTitle}
              onChange={(e) => handleInputChange('heroTitle', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2 font-medium">Hero Subtitle</label>
            <textarea
              value={editedContent.heroSubtitle}
              onChange={(e) => handleInputChange('heroSubtitle', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2 font-medium">About Text</label>
            <textarea
              value={editedContent.aboutText}
              onChange={(e) => handleInputChange('aboutText', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Services</h3>
            {editedContent.services.map((service, index) => (
              <div key={index} className="bg-white/5 p-6 rounded-lg mb-4 border border-white/10">
                <h4 className="text-white font-medium mb-4">Service {index + 1}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-400 mb-1 text-sm">Title</label>
                    <input
                      type="text"
                      placeholder="Service Title"
                      value={service.title}
                      onChange={(e) => handleServiceChange(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1 text-sm">Icon</label>
                    <input
                      type="text"
                      placeholder="Icon Name"
                      value={service.icon}
                      onChange={(e) => handleServiceChange(index, 'icon', e.target.value)}
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white"
                    />
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-gray-400 mb-1 text-sm">Description</label>
                    <textarea
                      placeholder="Service Description"
                      value={service.description}
                      onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded text-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => onUpdate(editedContent)}
            disabled={isLoading}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all font-medium shadow-lg"
          >
            {isLoading ? 'Updating...' : 'Update Content'}
          </button>
        </div>
      </div>
    </div>
  )
}