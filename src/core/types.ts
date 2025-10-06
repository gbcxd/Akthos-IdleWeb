export type SkillId = 'COOKING'|'MINING'|'FISHING';


export interface TimerAction {
id: string; // e.g., 'cook_tuna'
skill: SkillId;
startedAt: number; // epoch ms (server-based when online)
durationMs: number; // single cycle length
qtyPerCycle: number; // how many items per completion
}