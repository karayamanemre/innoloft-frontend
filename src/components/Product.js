import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Product = () => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get('https://api-test.innoloft.com/product/6781/')
      .then((response) => {
        setProduct(response.data);
      });
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col my-4 gap-4 items-center justify-center w-3/4">
      <Link
        to="/product/edit"
        className="bg-[#272E71] text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium self-end"
      >
        Edit
      </Link>
      <div className="flex items-center rounded-lg justify-center border-2">
        <div className="flex flex-col w-3/4 border-r-2">
          <img
            src={product.picture}
            alt={product.name}
            className="h-80 object-contain border-b-2"
          />
          <h2 className="text-2xl font-bold mb-2 px-4">{product.name}</h2>
          <p className="text-gray-500 mb-4 px-4">{product.type.name}</p>
          <p className="mb-4 px-4 text-gray-600">
            {typeof product.description === 'object'
              ? JSON.stringify(product.description)
              : product.description}
          </p>
        </div>
        <div className="flex flex-col w-1/4 px-4 gap-2 justify-center">
          <img
            src={product.user.profilePicture}
            alt={`${product.user.firstName} ${product.user.lastName}`}
            className="w-20 h-20 rounded-full mr-4 self-start"
          />
          <div>
            <p className="font-bold">
              {typeof product.user.firstName === 'object'
                ? JSON.stringify(product.user.firstName)
                : `${product.user.firstName} ${product.user.lastName}`}
            </p>
            <p>
              {typeof product.company.name === 'object'
                ? JSON.stringify(product.company.name)
                : product.company.name}
            </p>
          </div>

          <iframe
            src={`https://maps.google.com/maps?q=${encodeURIComponent(
              `${product.company.address.street} ${product.company.address.house}, ${product.company.address.zipCode} ${product.company.address.city.name}, ${product.company.address.country.name}`,
            )}&z=15&output=embed`}
            width="100%"
            height="350"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="flex items-center justify-center rounded-lg p-2 border-2 w-full mb-10">
        <iframe
          width="560"
          height="315"
          src={product.video}
          title={product.name}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Product;
