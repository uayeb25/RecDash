import { useState } from 'react'
import GlobalFilters from './GlobalFilters'
import ExecutiveSummary from './ExecutiveSummary'
import './Dashboard.css'

const Dashboard = () => {
  const [filters, setFilters] = useState({
    dateRange: {
      start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
      end: new Date(),
      preset: 'last7days'
    },
    institution: 'all',
    course: 'all',
    class: 'all'
  })

  const handleFiltersChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters })
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="brand">EDUSOFT</div>
          <h1>Recording Dashboard</h1>
          <div className="last-update">
            Last Update: {new Date().toLocaleDateString('en-US', { 
              month: 'numeric', 
              day: 'numeric', 
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true 
            })}
          </div>
        </div>
      </header>
      
      <div className="dashboard-content">
        <aside className="sidebar">
          <GlobalFilters 
            filters={filters} 
            onFiltersChange={handleFiltersChange} 
          />
        </aside>
        
        <main className="main-content">
          <ExecutiveSummary filters={filters} />
        </main>
      </div>
    </div>
  )
}

export default Dashboard
