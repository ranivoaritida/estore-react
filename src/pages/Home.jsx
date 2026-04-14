import { Link } from 'react-router-dom';
//import { getProducts } from '../data/product';
import ProductCard from '../components/ProductCard';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../api/productApi';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try{
        const data = await fetchProducts();
        setProducts(data);
      }
      catch(error){
        console.error('Error fetching products:', error);
      }
    };
    
    loadProducts();
  }, []);

  return (
    <div className='page'>
      <div className='home-hero'>
        <h1 className='home-title'>Welcome to eCommerceHub</h1>
        <p className='home-subtitle'>Discover amazing product with great prices</p>
      </div>
      <div className='container'>
        <h2 className='page-title'>Our Products</h2>
        <div className='product-grid'>
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home