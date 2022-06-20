import useEventListener from './use-event-listener';
import { renderHook } from '@testing-library/react-hooks';
import { fireEvent } from '@testing-library/react';

describe('Hook: useEventListener', () => {
  it('useEventListener responds to ESC key press', () => {
    const mockCallback = jest.fn();
    renderHook(() => useEventListener(mockCallback));

    fireEvent.keyDown(document, { keyCode: 27 });
    expect(mockCallback).toBeCalledTimes(1);
  });
});
