import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';
import { Container } from './Container/Container.styled';
import { useState, useEffect } from 'react';
import css from './App.module.css';
import fetchAPI from 'services/fetchAPI';

export const App = () => {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [currPage, setCurrPage] = useState(null);
  const [query, setQuery] = useState('');
  const [perPage, setPerPage] = useState(12);

  useEffect(() => {
    if (!query) {
      return;
    }
    setStatus('pending');
    const settings = {
      page: currPage,
      q: query,
      per_page: perPage,
    };
    fetchAPI(settings)
      .then(response => {
        setImages(prevState => [...prevState, ...response.data.hits]);
        setTotalPages(Math.ceil(response.data.totalHits / 12));
        setStatus('completed');
      })
      .catch(error => {
        setError(error);
      });
  }, [query, currPage]);

  const handleSearchSubmit = keyword => {
    if (keyword === '') {
      alert('Searchfield is empty. Please, specify your search request.');
      return;
    } else {
      const settings = {
        page: 1,
        q: keyword,
        per_page: 12,
      };
      setImages([]);
      setCurrPage(settings.page);
      setQuery(settings.q);
      setPerPage(settings.per_page);
    }
  };
  const handleButtonLoadMore = () => {
    setCurrPage(prevState => prevState + 1);
  };
  return (
    <div className={css.App}>
      <Container>
        <Searchbar onFormSubmit={handleSearchSubmit}></Searchbar>
        {error && <p>Something went wrong. Please, refresh the page</p>}
        {images.length > 0 ? <ImageGallery data={images}></ImageGallery> : null}
        {status === 'pending' ? <Loader></Loader> : null}
        {status === 'completed' && totalPages !== currPage ? (
          <Button onButtonClick={handleButtonLoadMore}></Button>
        ) : null}
      </Container>
    </div>
  );
};
