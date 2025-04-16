const getInitialFavorites = () => {
  try {
    const saved = localStorage.getItem('favorites');
    if (saved === null) return [];
    return JSON.parse(saved).companies || [];
  } catch (e) {
    console.warn('Errore nel parsing dei preferiti', e);
    return [];
  }
};

const initialState = {
  cart: {
    content: [],
  },
  favorites: {
    companies: getInitialFavorites(),
  },
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVS':
      if (state.favorites.companies.includes(action.payload)) return state;
      return {
        ...state,
        favorites: {
          ...state.favorites,
          companies: [...state.favorites.companies, action.payload],
        },
      };

    case 'REMOVE_FROM_FAVS':
      return {
        ...state,
        favorites: {
          ...state.favorites,
          companies: state.favorites.companies.filter(
            (company) => company !== action.payload
          ),
        },
      };

    default:
      return state;
  }
};

export default mainReducer;
