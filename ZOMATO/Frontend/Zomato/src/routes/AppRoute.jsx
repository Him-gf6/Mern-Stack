import React from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import UserRegister from '../pages/UserRegister'
import UserLogin from '../pages/UserLogin'
import PartnerRegister from '../pages/PartnerRegister'
import PartnerLogin from '../pages/PartnerLogin'
import Home from '../pages/Home'
import CreateFood from '../pages/CreateFood'
import Profile from '../pages/PartnerProfile'
import Saved from '../pages/saved'


function Approute() {
  return (
    <Router>
      <Routes>
        <Route path='/user/register' element={<UserRegister/>}/>
        <Route path='/user/login' element={<UserLogin/>}/>
        <Route path='/foodpartner/register' element={<PartnerRegister/>}/>
        <Route path='/foodpartner/login' element={<PartnerLogin/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/createFood' element={<CreateFood/>}/>
        <Route path='/foodpartner/:id' element={<Profile/>}/>
        <Route path='/saved' element={<Saved/>}/>
      </Routes>
    </Router>
  )
}

export default Approute