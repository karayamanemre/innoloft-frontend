import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Main from './components/Main';
import Product from './components/Product';
import ProductEdit from './components/ProductEdit';

const appId = process.env.REACT_APP_ID || 1;

const App = () => {
  const [configuration, setConfiguration] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api-test.innoloft.com/configuration/${appId}/`)
      .then((response) => {
        setConfiguration(response.data);
      });
  }, []);

  if (!configuration) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="flex flex-col items-center h-screen">
        <Header logo={configuration.logo} mainColor={configuration.mainColor} />

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/edit" element={<ProductEdit />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
