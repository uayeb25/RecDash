import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, CheckCircle, Clock, Send, Users, Monitor, Smartphone, Tablet, RefreshCcw, Eye, Target, UserPlus, Award } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import './ExecutiveSummary.css'

const ExecutiveSummary = ({ filters }) => {
  const [kpis, setKpis] = useState({
    // Performance pipeline KPIs
    loadLibTime: { value: 0, loading: true },
    streamingTime: { value: 0, loading: true },
  analyzeTime: { value: 0, loading: true },
    // Other KPIs
    adoptionRate: { value: 0, trend: 0, loading: true },
    totalUsers: { value: 0, trend: 0, loading: true },
    averageScore: { value: 0, trend: 0, loading: true },
    retryRate: { value: 0, trend: 0, loading: true },
    reviewRate: { value: 0, trend: 0, loading: true },
    firstTimeUsers: { value: 0, trend: 0, loading: true },
    retentionRate: { value: 0, trend: 0, loading: true }
  ,exposedUsers: { value: 0, loading: true }
  })

  // Simulate API call to fetch KPI data
  useEffect(() => {
    const fetchKPIData = async () => {
      // Simulate API response delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock data based on filters
      // Generate adoption metrics first to keep internal consistency
      const exposedUsersVal = Math.floor(Math.random() * (7500 - 6000) + 6000) // potential / exposed users
      const adoptionRateVal = Math.random() * (85 - 65) + 65 // 65-85%
      const totalUsersVal = Math.round(exposedUsersVal * (adoptionRateVal / 100))

      const mockData = {
        // Performance pipeline mock values
        loadLibTime: { value: Math.random() * (1.4 - 0.6) + 0.6, loading: false },
        streamingTime: { value: Math.random() * (45 - 30) + 30, loading: false },
        analyzeTime: { value: Math.random() * (3.0 - 1.5) + 1.5, loading: false },
        // Engagement & adoption (consistent set)
        exposedUsers: { value: exposedUsersVal, loading: false },
        totalUsers: { value: totalUsersVal, trend: Math.random() * 8 - 4, loading: false },
        adoptionRate: { value: adoptionRateVal, trend: Math.random() * 10 - 5, loading: false },
        averageScore: { value: Math.random() * (92 - 82) + 82, trend: Math.random() * 8 - 4, loading: false },
        retryRate: { value: Math.random() * (25 - 10) + 10, trend: Math.random() * 6 - 3, loading: false },
        reviewRate: { value: Math.random() * (70 - 50) + 50, trend: Math.random() * 8 - 4, loading: false },
        firstTimeUsers: { value: Math.random() * (150 - 25) + 25, trend: Math.random() * 40 - 20, loading: false },
        retentionRate: { value: Math.random() * (68 - 52) + 52, trend: Math.random() * 6 - 3, loading: false }
      }

      setKpis(mockData)
    }

    fetchKPIData()
  }, [filters])

  return (
    <div className="executive-summary">
      <div className="content-wrapper">
        <div className="section-header">
          <h2>Recording Feature Summary</h2>
          <p>Impact of Start/Stop functionality on user experience</p>
        </div>
        
        {/* Performance Pipeline (First Row) */}
        <div className="metrics-grid">
          <div className="metric-card primary">
            <div className="metric-header">
              <h3>Library Load Time</h3>
              <p>Avg time to initialize recording libraries</p>
            </div>
            <div className="metric-value">
              {kpis.loadLibTime.loading ? '...' : `${kpis.loadLibTime.value.toFixed(2)}s`}
            </div>
          </div>
          <div className="metric-card primary">
            <div className="metric-header">
              <h3>Streaming Duration</h3>
              <p>Avg active user recording time</p>
            </div>
            <div className="metric-value">
              {kpis.streamingTime.loading ? '...' : `${kpis.streamingTime.value.toFixed(0)}s`}
            </div>
          </div>
      <div className="metric-card primary">
            <div className="metric-header">
              <h3>Analysis Processing</h3>
        <p>Avg backend processing time</p>
            </div>
            <div className="metric-value">
              {kpis.analyzeTime.loading ? '...' : `${kpis.analyzeTime.value.toFixed(2)}s`}
            </div>
          </div>
        </div>

        {/* Engagement (Unified) */}
        <div className="section-header">
          <h2>Engagement</h2>
          <p>Adoption and how students interact with the feature</p>
        </div>
        <div className="metrics-grid" style={{marginTop:'0.5rem'}}>
          <div className="metric-card accent-indigo">
            <div className="metric-header with-icon">
              <div className="metric-icon icon-indigo"><Users size={20} /></div>
              <div>
                <h3>Feature Engagement</h3>
                <p>Students actively using Record Yourself</p>
              </div>
            </div>
            <div className="metric-value small-stack">
              {kpis.totalUsers.loading || kpis.exposedUsers.loading ? '...' : `${kpis.totalUsers.value.toLocaleString()} of ${kpis.exposedUsers.value.toLocaleString()}`}
              <span className="subtext">{kpis.adoptionRate.loading ? '...' : `used feature (${kpis.adoptionRate.value.toFixed(1)}% adoption)`}</span>
            </div>
          </div>
          <div className="metric-card accent-green">
            <div className="metric-header with-icon">
              <div className="metric-icon icon-green"><TrendingUp size={20} /></div>
              <div>
                <h3>Retention Rate</h3>
                <p>Users returning for more recordings</p>
              </div>
            </div>
            <div className="metric-value">{kpis.retentionRate.loading ? '...' : `${kpis.retentionRate.value.toFixed(1)}%`}</div>
          </div>
          <div className="metric-card accent-amber">
            <div className="metric-header with-icon">
              <div className="metric-icon icon-amber"><Award size={20} /></div>
              <div>
                <h3>Average Score</h3>
                <p>Mean pronunciation accuracy score</p>
              </div>
            </div>
            <div className="metric-value">{kpis.averageScore.loading ? '...' : `${kpis.averageScore.value.toFixed(1)}%`}</div>
          </div>
          <div className="metric-card accent-purple">
            <div className="metric-header with-icon">
              <div className="metric-icon icon-purple"><RefreshCcw size={20} /></div>
              <div>
                <h3>Retry Rate</h3>
                <p>Students retrying after first attempt</p>
              </div>
            </div>
            <div className="metric-value">{kpis.retryRate.loading ? '...' : `${kpis.retryRate.value.toFixed(1)}%`}</div>
          </div>
          <div className="metric-card accent-teal">
            <div className="metric-header with-icon">
              <div className="metric-icon icon-teal"><Eye size={20} /></div>
              <div>
                <h3>Review Rate</h3>
                <p>Students reviewing before submitting</p>
              </div>
            </div>
            <div className="metric-value">{kpis.reviewRate.loading ? '...' : `${kpis.reviewRate.value.toFixed(1)}%`}</div>
          </div>
            <div className="metric-card accent-rose">
            <div className="metric-header with-icon">
              <div className="metric-icon icon-rose"><UserPlus size={20} /></div>
              <div>
                <h3>{`New Users (${new Date(filters.dateRange.start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(filters.dateRange.end).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})`}</h3>
                <p>First-time users</p>
              </div>
            </div>
            <div className="metric-value small-stack">
              {kpis.firstTimeUsers.loading ? '...' : Math.round(kpis.firstTimeUsers.value)}
            </div>
          </div>
        </div>

        {/* Channel Performance */}
        <div className="section-header">
          <h2>Performance by Channel</h2>
          <p>Recording feature performance across different platforms</p>
        </div>

        <div className="charts-container">
          {/* Processing Time Chart */}
                    {/* Average Score Chart */}
          <div className="chart-card">
            <h3>Average Score by Channel</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart 
                data={[
                  { name: 'Mobile App', score: 88 },
                  { name: 'Web Desktop', score: 85 },
                  { name: 'Mobile Web', score: 82 }
                ]}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  domain={[75, 95]}
                  label={{ value: 'Score (%)', angle: -90, position: 'insideLeft' }}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip formatter={(value) => [`${value}%`, 'Average Score']} />
                <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                  <Cell fill="#f59e0b" />
                  <Cell fill="#667eea" />
                  <Cell fill="#10b981" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recording Duration Chart */}
          <div className="chart-card">
            <h3>Recording Duration by Platform</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart 
                data={[
                  { name: 'Web Desktop', duration: 44 },
                  { name: 'Mobile App', duration: 43 },
                  { name: 'Mobile Web', duration: 39 }
                ]}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  domain={[35, 45]}
                  label={{ value: 'Seconds', angle: -90, position: 'insideLeft' }}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip formatter={(value) => [`${value}s`, 'Duration']} />
                <Bar dataKey="duration" radius={[4, 4, 0, 0]}>
                  <Cell fill="#667eea" />
                  <Cell fill="#f59e0b" />
                  <Cell fill="#10b981" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Usage Share Pie Chart */}
          <div className="chart-card">
            <h3>Usage Distribution</h3>
            <p className="chart-note">Counts unique users per channel (multi-channel users counted once per channel).</p>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Web Desktop', value: 45, fill: '#667eea' },
                    { name: 'Web Mobile', value: 35, fill: '#10b981' },
                    { name: 'Mobile App', value: 20, fill: '#f59e0b' }
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill="#667eea" />
                  <Cell fill="#10b981" />
                  <Cell fill="#f59e0b" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Retention Distribution */}
          <div className="chart-card">
            <h3>User Retention (Frequency)</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={[
                  { bucket: '1 Recording', users: 28 },
                  { bucket: '2-3 Recordings', users: 42 },
                  { bucket: '4-5 Recordings', users: 19 },
                  { bucket: '6+ Recordings', users: 11 }
                ]}
                margin={{ top: 5, right: 20, left: 10, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="bucket" angle={-30} textAnchor="end" height={70} tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 12 }} label={{ value: 'Users (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => [`${value}%`, 'Users']} />
                <Bar dataKey="users" radius={[4,4,0,0]} fill="#667eea" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Technology Breakdown */}
          <div className="chart-card">
            <h3>Technology Breakdown</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={[
                  { tech: 'Chrome', value: 55 },
                  { tech: 'Safari', value: 18 },
                  { tech: 'Firefox', value: 9 },
                  { tech: 'Edge', value: 6 },
                  { tech: 'Android App', value: 7 },
                  { tech: 'iOS App', value: 5 }
                ]}
                margin={{ top: 5, right: 20, left: 10, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="tech" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 11 }} />
                <YAxis label={{ value: 'Users (%)', angle: -90, position: 'insideLeft' }} tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value) => [`${value}%`, 'Users']} />
                <Bar dataKey="value" radius={[4,4,0,0]} fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExecutiveSummary
