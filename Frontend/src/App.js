
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import ItemUpload from './Pages/ItemUpload';
import Item from './Pages/Item';
import Nav2 from './Components/Nav2';
import Nav from './Components/Nav';
import Nav3 from './Components/Nav3';
import UserProfile from './Pages/UserProfile';
import ItemUpdate from './Pages/ItemUpdate';
import Footer from './Components/Footer';
import About from './Pages/About';
import Services from './Pages/Services';
import Layout from './Components/Layout';
import ExchangeCurrency from './Pages/ExchangeCurrency';



function App() {
  return (
    <div>
    
    
    <Layout>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/Register' element={<Register/>}></Route>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/ItemUpload' element={<ItemUpload/>}></Route>
        <Route path='/Item/:id' element={<Item/>}></Route>
        <Route path='/Nav2' element={<Nav2/>}></Route>
        <Route path='/Nav' element={<Nav/>}></Route>
        <Route path='/Nav3' element={<Nav3/>}></Route>
        <Route path= '/Profile' element={<UserProfile activeTab1={'profile'}/>}></Route>
        <Route path='/ProfileAds' element={<UserProfile activeTab1={'myads'}/>}></Route>

        {/* <Route path='/ProfileUpdate' element={<UserProfile activeTab1={'settings'}/>}></Route> */}
        <Route path ='/ItemUpdate/:id' element={<ItemUpdate/>}></Route>
        <Route path ='/About' element = {<About/>}></Route>
        <Route path = '/Services' element = {<Services/>}></Route>
        <Route path = '/exchangeService' element = {<ExchangeCurrency/>}></Route>
        


        

      </Routes>
    </Router>
    </Layout>
    
    
    
    {/* <Footer/>   */}
    </div>
  );
}

export default App;