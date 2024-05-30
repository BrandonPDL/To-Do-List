import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Home from './components/pages/Home';
import PageInfo from './components/pages/PageInfo';
import MoodDark from './components/molecules/MoodDark';
import PrivateRoute from './components/pages/PrivateRoute';
import Login from './components/pages/Login';
import Header from './components/templates/Header';
function App() {
  return (
    <Router>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Header/>
        <Routes>
          <Route path='/home' element={<PrivateRoute component={Home}/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='*' element={<PrivateRoute component={Home} />} />
        </Routes>
        </PersistGate>
      </Provider>
    </Router>
  )
}

export default App;
