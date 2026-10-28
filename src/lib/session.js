import { DEMO_USER_ID, STORAGE_KEYS, TEAM } from '../constants.js';

// The MVP login (LoginPage.jsx, PRD FR16): pressing Login signs in the demo user, John
// Doe, whatever was typed. The session lasts until the tab is closed
// (sessionStorage) or Log out is pressed. Nothing typed on the login page is
// ever kept: only the fact that someone is signed in.
const SESSION_KEY = 'vibetracker.session';

export const DEMO_USER = TEAM.find((member) => member.id === DEMO_USER_ID);

export function readSession() {
  try {
    if (window.sessionStorage.getItem(SESSION_KEY) !== DEMO_USER.id) return null;
  } catch {
    return null;
  }
  addToSavedTeam();
  return DEMO_USER;
}

export function startSession() {
  try {
    window.sessionStorage.setItem(SESSION_KEY, DEMO_USER.id);
  } catch {
    /* storage blocked: signed in until the page reloads */
  }
  addToSavedTeam();
  return DEMO_USER;
}

export function endSession() {
  try {
    window.sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* nothing was saved */
  }
}

// A team saved before John Doe joined the demo team doesn't have him, so add
// him, as a real app would for the account that signs in.
function addToSavedTeam() {
  try {
    const team = JSON.parse(window.localStorage.getItem(STORAGE_KEYS.team));
    if (Array.isArray(team) && !team.some((member) => member?.id === DEMO_USER.id)) {
      window.localStorage.setItem(STORAGE_KEYS.team, JSON.stringify([...team, DEMO_USER]));
    }
  } catch {
    /* nothing saved yet: the demo team already includes him */
  }
}
