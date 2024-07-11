import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import MainPage from './Pages/MainPage';
import Favourites from './Pages/Favourites';


const App = () => {
    return (
        <div>
            <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainPage/>}/>
                <Route path='/dashboard' element={<Home/>}/>
                <Route path='/favourites' element={<Favourites/>}/>
                
            </Routes>
            </BrowserRouter>
            
        </div>
    );
};

export default App;