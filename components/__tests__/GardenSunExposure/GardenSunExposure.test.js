import { render, screen } from '@testing-library/react';
import GardenSunExposure from '../../GardenSunExposure';
import { analyseGardenSun } from '../../../utils/gardenSunExposure';

jest.mock('../../../utils/gardenSunExposure', () => ({
  analyseGardenSun: jest.fn(),
}));

const noGarden = { hasGarden: false };

const southFacing = {
  hasGarden: true,
  detectedAspect: 'south',
  sunFacing: 'South-facing',
  getsSunAfter6pm: true,
  sunHoursLabel: '8+ hours/day',
  confidence: 'high',
};

const unknownAspect = {
  hasGarden: true,
  detectedAspect: 'unknown',
  sunFacing: null,
  getsSunAfter6pm: false,
  sunHoursLabel: null,
  confidence: 'low',
};

describe('GardenSunExposure', () => {
  it('renders nothing when there is no garden', () => {
    analyseGardenSun.mockReturnValue(noGarden);
    const { container } = render(<GardenSunExposure bullets={[]} description="" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders the Garden & Sun heading when a garden is present', () => {
    analyseGardenSun.mockReturnValue(southFacing);
    render(<GardenSunExposure bullets={[]} description="" />);
    expect(screen.getByText(/Garden & Sun/i)).toBeInTheDocument();
  });

  it('shows the sun-facing direction badge', () => {
    analyseGardenSun.mockReturnValue(southFacing);
    render(<GardenSunExposure bullets={[]} description="" />);
    expect(screen.getByText('South-facing')).toBeInTheDocument();
  });

  it('shows "Sun after 6pm" badge when applicable', () => {
    analyseGardenSun.mockReturnValue(southFacing);
    render(<GardenSunExposure bullets={[]} description="" />);
    expect(screen.getByText(/Sun after 6pm/)).toBeInTheDocument();
  });

  it('shows "No evening sun" badge when not applicable', () => {
    analyseGardenSun.mockReturnValue({
      ...southFacing,
      detectedAspect: 'north',
      sunFacing: 'North-facing',
      getsSunAfter6pm: false,
      sunHoursLabel: null,
    });
    render(<GardenSunExposure bullets={[]} description="" />);
    expect(screen.getByText(/No evening sun/)).toBeInTheDocument();
  });

  it('shows the sun hours label when provided', () => {
    analyseGardenSun.mockReturnValue(southFacing);
    render(<GardenSunExposure bullets={[]} description="" />);
    expect(screen.getByText('8+ hours/day')).toBeInTheDocument();
  });

  it('shows a generic "Garden" badge for unknown aspect', () => {
    analyseGardenSun.mockReturnValue(unknownAspect);
    render(<GardenSunExposure bullets={[]} description="" />);
    expect(screen.getByText('Garden')).toBeInTheDocument();
  });

  it('shows the inferred notice for non-high confidence', () => {
    analyseGardenSun.mockReturnValue({ ...southFacing, confidence: 'medium' });
    render(<GardenSunExposure bullets={[]} description="" />);
    expect(screen.getByText(/Inferred from listing description/i)).toBeInTheDocument();
  });

  it('does not show inferred notice for high confidence', () => {
    analyseGardenSun.mockReturnValue(southFacing);
    render(<GardenSunExposure bullets={[]} description="" />);
    expect(screen.queryByText(/Inferred from listing description/i)).not.toBeInTheDocument();
  });

  it('calls analyseGardenSun with the provided bullets and description', () => {
    analyseGardenSun.mockReturnValue(noGarden);
    const bullets = ['South-facing garden', 'Double garage'];
    render(<GardenSunExposure bullets={bullets} description="A lovely south-facing garden." />);
    expect(analyseGardenSun).toHaveBeenCalledWith(bullets, 'A lovely south-facing garden.');
  });
});
