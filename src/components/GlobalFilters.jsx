import { useState } from 'react'
import { Calendar, ChevronDown, RotateCcw } from 'lucide-react'
import { format } from 'date-fns'
import './GlobalFilters.css'

const GlobalFilters = ({ filters, onFiltersChange }) => {
  const [showInstitutionDropdown, setShowInstitutionDropdown] = useState(false)
  const [showCourseDropdown, setShowCourseDropdown] = useState(false)
  const [showClassDropdown, setShowClassDropdown] = useState(false)
  const [showChannelDropdown, setShowChannelDropdown] = useState(false)

  const institutions = [
    { value: 'all', label: 'All' },
    { value: 'unab', label: 'UNAB' },
    { value: 'colman', label: 'COLMAN' },
    { value: 'tecmonterrey', label: 'TecMonterrey' }
  ]

  const courses = [
    { value: 'all', label: 'All' },
    { value: 'basic-1', label: 'Basic 1' },
    { value: 'basic-2', label: 'Basic 2' },
    { value: 'advance-1', label: 'Advance 1' },
    { value: 'advance-2', label: 'Advance 2' }
  ]

  const classes = [
    { value: 'all', label: 'All' },
    { value: 'class-a', label: 'Class A' },
    { value: 'class-b', label: 'Class B' },
    { value: 'class-c', label: 'Class C' }
  ]

  const countries = [
    { value: 'all', label: 'All' },
    { value: 'mx', label: 'Mexico' },
    { value: 'co', label: 'Colombia' },
    { value: 'cl', label: 'Chile' },
    { value: 'pe', label: 'Peru' }
  ]

  const channels = [
    { value: 'all', label: 'All' },
    { value: 'web-desktop', label: 'Web Desktop' },
    { value: 'web-mobile', label: 'Web Mobile' },
    { value: 'mobile-app', label: 'Mobile App' }
  ]

  const handleClearFilters = () => {
    onFiltersChange({
      dateRange: {
        start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        end: new Date(),
        preset: 'last7days'
      },
      institution: 'all',
      course: 'all',
      class: 'all',
  channel: 'all',
  country: 'all'
    })
  }

  return (
    <div className="sidebar-filters">
      {/* Institution Filter */}
      <div className="filter-section">
        <label className="filter-label">Institution Name</label>
        <div className="filter-control">
          <select 
            className="filter-select"
            value={filters.institution || 'all'}
            onChange={(e) => onFiltersChange({ institution: e.target.value })}
          >
            {institutions.map(institution => (
              <option key={institution.value} value={institution.value}>
                {institution.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Course Filter */}
      <div className="filter-section">
        <label className="filter-label">Course Name</label>
        <div className="filter-control">
          <select 
            className="filter-select"
            value={filters.course || 'all'}
            onChange={(e) => onFiltersChange({ course: e.target.value })}
          >
            {courses.map(course => (
              <option key={course.value} value={course.value}>
                {course.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Class Filter */}
      <div className="filter-section">
        <label className="filter-label">Class Name</label>
        <div className="filter-control">
          <select 
            className="filter-select"
            value={filters.class || 'all'}
            onChange={(e) => onFiltersChange({ class: e.target.value })}
          >
            {classes.map(classItem => (
              <option key={classItem.value} value={classItem.value}>
                {classItem.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Country Filter */}
      <div className="filter-section">
        <label className="filter-label">Country</label>
        <div className="filter-control">
          <select
            className="filter-select"
            value={filters.country || 'all'}
            onChange={(e) => onFiltersChange({ country: e.target.value })}
          >
            {countries.map(country => (
              <option key={country.value} value={country.value}>{country.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Date Range */}
      <div className="filter-section">
        <label className="filter-label">Date</label>
        <div className="date-inputs">
          <input
            type="date"
            className="filter-input date-input"
            value={format(filters.dateRange.start, 'yyyy-MM-dd')}
            onChange={(e) => {
              const newStart = new Date(e.target.value)
              onFiltersChange({
                dateRange: { 
                  ...filters.dateRange, 
                  start: newStart,
                  preset: 'custom'
                }
              })
            }}
          />
          <input
            type="date"
            className="filter-input date-input"
            value={format(filters.dateRange.end, 'yyyy-MM-dd')}
            onChange={(e) => {
              const newEnd = new Date(e.target.value)
              onFiltersChange({
                dateRange: { 
                  ...filters.dateRange, 
                  end: newEnd,
                  preset: 'custom'
                }
              })
            }}
          />
        </div>
        <div className="date-slider">
          <input
            type="range"
            min="1"
            max="90"
            value={Math.ceil((filters.dateRange.end - filters.dateRange.start) / (1000 * 60 * 60 * 24))}
            className="slider"
            onChange={(e) => {
              const days = parseInt(e.target.value)
              const end = new Date()
              const start = new Date(end.getTime() - days * 24 * 60 * 60 * 1000)
              onFiltersChange({
                dateRange: { start, end, preset: 'custom' }
              })
            }}
          />
        </div>
      </div>

      {/* Clear Filters Button */}
      <div className="filter-section">
        <button 
          className="clear-filters-btn"
          onClick={handleClearFilters}
        >
          <RotateCcw size={16} />
          Clear all filters
        </button>
      </div>
    </div>
  )
}

export default GlobalFilters
