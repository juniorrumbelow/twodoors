import React from 'react';
import { analyseGardenSun, Aspect } from '../utils/gardenSunExposure';

interface GardenSunExposureProps {
  bullets: string[];
  description: string;
}

function getSunDescription(aspect: Aspect): string {
  const descriptions: Record<Aspect, string> = {
    south:
      'South-facing gardens receive sun throughout the day and well into the evening during spring and summer.',
    'south-west':
      'South-west facing gardens enjoy afternoon and evening sun, typically sunny past 6pm in spring and summer.',
    west: 'West-facing gardens receive afternoon and evening sun, generally sunny after 6pm in summer.',
    'south-east':
      'South-east facing gardens receive good morning sun but typically become shaded by mid-afternoon.',
    east: 'East-facing gardens get morning sun but are shaded from early afternoon onwards.',
    north: 'North-facing gardens receive very limited direct sunlight throughout the year.',
    'north-west':
      'North-west facing gardens receive minimal sun, with only marginal afternoon light in peak summer.',
    'north-east': 'North-east facing gardens receive very little direct sunlight.',
    unknown: '',
  };
  return descriptions[aspect];
}

export default function GardenSunExposure({ bullets, description }: GardenSunExposureProps) {
  const info = analyseGardenSun(bullets, description);

  if (!info.hasGarden) return null;

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gray-100 p-2.5 rounded-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-[#f13053]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.07-6.07-.71.71M6.34 17.66l-.71.71M17.66 17.66l-.71-.71M6.34 6.34l-.71-.71M12 8a4 4 0 100 8 4 4 0 000-8z"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-black text-gray-900">Garden &amp; Sun</h3>
      </div>

      <div className="border border-gray-100 rounded-2xl p-5">
        <div className="flex flex-wrap gap-3 items-center">
          {info.detectedAspect !== 'unknown' && info.sunFacing && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
              {info.sunFacing}
            </span>
          )}

          {info.detectedAspect !== 'unknown' && (
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                info.getsSunAfter6pm
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {info.getsSunAfter6pm ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.07-6.07-.71.71M6.34 17.66l-.71.71M17.66 17.66l-.71-.71M6.34 6.34l-.71-.71M12 8a4 4 0 100 8 4 4 0 000-8z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
              {info.getsSunAfter6pm ? 'Sun after 6pm' : 'No evening sun'}
            </span>
          )}

          {info.sunHoursLabel && info.detectedAspect !== 'unknown' && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-gray-50 text-gray-500 border border-gray-100">
              {info.sunHoursLabel}
            </span>
          )}

          {info.detectedAspect === 'unknown' && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600">
              Garden
            </span>
          )}

          {info.confidence !== 'high' && info.detectedAspect !== 'unknown' && (
            <span className="text-xs text-gray-400 font-medium">
              Inferred from listing description
            </span>
          )}
        </div>

        {info.detectedAspect !== 'unknown' && (
          <p className="text-gray-500 text-sm font-medium mt-3 leading-relaxed">
            {getSunDescription(info.detectedAspect)}
          </p>
        )}
      </div>
    </div>
  );
}
