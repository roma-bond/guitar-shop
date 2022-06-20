import Modal from '../modal/modal';

type ModalNetworkErrorProps = {
  onModalClose: () => void;
};

function ModalNetworkError(props: ModalNetworkErrorProps): JSX.Element {
  return (
    <Modal windowHeight={410} onModalClose={props.onModalClose}>
      <p>Данные не загружены с сервера!</p>
    </Modal>
  );
}

export default ModalNetworkError;
