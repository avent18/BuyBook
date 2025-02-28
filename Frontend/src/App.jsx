import React, { useEffect } from 'react';
import Home from './pages/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { Routes, Route} from 'react-router-dom';
import AllBooks from './pages/AllBooks';
import LogIn from './pages/Login';
import SignUp from './pages/SignUp';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import ViewBookDetails from './components/viewBookDetails/ViewBookDetails';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './Store/auth';
import Favourites from './components/profile/Favourites';
import UserOrderHistory from './components/profile/UserOrderHistory';
import Settings from './components/profile/Settings';
import AddBook from './pages/AddBook';

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state)=> state.auth.role);
  useEffect(() => {
    if(
      localStorage.getItem("id")&&
      localStorage.getItem("token")&&
      localStorage.getItem("role")
    )
    {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, []);
  return (
    <div>
      
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/all-books" element={<AllBooks />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/profile" element={<Profile />}>
             {role=== "user" ? <Route index element={<Favourites />}  /> : <Route index element={<AllOrders />}  />}
             {role === "admin" && <Route path='/profile/addBook' element={<AddBook />} /> } 
             <Route path='/profile/orderHistory' element={<UserOrderHistory />}  />
             <Route path='/profile/settings' element={<Settings />} />
          </Route>
          <Route exact path="/SignUp" element={<SignUp />} />
          <Route exact path="/LogIn" element={<LogIn />} />
          <Route exact path="/view-book-details/:id" element={<ViewBookDetails />} />
        </Routes>
        <Footer />
    
      {/* <Home /> */}
      
    </div>
  )
}

export default App;