import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, CheckCircle, Clock, Send, Users, Monitor, Smartphone, Tablet, RefreshCcw, Eye, Target, UserPlus, Award, Info } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import './ExecutiveSummary.css'

const ExecutiveSummary = ({ filters }) => {
  // Helper to format large numbers for compact display (e.g., 6,124 -> 6.1K)
  const formatShort = (n) => {
    if (n == null) return '-'
    if (n < 1000) return n.toLocaleString()
    if (n < 1000000) return `${(n/1000).toFixed(n < 10000 ? 1 : 1)}K` // always 1 decimal for consistency
    return `${(n/1000000).toFixed(1)}M`
  }
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
  ,sessionStudents: { value: 0, loading: true }
  })

  // Channel / distribution metrics derived from filters
  const [channelMetrics, setChannelMetrics] = useState({
    averageScore: [],
    recordingDuration: [],
    usageDistribution: [],
    retentionBuckets: [],
    techBreakdown: []
  })

  // Simple deterministic hash + seeded RNG so same filter combo yields stable numbers
  const buildSeededRandom = (filtersObj) => {
    const str = JSON.stringify(filtersObj || {})
    let h = 1779033703 ^ str.length
    for (let i = 0; i < str.length; i++) {
      h = Math.imul(h ^ str.charCodeAt(i), 3432918353)
      h = (h << 13) | (h >>> 19)
    }
    h = ((h ^ (h >>> 16)) >>> 0)
    // mulberry32
    return function () {
      let t = (h += 0x6d2b79f5)
      t = Math.imul(t ^ (t >>> 15), t | 1)
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
  }

  // Simulate API call to fetch KPI data
  useEffect(() => {
    const fetchKPIData = async () => {
      // Simulate API response delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock data based on filters
      // Generate adoption metrics first to keep internal consistency
  const sessionStudentsVal = Math.floor(Math.random() * (7500 - 6000) + 6000) // distinct students with a platform session
  const adoptionRateVal = Math.random() * (85 - 65) + 65 // 65-85%
  const totalUsersVal = Math.round(sessionStudentsVal * (adoptionRateVal / 100))

      const mockData = {
        // Performance pipeline mock values
        loadLibTime: { value: Math.random() * (1.4 - 0.6) + 0.6, loading: false },
        streamingTime: { value: Math.random() * (45 - 30) + 30, loading: false },
        analyzeTime: { value: Math.random() * (3.0 - 1.5) + 1.5, loading: false },
        // Engagement & adoption (consistent set)
  sessionStudents: { value: sessionStudentsVal, loading: false },
        totalUsers: { value: totalUsersVal, trend: Math.random() * 8 - 4, loading: false },
        adoptionRate: { value: adoptionRateVal, trend: Math.random() * 10 - 5, loading: false },
        averageScore: { value: Math.random() * (92 - 82) + 82, trend: Math.random() * 8 - 4, loading: false },
        retryRate: { value: Math.random() * (25 - 10) + 10, trend: Math.random() * 6 - 3, loading: false },
        reviewRate: { value: Math.random() * (70 - 50) + 50, trend: Math.random() * 8 - 4, loading: false },
        firstTimeUsers: { value: Math.random() * (150 - 25) + 25, trend: Math.random() * 40 - 20, loading: false },
        retentionRate: { value: Math.random() * (68 - 52) + 52, trend: Math.random() * 6 - 3, loading: false }
      }

      setKpis(mockData)

      // Generate channel metrics with deterministic variation by filters
      const rand = buildSeededRandom({
        dateRange: filters.dateRange,
        channel: filters.channel,
        segment: filters.segment,
        institution: filters.institution,
        course: filters.course,
        class: filters.class,
        country: filters.country
      })

      // Helper to vary around base with +/- delta
      const vary = (base, spread) => {
        return +(base + (rand() * 2 - 1) * spread).toFixed(1)
      }

      const avgScoreData = [
        { name: 'Mobile App', score: vary(88, 2) },
        { name: 'Web Desktop', score: vary(85, 2) },
        { name: 'Mobile Web', score: vary(82, 2) }
      ].sort((a,b)=> b.score - a.score)

      const durationData = [
        { name: 'Web Desktop', duration: vary(44, 2) },
        { name: 'Mobile App', duration: vary(43, 2) },
        { name: 'Mobile Web', duration: vary(39, 2) }
      ].sort((a,b)=> b.duration - a.duration)

      // Usage distribution - keep sums to 100; start with base proportions
      let webDesktop = 45 + (rand() * 4 - 2) // +/-2
      let webMobile = 35 + (rand() * 4 - 2)
      let mobileApp = 100 - webDesktop - webMobile
      // Normalize rounding
      const totalUD = webDesktop + webMobile + mobileApp
      webDesktop = +(webDesktop / totalUD * 100).toFixed(1)
      webMobile = +(webMobile / totalUD * 100).toFixed(1)
      mobileApp = +(100 - webDesktop - webMobile).toFixed(1)

      // Technology breakdown: split mobileApp into Android/iOS with slight variation
      let android = +(mobileApp * (0.55 + rand()*0.1)).toFixed(1) // 55-65% of mobile
      let ios = +(mobileApp - android).toFixed(1)
      // Distribute browser share keeping relative pattern Chrome>Safari>Firefox>Edge
      const browserTotal = 100 - mobileApp
      let chrome = +(browserTotal * 0.64 + (rand()*2 -1)).toFixed(1)
      let safari = +(browserTotal * 0.20 + (rand()*1.5 -0.75)).toFixed(1)
      let firefox = +(browserTotal * 0.10 + (rand()*1 -0.5)).toFixed(1)
      let edge = +(browserTotal - chrome - safari - firefox).toFixed(1)
      // Small correction if rounding drift
      const techSum = chrome + safari + firefox + edge + android + ios
      const drift = +(100 - techSum).toFixed(1)
      edge = +(edge + drift).toFixed(1)

      const usageDistribution = [
        { name: 'Web Desktop', value: webDesktop, fill: '#667eea' },
        { name: 'Web Mobile', value: webMobile, fill: '#10b981' },
        { name: 'Mobile App', value: mobileApp, fill: '#f59e0b' }
      ]

      const techBreakdown = [
        { tech: 'Chrome', value: chrome },
        { tech: 'Safari', value: safari },
        { tech: 'Firefox', value: firefox },
        { tech: 'Edge', value: edge },
        { tech: 'Android App', value: android },
        { tech: 'iOS App', value: ios }
      ]

      const retentionBuckets = [
        { bucket: '1 Recording', users: +(28 + (rand()*6 -3)).toFixed(1) },
        { bucket: '2-3 Recordings', users: +(42 + (rand()*6 -3)).toFixed(1) },
        { bucket: '4-5 Recordings', users: +(19 + (rand()*4 -2)).toFixed(1) },
        { bucket: '6+ Recordings', users: +(11 + (rand()*4 -2)).toFixed(1) }
      ]

      setChannelMetrics({
        averageScore: avgScoreData,
        recordingDuration: durationData,
        usageDistribution,
        techBreakdown,
        retentionBuckets
      })
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

        {/* Shared distribution data to keep charts coherent */}
        {(() => {
          // High-level channel usage (must sum 100)
          // Mobile App 20% will be split into Android + iOS below (11% + 9%).
          // Browser shares scaled so Chrome/Safari/Firefox/Edge sum 80.
          // This ensures Usage Distribution Mobile App == Android+iOS in Technology Breakdown.
        })()}
        
        {/* Performance Pipeline (First Row) */}
        <div className="metrics-grid">
          <div className="metric-card primary">
            <div className="metric-header">
              <h3 style={{display:'flex',alignItems:'center',gap:6}}>
                Ready to Record Time
                <span className="info-icon" title="Time from opening a recording activity until microphone & libraries are initialized and the student can start recording."><Info size={16} /></span>
              </h3>
              <p>Open activity → mic ready</p>
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
              <div style={{display:'flex',flexDirection:'column'}}>
                <h3 style={{display:'flex',alignItems:'center',gap:6}}>Feature Usage
                  <span className="info-icon" title={kpis.totalUsers.loading ? '' : `${kpis.totalUsers.value.toLocaleString()} students used the feature out of ${kpis.sessionStudents.value.toLocaleString()} distinct students who had a platform session during the period.` }>
                    <Info size={15} />
                  </span>
                </h3>
                <p>Used vs eligible students</p>
              </div>
            </div>
            <div className="metric-value small-stack" style={{lineHeight:1.05}}>
              {kpis.totalUsers.loading ? '...' : `${formatShort(kpis.totalUsers.value)} used`}
              <span className="subtext">{kpis.totalUsers.loading || kpis.sessionStudents.loading || kpis.adoptionRate.loading ? '...' : `of ${formatShort(kpis.sessionStudents.value)} session students (${kpis.adoptionRate.value.toFixed(1)}%)`}</span>
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
                data={channelMetrics.averageScore}
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
                data={channelMetrics.recordingDuration}
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
            <p className="chart-note">Unique users by channel (multi-channel users counted once per channel). Mobile App share = Android + iOS in Technology chart.</p>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={channelMetrics.usageDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={70}
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
                data={channelMetrics.retentionBuckets}
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
                data={channelMetrics.techBreakdown}
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
