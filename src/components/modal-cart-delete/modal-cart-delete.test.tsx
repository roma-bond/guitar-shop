import { render, screen, fireEvent } from '@testing-library/react';
import { GuitarType } from '../../types/guitars';
import ModalCartDelete from './modal-cart-delete';

describe('Component: ModalCartDelete', () => {
  const modalProps = {
    name: 'Taylor 414ce',
    vendorCode: 'ABC123',
    previewImg: '',
    stringCount: 4,
    price: 10000,
    type: 'ukulele' as GuitarType,
    onClose: jest.fn(),
    onDeleteFromCart: jest.fn(),
  };

  it('should render ModalCartDelete correctly', () => {
    render(<ModalCartDelete {...modalProps} />);

    expect(screen.getByText(`Гитара ${modalProps.name}`)).toBeInTheDocument();
    expect(screen.getByText('Укулеле, 4 струнная')).toBeInTheDocument();
    expect(screen.getByText('Удалить товар')).toBeInTheDocument();
  });

  it('should enable a callback function on Delete button click', () => {
    render(<ModalCartDelete {...modalProps} />);

    const deleteButtonElement = screen.getByText('Удалить товар');
    fireEvent(
      deleteButtonElement,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(modalProps.onDeleteFromCart).toBeCalledTimes(1);
  });
});
