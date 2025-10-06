import { TimerAction } from './types';


export function getActionProgress(now: number, action: TimerAction) {
const elapsed = Math.max(0, now - action.startedAt);
const pct = Math.min(1, elapsed / action.durationMs);
const remaining = Math.max(0, action.durationMs - elapsed);
return { pct, remaining };
}


export function nextCompletionMs(now: number, action: TimerAction) {
const { remaining } = getActionProgress(now, action);
return remaining;
}