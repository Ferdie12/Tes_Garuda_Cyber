import Navbar from '../components/navbar';
import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [products, setProducts] = useState();

  function formatCurrency(number) {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    });
  
    return formatter.format(number);
  }

  const fetchData = async () => {
      const response = await axios.get("http://localhost:5000/api/product");
      setProducts(response.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOnClick = (productId) => {
    window.location.href = `/product/${productId}`;
  };

  return (
    <Fragment>
      <Navbar />
      <h1 className="text-sm font-bold my-9 text-center text-secondary sm:text-3xl">List All Products</h1>
      <div className="whitespace-nowrap lg:whitespace-normal lg:grid grid-cols-3 gap-5 overflow-auto mt-5 mx-4 md:mx-8 lg:mx-28 py-5">
        {products &&
          products.map((product) => (
            <div
              key={product.id}
              className="bg-zinc-100 relative inline-flex flex-col lg:mt-3 mr-5 lg:mr-0 overflow-hidden group rounded-xl shadow-md cursor-default transition-all duration-[0.4s] hover:-translate-y-3 whitespace-normal"
            >
              <div className="overflow-hidden relative h-[200px] before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0 before:bg-gradient-to-t from-black from-5% before:z-10">
                <img
                  src={`https://source.unsplash.com/1600x900/?technology&${product.name}`}
                  alt=""
                  className="absolute transition-all duration-[0.4s] group-hover:scale-125"
                />
                <div className="absolute bottom-3 left-3 z-20 flex flex-col gap-1">
                  <h1 className="text-white font-white font-bold text-sm lg:text-2xl">
                    {product.name}
                  </h1>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4 p-6">
                <h1 className="text-xl font-semibold">
                  {formatCurrency(product.price)}
                  <span className="text-base text-gray-500 font-medium"></span>
                </h1>
                <h1 className="text-center text-sm text-gray-500 font-medium">
                This is a high-quality electronic product!
                </h1>
                <button
                  onClick={() => handleOnClick(product.id)}
                  className="bg-white border border-gray-300 rounded-full px-10 py-3 text-sm font-semibold tracking-[2px] duration-300 transition-all hover:bg-primary hover:text-secondary"
                >
                  ORDER
                </button>
              </div>
            </div>
          ))}
      </div>
    </Fragment>
  );
};

export default Dashboard;
