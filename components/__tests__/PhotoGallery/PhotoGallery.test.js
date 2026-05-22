import { render, screen, fireEvent } from '@testing-library/react';
import PhotoGallery from '../../PhotoGallery';

const images = ['/img1.jpg', '/img2.jpg', '/img3.jpg'];

describe('PhotoGallery', () => {
  it('renders nothing when images array is empty', () => {
    const { container } = render(<PhotoGallery images={[]} title="Test Property" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders the first photo with an accessible alt text', () => {
    render(<PhotoGallery images={images} title="My House" />);
    expect(screen.getByAltText('My House — photo 1')).toBeInTheDocument();
  });

  it('renders secondary photos when there are multiple images', () => {
    render(<PhotoGallery images={images} title="My House" />);
    expect(screen.getByAltText('My House — photo 2')).toBeInTheDocument();
    expect(screen.getByAltText('My House — photo 3')).toBeInTheDocument();
  });

  it('shows the "Show all N photos" button for multiple images', () => {
    render(<PhotoGallery images={images} title="My House" />);
    expect(screen.getByText(`Show all ${images.length} photos`)).toBeInTheDocument();
  });

  it('does not show "Show all" button for a single image', () => {
    render(<PhotoGallery images={['/img1.jpg']} title="My House" />);
    expect(screen.queryByText(/Show all/)).not.toBeInTheDocument();
  });

  it('shows the FEATURED badge when isBoosted is true', () => {
    render(<PhotoGallery images={images} title="My House" isBoosted />);
    expect(screen.getByText('FEATURED')).toBeInTheDocument();
  });

  it('does not show the FEATURED badge when isBoosted is false', () => {
    render(<PhotoGallery images={images} title="My House" />);
    expect(screen.queryByText('FEATURED')).not.toBeInTheDocument();
  });

  it('opens the lightbox when the main photo is clicked', () => {
    render(<PhotoGallery images={images} title="My House" />);
    fireEvent.click(screen.getByAltText('My House — photo 1').closest('[class*="cursor-pointer"]'));
    expect(screen.getByLabelText('Close gallery')).toBeInTheDocument();
  });

  it('closes the lightbox when the close button is clicked', () => {
    render(<PhotoGallery images={images} title="My House" />);
    fireEvent.click(screen.getByAltText('My House — photo 1').closest('[class*="cursor-pointer"]'));
    fireEvent.click(screen.getByLabelText('Close gallery'));
    expect(screen.queryByLabelText('Close gallery')).not.toBeInTheDocument();
  });

  it('closes the lightbox on Escape key', () => {
    render(<PhotoGallery images={images} title="My House" />);
    fireEvent.click(screen.getByAltText('My House — photo 1').closest('[class*="cursor-pointer"]'));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByLabelText('Close gallery')).not.toBeInTheDocument();
  });

  it('advances to the next photo in the lightbox', () => {
    render(<PhotoGallery images={images} title="My House" />);
    fireEvent.click(screen.getByAltText('My House — photo 1').closest('[class*="cursor-pointer"]'));
    fireEvent.click(screen.getByLabelText('Next photo'));
    expect(screen.getByText('2 / 3')).toBeInTheDocument();
  });

  it('goes back to the previous photo in the lightbox', () => {
    render(<PhotoGallery images={images} title="My House" />);
    fireEvent.click(screen.getByAltText('My House — photo 1').closest('[class*="cursor-pointer"]'));
    fireEvent.click(screen.getByLabelText('Next photo'));
    fireEvent.click(screen.getByLabelText('Previous photo'));
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });

  it('wraps from last to first photo via ArrowRight key in lightbox', () => {
    render(<PhotoGallery images={images} title="My House" />);
    fireEvent.click(screen.getByAltText('My House — photo 1').closest('[class*="cursor-pointer"]'));
    // advance to last
    fireEvent.click(screen.getByLabelText('Next photo'));
    fireEvent.click(screen.getByLabelText('Next photo'));
    expect(screen.getByText('3 / 3')).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'ArrowRight' });
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });

  it('shows thumbnail strip in lightbox for multiple images', () => {
    render(<PhotoGallery images={images} title="My House" />);
    fireEvent.click(screen.getByAltText('My House — photo 1').closest('[class*="cursor-pointer"]'));
    expect(screen.getAllByLabelText(/Go to photo/i).length).toBe(images.length);
  });
});
