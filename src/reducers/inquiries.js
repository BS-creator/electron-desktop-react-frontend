import { CREATE, READ, UPDATE, DELETE, FETCH_ITEMS_BEGIN, FETCH_ITEMS_SUCCESS, FETCH_ITEMS_FAILURE } from '../actions/inquiryAction';

//initial state for redux store

const initialState = {
  items: [
    { timer: "Toyota", group: "Celica", symbol: "Celica", price: 35000, quantity: 234, result: "won" },
    { timer: "Toyota", group: "Celica", symbol: "Celica", price: 35000, quantity: 234, result: "lost" },
    { timer: "Toyota", group: "Celica", symbol: "Celica", price: 35000, quantity: 234, result: "won" },
    { timer: "Toyota", group: "Celica", symbol: "Celica", price: 35000, quantity: 234, result: "won" },
    { timer: "Toyota", group: "Celica", symbol: "Celica", price: 35000, quantity: 234, result: "won" },
    { timer: "Toyota", group: "Celica", symbol: "Celica", price: 35000, quantity: 234, result: "won" },
    { timer: "Toyota", group: "Celica", symbol: "Celica", price: 35000, quantity: 234, result: "won" },
  ]
};

//reducer function
const inquiries = (state = initialState, action) => {
  switch (action.type) {

    //handless creation of data
    case CREATE: return {
      items: [...state.items, action.payload.item]
    };

    //reads all the data from the store
    case READ: return state;

    case FETCH_ITEMS_BEGIN: return {
      ...state,
      loading: true,
      errors: null
    }
    case FETCH_ITEMS_SUCCESS: return {
      ...state,
      loading: false,
      items: action.payload.items
    }
    case FETCH_ITEMS_FAILURE: return {
      ...state,
      loading: false,
      errors: action.payload.errors,
      items: []
    }

    //returns default state, in case some unknown action type is discovered
    default: return state;
  }
}

export default inquiries;