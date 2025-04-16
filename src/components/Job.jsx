import { Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

const Job = ({ data }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.companies); // Ottieni i preferiti da Redux
  const [alert, setAlert] = useState(null); // Stato per gestire l'alert

  const handleAddToFav = () => {
    const companyName = data.company_name;

    // Verifica se l'azienda è già nei preferiti
    if (favorites.includes(companyName)) {
      setAlert({
        type: 'danger',
        message: `L'azienda ${companyName} è già nei tuoi preferiti!`,
      });
    } else {
      // Dispatch per aggiungere l'azienda ai preferiti
      dispatch({ type: 'ADD_TO_FAVS', payload: companyName });

      // Aggiorna il localStorage
      const updatedFavorites = [...favorites, companyName];
      localStorage.setItem(
        'favorites',
        JSON.stringify({ companies: updatedFavorites })
      );

      setAlert({
        type: 'success',
        message: `Azienda ${companyName} aggiunta ai preferiti!`,
      });
    }

    // Rimuovi l'alert dopo 5 secondi
    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <Row
      className="mx-0 mt-3 p-3 align-items-center"
      style={{ border: '1px solid #00000033', borderRadius: 4 }}
    >
      <Col xs={3}>
        <Link to={`/${data.company_name}`}>{data.company_name}</Link>
      </Col>
      <Col xs={1}>
        <i
          className="bi bi-star"
          style={{ cursor: 'pointer', fontSize: '1.5rem', color: '#ffc107' }}
          onClick={handleAddToFav}
        ></i>
      </Col>
      <Col xs={8}>
        <a href={data.url} target="_blank" rel="noreferrer">
          {data.title}
        </a>
      </Col>

      {/* Mostra l'alert se è presente */}
      {alert && (
        <Col xs={12} className="mt-3">
          <Alert
            variant={alert.type}
            dismissible
            onClose={() => setAlert(null)}
          >
            {alert.message}
          </Alert>
        </Col>
      )}
    </Row>
  );
};

export default Job;
