import { Component } from 'react';
import { STORAGE_KEYS } from '../constants.js';
import { buttonStyles } from './styles.js';

// The last line of defence (PRD NFR5, DR11): if something still breaks while
// the page is drawn, say so and offer a way out instead of a blank screen.
// Resetting removes this tracker's saved data in this browser and reloads,
// which brings back the demo project.
export default class ErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  reset = () => {
    try {
      Object.values(STORAGE_KEYS).forEach((key) => window.localStorage.removeItem(key));
    } catch {
      /* storage is blocked, so there's nothing saved to remove */
    }
    window.location.reload();
  };

  render() {
    if (!this.state.failed) return this.props.children;

    return (
      <main className="mx-auto max-w-xl px-6 py-16">
        <h1 className="text-xl font-semibold text-ink">Something went wrong</h1>
        <p className="mt-2 text-sm text-ink-muted">
          The tracker couldn't show the data saved in this browser. Resetting replaces it with the demo project. It
          only affects this browser.
        </p>
        <button type="button" onClick={this.reset} className={`${buttonStyles.primary} mt-6`}>
          Reset to the demo project
        </button>
      </main>
    );
  }
}
