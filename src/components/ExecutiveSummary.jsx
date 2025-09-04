import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, CheckCircle, Clock, Send, Users, Monitor, Smartphone, Tablet } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import './ExecutiveSummary.css'

const ExecutiveSummary = ({ filters }) => {
  const [kpis, setKpis] = useState({
    adoptionRate: { value: 0, trend: 0, loading: true },
  totalUsers: { value: 0, trend: 0, loading: true },
    recordingDuration: { value: 0, trend: 0, loading: true },
    avgProcessingTime: { value: 0, trend: 0, loading: true },
    averageScore: { value: 0, trend: 0, loading: true },
  analysisTimeBefore: { value: 0, loading: true },
    completionRate: { value: 0, trend: 0, loading: true },
    retryRate: { value: 0, trend: 0, loading: true },
    reviewRate: { value: 0, trend: 0, loading: true },
  firstTimeUsers: { value: 0, trend: 0, loading: true },
  retentionRate: { value: 0, trend: 0, loading: true }
  })

  // Simulate API call to fetch KPI data
  useEffect(() => {
    const fetchKPIData = async () => {
      // Simulate API response delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock data based on filters
      const mockData = {
        adoptionRate: {
          value: Math.random() * (90 - 75) + 75, // 75-90%
          trend: Math.random() * 10 - 5, // -5% to +5%
          loading: false
        },
        totalUsers: {
          value: Math.floor(Math.random() * (3500 - 2400) + 2400), // absolute users
          trend: Math.random() * 8 - 4,
          loading: false
        },
        recordingDuration: {
          value: Math.random() * (45 - 30) + 30, // 30-45 seconds
          trend: Math.random() * 10 - 5, // -5s to +5s
          loading: false
        },
        avgProcessingTime: {
          value: Math.random() * (3.0 - 1.5) + 1.5, // 1.5-3.0 seconds
          trend: Math.random() * 1 - 0.5, // -0.5s to +0.5s
          loading: false
        },
        analysisTimeBefore: {
          value: Math.random() * (4.2 - 3.4) + 3.4, // slower before feature
          loading: false
        },
        averageScore: {
          value: Math.random() * (92 - 82) + 82, // 82-92%
          trend: Math.random() * 8 - 4, // -4% to +4%
          loading: false
        },
        completionRate: {
          value: Math.random() * (95 - 80) + 80, // 80-95%
          trend: Math.random() * 8 - 4, // -4% to +4%
          loading: false
        },
        retryRate: {
          value: Math.random() * (25 - 10) + 10, // 10-25%
          trend: Math.random() * 6 - 3, // -3% to +3%
          loading: false
        },
        reviewRate: {
          value: Math.random() * (70 - 50) + 50, // 50-70%
          trend: Math.random() * 8 - 4, // -4% to +4%
          loading: false
        },
        firstTimeUsers: {
          value: Math.random() * (150 - 25) + 25, // 25-150 new users
          trend: Math.random() * 40 - 20, // -20 to +20 users
          loading: false
        },
        retentionRate: {
          value: Math.random() * (68 - 52) + 52, // 52-68%
          trend: Math.random() * 6 - 3,
          loading: false
        }
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
        
        {/* Key Metrics Grid */}
        <div className="metrics-grid">
          <div className="metric-card primary">
            <div className="metric-header">
              <h3>Adoption Rate</h3>
              <p>Students using Start/Stop button per session</p>
            </div>
            <div className="metric-value">
              {kpis.adoptionRate.loading ? '...' : `${kpis.adoptionRate.value.toFixed(1)}%`}
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <h3>Total Users</h3>
              <p>Unique students who used the feature</p>
            </div>
            <div className="metric-value">
              {kpis.totalUsers.loading ? '...' : kpis.totalUsers.value.toLocaleString()}
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <h3>Recording Duration</h3>
              <p>Average time from play to stop button</p>
            </div>
            <div className="metric-value">
              {kpis.recordingDuration.loading ? '...' : `${Math.floor(kpis.recordingDuration.value / 60)}:${String(Math.floor(kpis.recordingDuration.value % 60)).padStart(2, '0')}`}
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <h3>Analysis Time</h3>
              <p>Current vs baseline before Start/Stop</p>
            </div>
            <div className="metric-value">
              {kpis.avgProcessingTime.loading ? '...' : `${kpis.avgProcessingTime.value.toFixed(1)}s`}
            </div>
            {!kpis.analysisTimeBefore.loading && !kpis.avgProcessingTime.loading && (
              <div className="metric-trend status-indicator" style={{marginTop:'0.5rem', fontSize:'0.85rem'}}>
                Baseline: {kpis.analysisTimeBefore.value.toFixed(1)}s
                {' '}<span style={{color:'#38a169', fontWeight:600}}>
                  ({((kpis.analysisTimeBefore.value - kpis.avgProcessingTime.value)/kpis.analysisTimeBefore.value * 100).toFixed(0)}% faster)
                </span>
              </div>
            )}
          </div>

          <div className="metric-card primary">
            <div className="metric-header">
              <h3>Average Score</h3>
              <p>Mean pronunciation accuracy score achieved</p>
            </div>
            <div className="metric-value">
              {kpis.averageScore.loading ? '...' : `${kpis.averageScore.value.toFixed(1)}%`}
            </div>
          </div>
        </div>

        {/* Student Engagement */}
        <div className="section-header">
          <h2>Student Engagement</h2>
          <p>How students interact with the recording feature</p>
        </div>

        <div className="engagement-grid">
          <div className="engagement-card">
            <div className="engagement-icon">✅</div>
            <div className="engagement-content">
              <div className="engagement-value">{kpis.completionRate.loading ? '...' : `${kpis.completionRate.value.toFixed(1)}%`}</div>
              <div className="engagement-label">First-time Completion Rate</div>
              <div className="engagement-description">Students who complete recordings on first attempt</div>
            </div>
          </div>

          <div className="engagement-card">
            <div className="engagement-icon">🔄</div>
            <div className="engagement-content">
              <div className="engagement-value">{kpis.retryRate.loading ? '...' : `${kpis.retryRate.value.toFixed(1)}%`}</div>
              <div className="engagement-label">Retry Rate</div>
              <div className="engagement-description">Students who retry recordings after first attempt</div>
            </div>
          </div>

          <div className="engagement-card">
            <div className="engagement-icon">👁️</div>
            <div className="engagement-content">
              <div className="engagement-value">{kpis.reviewRate.loading ? '...' : `${kpis.reviewRate.value.toFixed(1)}%`}</div>
              <div className="engagement-label">Review Rate</div>
              <div className="engagement-description">Students who review their recordings before submitting</div>
            </div>
          </div>

          <div className="engagement-card">
            <div className="engagement-icon">🎯</div>
            <div className="engagement-content">
              <div className="engagement-value">{kpis.firstTimeUsers.loading ? '...' : `${Math.round(kpis.firstTimeUsers.value)}`}</div>
              <div className="engagement-label">New Users in Period</div>
              <div className="engagement-description">Students using recording feature for first time</div>
            </div>
          </div>

          <div className="engagement-card">
            <div className="engagement-icon">🔁</div>
            <div className="engagement-content">
              <div className="engagement-value">{kpis.retentionRate.loading ? '...' : `${kpis.retentionRate.value.toFixed(1)}%`}</div>
              <div className="engagement-label">Retention Rate</div>
              <div className="engagement-description">Users returning for additional recordings</div>
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
