import {create} from 'zustand'

export interface SettingsState {
  isWhitespacePreservationEnabled: boolean

  toggleWhitespacePreservation: (value?: boolean) => void
}

export const useSettingsStore = create<SettingsState>((set) => ({
  isWhitespacePreservationEnabled: false,

  toggleWhitespacePreservation: (value?: boolean) =>
    set((state) => ({isWhitespacePreservationEnabled: value ?? !state.isWhitespacePreservationEnabled})),
}))
