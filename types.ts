export enum AppScreen {
  START = 'START',
  INTRO = 'INTRO',
  QUESTION = 'QUESTION',
  SUCCESS = 'SUCCESS'
}

export interface PhotoConfig {
  start: string;
  intro: string;
  question: string;
  success: string;
}