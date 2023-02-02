import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './app/store';
import { fetchUsers } from './features/users/usersSlice';
import './index.css';

store.dispatch(fetchUsers());
// store.dispatch(fetchPosts());

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
