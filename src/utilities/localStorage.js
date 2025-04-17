export const saveFavoritesToLocalStorage = (favorites) => {
  try {
    const serialized = JSON.stringify(favorites);
    localStorage.setItem('favorites', serialized);
  } catch (e) {
    console.warn('Errore salvataggio localStorage', e);
  }
};

export const loadFavoritesFromLocalStorage = () => {
  try {
    const serialized = localStorage.getItem('favorites');
    if (serialized === null) return undefined;
    return JSON.parse(serialized);
  } catch (e) {
    console.warn('Errore nel caricamento da localStorage', e);
    return undefined;
  }
};
