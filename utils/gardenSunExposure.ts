export type Aspect =
  | 'south'
  | 'north'
  | 'east'
  | 'west'
  | 'south-west'
  | 'south-east'
  | 'north-west'
  | 'north-east'
  | 'unknown';

export interface GardenSunInfo {
  hasGarden: boolean;
  detectedAspect: Aspect;
  sunFacing: string | null;
  getsSunAfter6pm: boolean;
  sunHoursLabel: string | null;
  confidence: 'high' | 'medium' | 'low';
}

const GARDEN_PRESENT_RE =
  /\b(garden|patio|terrace|courtyard|outdoor space|outside space|rear plot|front plot)\b/i;

// Compound directions must appear before simple cardinals to prevent partial matches
const ASPECT_RE =
  /\b(?:(south[\s-]?west(?:erly|ern)?|sw[\s-]facing)|(south[\s-]?east(?:erly|ern)?|se[\s-]facing)|(north[\s-]?west(?:erly|ern)?|nw[\s-]facing)|(north[\s-]?east(?:erly|ern)?|ne[\s-]facing)|(south(?:erly|ern)?[\s-]facing|facing[\s-]south)|(north(?:erly|ern)?[\s-]facing|facing[\s-]north)|(east(?:erly|ern)?[\s-]facing|facing[\s-]east)|(west(?:erly|ern)?[\s-]facing|facing[\s-]west))\b/i;

// Higher confidence when direction is adjacent to the word garden
const DIRECTIONAL_GARDEN_RE =
  /\b(?:south[\s-]?west|south[\s-]?east|north[\s-]?west|north[\s-]?east|south|north|east|west)(?:erly|ern)?(?:[\s-]facing)?(?:\s+\w+){0,5}\s+garden\b|\bgarden(?:\s+\w+){0,5}\s+(?:south[\s-]?west|south[\s-]?east|north[\s-]?west|north[\s-]?east|south|north|east|west)(?:erly|ern)?(?:[\s-]facing)?\b/i;

const GROUP_TO_ASPECT: Aspect[] = [
  'south-west',
  'south-east',
  'north-west',
  'north-east',
  'south',
  'north',
  'east',
  'west',
];

const SUN_AFTER_6PM: Record<Aspect, boolean> = {
  south: true,
  'south-west': true,
  west: true,
  'south-east': false,
  east: false,
  north: false,
  'north-east': false,
  'north-west': false,
  unknown: false,
};

const SUN_HOURS_LABEL: Record<Aspect, string | null> = {
  south: 'All day sun',
  'south-west': 'Afternoon & evening sun',
  west: 'Afternoon & evening sun',
  'south-east': 'Morning to midday sun',
  east: 'Morning sun only',
  north: 'Minimal direct sun',
  'north-east': 'Limited sun',
  'north-west': 'Some afternoon light',
  unknown: null,
};

const ASPECT_LABEL: Record<Aspect, string | null> = {
  south: 'South-facing',
  'south-west': 'South-west facing',
  'south-east': 'South-east facing',
  west: 'West-facing',
  east: 'East-facing',
  north: 'North-facing',
  'north-east': 'North-east facing',
  'north-west': 'North-west facing',
  unknown: null,
};

export function analyseGardenSun(
  bullets: string[] = [],
  description: string = ''
): GardenSunInfo {
  const combinedText = bullets.join(' ') + ' ' + description;

  if (!GARDEN_PRESENT_RE.test(combinedText)) {
    return {
      hasGarden: false,
      detectedAspect: 'unknown',
      sunFacing: null,
      getsSunAfter6pm: false,
      sunHoursLabel: null,
      confidence: 'low',
    };
  }

  const aspectMatch = ASPECT_RE.exec(combinedText);
  if (!aspectMatch) {
    return {
      hasGarden: true,
      detectedAspect: 'unknown',
      sunFacing: null,
      getsSunAfter6pm: false,
      sunHoursLabel: null,
      confidence: 'low',
    };
  }

  const detectedAspect =
    GROUP_TO_ASPECT[aspectMatch.slice(1).findIndex((g) => g !== undefined)] ?? 'unknown';

  const confidence = DIRECTIONAL_GARDEN_RE.test(combinedText) ? 'high' : 'medium';

  return {
    hasGarden: true,
    detectedAspect,
    sunFacing: ASPECT_LABEL[detectedAspect],
    getsSunAfter6pm: SUN_AFTER_6PM[detectedAspect],
    sunHoursLabel: SUN_HOURS_LABEL[detectedAspect],
    confidence,
  };
}
