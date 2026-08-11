import { register } from '../bus.js';

const state = { completedToday: 0, streak: 0 };

export const streakHandler = {
  canHandle: (event) => event.type === 'todo.completed',
  async handle(event) {
    state.completedToday += 1;
    if (state.completedToday === 1) state.streak += 1;
  },
};

export function registerStreakHandler() {
  register(streakHandler);
}

export function getStreak() {
  return { ...state };
}
