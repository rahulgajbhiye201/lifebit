export interface ITimeline {
  date: string;
  note: string;
  isDone: boolean;
}

export interface IHabitData {
  id: number;
  type: string;
  name: string;
  color: string;
  question?: string;
  unit?: string;
  target?: string;
  targetType?: string;
  frequency?: string;
  reminder?: string;
  notes?: string;
  timeline?: ITimeline[];
  order: number;
}
