# Recording Analytics Dashboard

A comprehensive React + Vite dashboard for monitoring student recording analytics and performance metrics.

## Features

### Global Filters (Priority #1)
- **Date Range Filter (Mandatory)**: Select analysis periods with presets (Last 7/30/90 days) or custom ranges
- **Channel Filter (Key Requirement)**: Multi-select filter for:
  - Web Desktop
  - Web Mobile  
  - Mobile App (iOS/Android)
  - All Channels
- **Student Segment Filter (Optional)**: Segment by user types (New, Returning, Course levels)

### Executive Summary KPIs
1. **Adoption Rate**: Percentage of students who use the "Record Yourself" feature
2. **Overall Success Rate**: Percentage of recordings successfully processed  
3. **Average Processing Time**: Time from recording stop to feedback display
4. **Total Recordings Sent to Teacher**: Count of recordings forwarded to teachers

## Tech Stack

- **React 18** - Modern UI library with hooks
- **Vite** - Fast build tool and development server
- **Lucide React** - Beautiful icons
- **date-fns** - Date manipulation and formatting
- **CSS Modules** - Scoped styling

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd MockupRecordingDashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── Dashboard.jsx          # Main dashboard container
│   ├── Dashboard.css          # Dashboard styles
│   ├── GlobalFilters.jsx      # Global filter controls
│   ├── GlobalFilters.css      # Filter styles
│   ├── ExecutiveSummary.jsx   # KPI metrics display
│   └── ExecutiveSummary.css   # KPI styles
├── App.jsx                    # Root component
├── App.css                    # Global styles
└── main.jsx                   # Entry point
```

## Key Requirements Addressed

- **Director Priority**: Prominent global filters at the top
- **VP View**: Clear executive summary with high-level metrics
- **PO Metrics**: Specific adoption rate, success rate, and processing time KPIs
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UX**: Clean, professional interface with loading states and trend indicators

## Data Integration

The dashboard currently uses mock data. To integrate with real analytics:

1. Replace the mock data generation in `ExecutiveSummary.jsx`
2. Connect to your analytics API endpoints
3. Update the filter logic to send appropriate query parameters
4. Add error handling and retry logic

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
