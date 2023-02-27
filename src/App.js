import './App.css';
import 'react-toastify/dist/ReactToastify.css'
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import NavBar from './components/NavBar';
import Home from './components/Home';
import Cart from './components/Cart';
import 'bootstrap/dist/css/bootstrap.min.css'
import NotFound from './components/NotFound';
import {ToastContainer} from 'react-toastify'
import Register from './components/Register';
import Login from "./components/Login"
import CheckOutSucess from './components/CheckOutSucess';
import Summary from './admin/Summary';
import Products from './admin/Products';
import Dashboard from './admin/Dashboard';
import CreateProduct from './admin/CreateProduct';
import ProductsList from './admin/lists/ProductsList';
import Users from './admin/Users';
import Orders from './admin/Orders';
import Dproducts from './Details/Dproducts';
import Dorders from './Details/Dorders';
import Dusers from './Details/Dusers';
import Profile from './components/Profile';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ToastContainer/>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/checkout-sucess" element={<CheckOutSucess/>}/>

        <Route path="/product/:id" element={<Dproducts/>}/>
        <Route path="/order/:id" element={<Dorders/>}/>

        <Route path="/user/:id" element={<Dusers/>}/>
        <Route path='/myprofile' element={<Profile/>}/>
        <Route path='/admin' element={<Dashboard/>}>
        <Route index element={<Profile/>}/>
          <Route path="products" element={<Products/>}>
            <Route index element={<ProductsList/>}/>
          <Route path="create-product" element={<CreateProduct/>}/>
          </Route>
          <Route path='summary' element={<Summary/>}/>
          <Route path='users' element={<Users/>}/>
          <Route path='orders' element={<Orders/>}/>
        </Route>
      {/* <Route path="*" element={<Navigate to="/notfound" replace/>}/> */}
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
