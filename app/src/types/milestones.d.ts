import type { Milestone } from '@/components/MilestoneModal';

declare module '@/types' {
  interface AppState {
    importMode: boolean;
    milestoneQueue: Milestone[];
    celebratedMilestones: string[];
    showMilestoneCelebrations: boolean;
  }

  type AppAction =
    | { type: 'SET_STATE'; payload: AppState }
    | { type: 'ADD_ENTRY'; payload: Entry }
    | { type: 'UPDATE_ENTRY'; payload: Entry }
    | { type: 'DELETE_ENTRY'; payload: string }
    | { type: 'TOGGLE_FAVORITE'; payload: string }
    | { type: 'UPDATE_FAVORITE'; payload: FavoriteEntry }
    | { type: 'REMOVE_FAVORITE'; payload: string }
    | { type: 'UPDATE_ONGOING'; payload: OngoingEntry }
    | { type: 'ADD_TO_TOP10'; payload: { year: number; entryId: string } }
    | { type: 'REMOVE_FROM_TOP10'; payload: { year: number; entryId: string } }
    | { type: 'REORDER_TOP10'; payload: { year: number; entries: { entryId: string; rank: number }[] } }
    | { type: 'ADD_DRAWER'; payload: number }
    | { type: 'DELETE_DRAWER'; payload: number }
    | { type: 'IMPORT_DATA'; payload: unknown }
    | { type: 'SET_ONGOING_YEAR'; payload: number }
    | { type: 'SET_WATCHING_SINCE'; payload: number | null }
    | { type: 'SET_IMPORT_MODE'; payload: boolean }
    | { type: 'PUSH_MILESTONE'; payload: Milestone }
    | { type: 'POP_MILESTONE' }
    | { type: 'CLEAR_MILESTONE_QUEUE' }
    | { type: 'CELEBRATE_MILESTONE'; payload: string }
    | { type: 'SET_SHOW_MILESTONE_CELEBRATIONS'; payload: boolean };
}
