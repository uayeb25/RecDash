# Copilot Instructions for Recording Analytics Dashboard

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a React + Vite dashboard for recording analytics with the following key requirements:

### Global Filters (Priority #1)
1. **Date Range** (Mandatory): For selecting analysis period
2. **Channel** (Key requirement): Multi-select filter for Web Desktop, Web Mobile, Mobile App (iOS/Android), All
3. **Student Segment** (Optional): For user type segmentation

### Executive Summary KPIs
1. **Adoption Rate**: (Unique Users who used "Record Yourself" / Unique Users who saw "Record Yourself") %
2. **Overall Success Rate**: (Recordings successfully processed / Total recordings started) %
3. **Average Processing Time**: Average processing time in seconds
4. **Total Recordings Sent to Teacher**: Count of SendToTeacher events

## Code Guidelines
- Use modern React functional components with hooks
- Implement responsive design for mobile and desktop
- Use lucide-react for icons
- Use date-fns for date handling
- Focus on clean, readable component structure
- Implement proper state management for filters
- Use CSS modules or styled components for styling
