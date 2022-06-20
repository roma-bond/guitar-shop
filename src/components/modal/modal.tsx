import React, { useEffect } from 'react';
import FocusTrap from 'focus-trap-react';
import './modal.styled.css';

type ModalProps = {
  windowHeight: number;
  testId?: string;
  modalClass?: string;
  children: React.ReactNode;
  onModalClose?: () => void;
};

function Modal(props: ModalProps) {
  const {windowHeight, testId, modalClass, children, onModalClose} = props;
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '550px',
        height: `${windowHeight}px`,
        marginBottom: '50px',
      }}
    >
      <FocusTrap
        focusTrapOptions={{
          tabbableOptions: { displayCheck: 'none' },
        }}
      >
        <div className={`modal is-active ${modalClass} modal-for-ui-kit`} data-testid='modalContainer'>
          <div className="modal__wrapper">
            <div
              className="modal__overlay"
              data-close-modal
              onClick={onModalClose}
            >
            </div>
            <div className="modal__content">
              {children}
              <button
                className="modal__close-btn button-cross"
                type="button"
                aria-label="Закрыть"
                onClick={onModalClose}
                data-testid={testId}
              >
                <span className="button-cross__icon"></span>
                <span className="modal__close-btn-interactive-area"></span>
              </button>
            </div>
          </div>
        </div>
      </FocusTrap>
    </div>
  );
}

export default Modal;
