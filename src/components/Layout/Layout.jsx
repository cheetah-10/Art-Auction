// Layout.jsx
import Navbar from '../Navbar/Navbar.jsx'
import Footer from '../Footer/Footer'
import { Outlet } from "react-router-dom";


function Layout() {
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>

    </>
  );
}

export default Layout;