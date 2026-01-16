export type PoeticTime = {
  season: 'Winter' | 'Spring' | 'Summer' | 'Autumn';
  phase: 'New' | 'Waxing' | 'Full' | 'Waning';
  label: string;
};

export function getPoeticTime(dateInput: Date | string): PoeticTime {
  const date = typeof dateInput === 'string'
    ? new Date(dateInput)
    : dateInput;

  const month = date.getMonth();
  const day = date.getDate();

  let season: PoeticTime['season'];
  if (month === 11 || month <= 1) season = 'Winter';
  else if (month <= 4) season = 'Spring';
  else if (month <= 7) season = 'Summer';
  else season = 'Autumn';

  let phase: PoeticTime['phase'];
  if (day <= 7) phase = 'New';
  else if (day <= 14) phase = 'Waxing';
  else if (day <= 21) phase = 'Full';
  else phase = 'Waning';

  return {
    season,
    phase,
    label: `${season} · ${phase}`,
  };
}