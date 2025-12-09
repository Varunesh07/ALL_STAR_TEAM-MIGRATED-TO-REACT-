export function getTeamAbbreviation(teamName) {
  const abbreviations = {
    'Mumbai Indians': 'MI',
    'Chennai Super Kings': 'CSK',
    'Delhi Capitals': 'DC',
    'Kolkata Knight Riders': 'KKR',
    'Rajasthan Royals': 'RR',
    'Punjab Kings': 'PK',
    'Royal Challengers Bangalore': 'RCB',
    'Sunrisers Hyderabad': 'SRH',
    'Lucknow Super Giants': 'LSG',
    'Gujarat Titans': 'GT',
  }

  return abbreviations[teamName] || 'N/A'
}
