
# Personal Finance Dashboard

This is a React-based Personal Finance Dashboard. It allows users to track their income and expenses, view financial insights, and interact with a role-based interface for adding new transactions. 

## Features

- **Dashboard Overview**: Displays total balance, income, and expenses calculated dynamically.
- **Data Visualizations**: Includes a vertical Bar Chart representing running balance trends and horizontal Progress Bars showing expenses categorized by type.
- **Transactions Management**: A detailed data table displaying all transactions with live filtering (by text search and Income/Expense type).
- **Role-Based UI Simulation**: A toggle method in the header switches between `VIEWER` and `ADMIN` roles. Only users acting as `ADMIN` can view and use the form to add new transactions.
- **Automated Insights**: Calculates and displays the highest spending category, the single largest expense, and the net-savings surplus/deficit for the period.
- **Dark Mode**: A fully functioning dark theme toggled via CSS variables.
- **Data Persistence**: State is automatically synchronized with `localStorage` so data isn't lost upon refreshing the page.

## Technologies Used

- **React.js** (via Vite for faster compilation)
- **React Context API** (for global state management)
- **Vanilla CSS** (for responsive layout, theming, and custom chart generation)
- **Inline SVGs** (for lightweight, dependency-free icons)

## Setup Instructions

To run this project locally, follows these standard steps:

1. Download project and open your terminal.
2. Navigate into the project directory:
   ```bash
   cd finance-dashboard
3. Install the required dependencies:
   ```bash
   npm install
4. Start the vite development server:
   ```bash
   npm run dev
5. open your browser and navigate to `http://localhost:5173` to view the dashboard.
