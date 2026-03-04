import React from 'react'
import './CompletionRate.css'

function CompletionRate({ foundCount, totalCount }) {
  const percentage = totalCount > 0 ? Math.round((foundCount / totalCount) * 100) : 0;

  return (
      <>
        <hr></hr>
        <div className="completion-rate">
            <h2 style={{marginLeft:"20px"}}>Pictos Completion Percentage: </h2>
            <h3>{`${foundCount} / ${totalCount} (${percentage}%)`}</h3>
        </div>
        <hr></hr>
    </>
  );
}

export default CompletionRate