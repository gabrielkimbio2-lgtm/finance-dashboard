import React from "react";
import Header from "./Components/Header.jsx";
import SummaryCards from "./Components/SummaryCards.jsx";
import Charts from "./Components/Charts.jsx";
import TransactionList from "./Components/TransactionList.jsx";
import Insights from "./Components/Insights.jsx";
import TransactionForm from "./Components/TransactionForm.jsx";

function App() {
  return (
    <>
    <div className="app-container">
      <Header />
      <main>
        <SummaryCards />
        <Insights />
        <Charts />
        <TransactionForm />
        <TransactionList />
      </main>
      
    </div>
    </>
  );
}

export default App
