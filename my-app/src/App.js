import React from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Coins from './Components/Coins';
import CoinsDetails from './Components/CoinsDetails';
import Exchanges from './Components/Exchanges';
import Header from './Components/Header';
import Home from './Components/Home';
import Footer from './Components/footer';

function App() {
  return (
<Router>
  <Header/>
<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/coins' element={<Coins/>}/>
  <Route path='/exchanges' element={<Exchanges/>}/>
  <Route path='/coins/:id' element={<CoinsDetails/>}/>
</Routes>
<Footer/>
</Router>
  );
}

export default App;
