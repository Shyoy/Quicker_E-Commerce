import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Menu from '../Menu/Menu';
import Cart from '../Cart/Cart';
import Nav from '../Nav/Nav';
import './Layout.css';

// interface LayoutProps {
//   children: React.ReactNode;
// }

const Layout = () => {
  return (
    <div className="Layout">

      <header><Header/></header>
      <nav> <Nav/></nav>
      <aside><Cart/></aside>
      <main><Main/></main>
    </div>
  );
};

export default Layout;