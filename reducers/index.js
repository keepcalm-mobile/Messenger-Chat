const initialState = {
  messages: [],
  isLoggedIn: false,
  username: "",
  chats: [],
  users: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "LOAD_MESSAGES":
      return { ...state, messages: action.payload };
    case "REFRESH":
      return { ...state, messages: state.messages.concat(action.payload) };
    case "LOG_IN":
      return { ...state, isLoggedIn: !state.isLoggedIn };
    case "LOAD_CHATS":
      return { ...state, chats: action.payload };
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "GET_USERS":
      return { ...state, users: action.payload };
    default:
      return state;
  }
}
