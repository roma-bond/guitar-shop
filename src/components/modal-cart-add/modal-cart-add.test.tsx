import ModalCartAdd from './modal-cart-add';
import { render, screen, waitFor } from '@testing-library/react';

describe('Component: ModalCartAdd', () => {
  const modalProps = {
    name: 'Taylor 414ce',
    vendorCode: 'ABC123',
    previewImg: '',
    stringCount: 6,
    price: 10000,
    onClose: jest.fn(),
    onAddToCart: jest.fn(),
  };

  it('should render ModalCartAdd correctly', async () => {
    render(<ModalCartAdd {...modalProps} />);

    const guitarName = await waitFor(
      async () => await screen.findByTestId('guitar-name'),
    );
    expect(guitarName.innerHTML).toBe(`Гитара ${modalProps.name}`);

    const vendorCode = await screen.findByTestId('vendor-code');
    expect(vendorCode.innerHTML).toBe(`Артикул: ${modalProps.vendorCode}`);

    const stringCount = await waitFor(
      async () => await screen.findByTestId('string-count'),
    );
    expect(stringCount.innerHTML).toBe(
      `Электрогитара, ${modalProps.stringCount} струнная`,
    );

    const price = await waitFor(async () => await screen.findByTestId('price'));
    expect(price.innerHTML).toBe(`${modalProps.price} ₽`);
  });
});
