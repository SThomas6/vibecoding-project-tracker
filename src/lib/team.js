import { TEAM } from '../constants.js';

export function getMember(id) {
  return TEAM.find((member) => member.id === id) ?? null;
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
