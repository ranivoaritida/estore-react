import { useParams } from 'react-router-dom'
//import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
//import { fetchProductById } from '../api/productApi';
import { useProductById } from '../hooks/useProducts';
 
const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart, cartItems } = useCart();
    //const [product, setProduct] = useState(null);
    //const navigate = useNavigate();
    

    /*useEffect(() => {
      const loadProduct =  async () => {
        try{
          const foundProduct =  await fetchProductById(id);
          if(!foundProduct){
            navigate('/');
            return;
          }
          setProduct(foundProduct);
        }
        catch(error){
          console.error('Error fetching product:', error);
          navigate('/');
        }
      };

      loadProduct();   
    }, [id,navigate])*/
    const { data: product, isLoading, isError } = useProductById(id);

    if(isLoading){
      return <div className='page'><p>Loading product...</p></div>
    }
    if(isError || !product){
      return <div className='page'><p>Product not found.</p></div>
    }
    
      const productInCart = cartItems.find((items) => items.product.id === product.id);
    
      const productQuantity = productInCart ? `(${productInCart.quantity})` : "" ;

  return (
    
    <div className='page'>
      <div className='container'>
        <div className='product-detail'>
          <div className='product-detail-image'>
            <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop" alt={product?.name} />
          </div>
          <div className='product-detail-content'>
            <h1 className='product-detail-name'>{product?.name}</h1>
            <p className='product-detail-price'>{product?.price}$</p>
            <p className='product-detail-description'>{product?.description}</p>
            <button className='btn btn-primary' onClick={() => addToCart(product.id)}>Add to cart {productQuantity}</button>
          </div>
        </div>    
      </div>
    </div>
  )
}

export default ProductDetails