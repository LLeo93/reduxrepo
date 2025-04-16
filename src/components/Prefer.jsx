import { Col, Row, Container, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

const Prefer = () => {
  const navigate = useNavigate();
  const favorites = useSelector((state) => state.favorites.companies);
  const dispatch = useDispatch();
  const [alert, setAlert] = useState(null); // Stato per gestire gli alert

  const handleRemove = (company) => {
    if (favorites.includes(company)) {
      // Dispatch per rimuovere l'azienda dai preferiti
      dispatch({ type: 'REMOVE_FROM_FAVS', payload: company });

      // Aggiorna il localStorage
      const updatedFavorites = favorites.filter((fav) => fav !== company);
      localStorage.setItem(
        'favorites',
        JSON.stringify({ companies: updatedFavorites })
      );

      setAlert({
        type: 'success',
        message: `L'azienda ${company} è stata rimossa dai preferiti!`,
      });
    } else {
      setAlert({
        type: 'danger',
        message: `L'azienda ${company} non è nei tuoi preferiti!`,
      });
    }

    // Rimuovi l'alert dopo 5 secondi
    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <Container>
      <h1>LISTA PREFERITI</h1>

      {/* Mostra l'alert se è presente */}
      {alert && (
        <Row>
          <Col xs={12} className="mt-3">
            <Alert
              variant={alert.type}
              dismissible
              onClose={() => setAlert(null)}
            >
              {alert.message}
            </Alert>
          </Col>
        </Row>
      )}

      {favorites.length === 0 ? (
        <p>Nessuna azienda preferita al momento.</p>
      ) : (
        favorites.map((company, i) => (
          <Row
            key={i}
            className="my-2 justify-content-between align-items-center"
          >
            <Col>{company}</Col>
            <Col xs="auto">
              <i
                className="bi bi-trash"
                style={{ cursor: 'pointer', color: 'red' }}
                onClick={() => handleRemove(company)}
              ></i>
            </Col>
          </Row>
        ))
      )}

      <Button className="btn-success mt-4" onClick={() => navigate('/')}>
        TORNA ALLA HOME
      </Button>
    </Container>
  );
};

export default Prefer;
