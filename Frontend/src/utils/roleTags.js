export function getRoleTagClass(role) {
  if (!role) return 'tag'

  const r = role.toLowerCase()

  // Player roles
  if (r.includes('wicket')) return 'tag wk'
  if (r.includes('batsman')) return 'tag batter'
  if (r.includes('bowler')) return 'tag bowler'
  if (r.includes('allround')) return 'tag allrounder'

  // Coach roles
  if (r.includes('head')) return 'tag headcoach'
  if (r.includes('assistant')) return 'tag assistantcoach'

  return 'tag'
}
