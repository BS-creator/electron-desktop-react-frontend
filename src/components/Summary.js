import React from 'react'

const Summary = ({ active, children, onClick }) => (
  <div className="summary-container">
    {children}
  </div>
)

export default Summary