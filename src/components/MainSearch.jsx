// src/components/MainSearch.jsx

import { useState } from 'react';
import { Container, Row, Col, Form, Spinner, Alert } from 'react-bootstrap';
import Job from './Job';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../actions/favoriteActions';

const MainSearch = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  // Ottieni i risultati, loading e error dallo store Redux
  const { results, isLoading, error } = useSelector((state) => state.search);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      dispatch(fetchJobs(query)); // Dispatch per cercare i lavori
    }
  };

  return (
    <Container>
      <Row className="justify-content-end">
        <Col className="col-12">
          <i
            className="bi bi-star-fill"
            style={{ fontSize: '100px', cursor: 'pointer' }}
            onClick={() => navigate('/prefer')}
          ></i>
        </Col>
      </Row>
      <Row>
        <Col xs={10} className="mx-auto my-3">
          <h1 className="display-1">Remote Jobs Search</h1>
        </Col>
        <Col xs={10} className="mx-auto">
          <Form onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              value={query}
              onChange={handleChange}
              placeholder="type and press Enter"
            />
          </Form>
        </Col>

        {/* Indicatore di caricamento */}
        {isLoading && (
          <Col xs={10} className="mx-auto mb-5">
            <Spinner animation="border" variant="primary" />{' '}
            {/* Indica caricamento */}
          </Col>
        )}

        {/* Mostra l'errore */}
        {error && (
          <Col xs={10} className="mx-auto mb-5">
            <Alert variant="danger">{error}</Alert> {/* Mostra l'errore */}
          </Col>
        )}

        <Col xs={10} className="mx-auto mb-5">
          {/* Mappa i risultati della ricerca */}
          {results.map((jobData) => (
            <Job key={jobData._id} data={jobData} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default MainSearch;
