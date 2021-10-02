export interface Timer {
  totalTime: number;
  text: string;
  id: string;
  soundName: string;
  soundCounter: number;
}

export interface Meditation {
  id: string;
  name: string;
  timers: Timer[];
}

export type Meditations = {
  [key: string]: Meditation;
};

export type RootStackParamList = {
  Editor: undefined;
  Home: undefined;
  Settings: undefined;
  Statistics: undefined;
  MeditationTimer: undefined;
};

export type SoundError = {
  code: number;
  message: string;
};
