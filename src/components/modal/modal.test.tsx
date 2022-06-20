import { render, screen } from '@testing-library/react';
import Modal from './modal';

describe('Component: Modal', () => {
  it('should render Modal correctly', () => {
    render(
      <Modal
        windowHeight={100}
        testId={'crossButton'}
        modalClass={'some-class'}
      >
        <p>Hello, World</p>
      </Modal>,
    );

    expect(screen.getByText(/Hello, World/i)).toBeInTheDocument();
    expect(screen.getByTestId('crossButton')).toBeInTheDocument();
    expect(screen.getByTestId('modalContainer')).toBeInTheDocument();
    expect(screen.getByTestId('modalContainer').classList.contains('some-class')).toBe(true);
  });
});
