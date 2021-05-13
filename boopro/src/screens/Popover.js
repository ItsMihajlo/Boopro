import { useEffect, useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    fontWeight: '600',
    backgroundColor: '#242b2f',
    color: 'white',
    maxWidth: '600px',
  },
};

const Popover = ({ name, overview, vote_average, date, background }) => {
  var subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    window.addEventListener('keyup', (event) => {
      if (event.key === 'Escape') {
        closeModal();
      } else if (event.key === 'Enter') {
        openModal();
      }
    });
  }, []);

  const afterOpenModal = () => {
    subtitle.style.color = '#f00';
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <img src={`https://image.tmdb.org/t/p/w500/${background}`} />
        <div
          className="popover_name"
          ref={(_subtitle) => (subtitle = _subtitle)}
        >
          Name : {name}
        </div>
        <div className="description">
          <p>About : {overview}</p>
          <p>Vote Average : {vote_average}</p>
          <p>Release Date: {date}</p>
        </div>
      </Modal>
    </div>
  );
};
export default Popover;
