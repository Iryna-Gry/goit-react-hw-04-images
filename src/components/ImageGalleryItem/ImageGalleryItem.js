import { useState } from 'react';
import css from './ImageGalleryItem.module.css';
import Modal from '../Modal/Modal';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ src, largeImageURL, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={src}
        alt=""
        source={largeImageURL}
        className={css['ImageGalleryItem-image']}
        onClick={handleModal}
      />
      {isOpen && (
        <Modal
          largeImageURL={largeImageURL}
          id={id}
          onClose={handleModal}
        ></Modal>
      )}
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
