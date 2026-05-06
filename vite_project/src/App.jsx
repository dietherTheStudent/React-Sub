import { useState } from "react";
 
function WinList() {
  //1. State to hold the list of wins
  const wins = [
    { id: 1, title: "Finished capstone presentation" },
    { id: 2, title: "Learned a new dish" },
    { id: 3, title: "Learned react button syntax" },
  ];
 
  return (
    <div style={{padding: '20px', fontFamily: 'san-serif'}}>
      <h2>My Daily Wins</h2>
      <ul>
        {wins.map((win) => (
          <li key={win.id}>{win.title}</li>
        ))}
      </ul>
    </div>
  );
}
 
export default WinList;