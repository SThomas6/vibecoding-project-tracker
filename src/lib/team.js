// The member with this id in the team list, or null (e.g. Unassigned).
export function getMember(team, id) {
  return team.find((member) => member.id === id) ?? null;
}

// 'Priya Shah' -> 'PS'
export function initials(name) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}
