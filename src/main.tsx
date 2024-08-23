import ReactDOM from 'react-dom/client'
import './index.css'
import 'remixicon/fonts/remixicon.css'
import AppRouters from './Routers/App-Routers/AppRouters'
// Axios 
import "./Services/API/axios-global.js"


import {store, persistor} from './RTK-STORE/store.ts'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'


ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRouters />
      </PersistGate>
    </Provider>
  );

