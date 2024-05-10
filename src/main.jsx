
import * as ReactDOMClient from 'react-dom/client';
import App from './App';
import './index.scss';
import './index.css';
import UserContextProvider from './Components/Context/userContext';


ReactDOMClient.createRoot(document.getElementById('root'))
        .render(
          <UserContextProvider>
             <App />
          </UserContextProvider>
        )