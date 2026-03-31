import { useParams } from 'react-router-dom'
import { getProductById } from '../data/product';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
 
const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart, cartItems } = useCart();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();
    

    useEffect(() => {
      const foundProduct = getProductById(id);
      if(!foundProduct){
        navigate('/');
        return;
      }
      setProduct(foundProduct);
    }, [id])

    if(!product){
      return <div className='page'><p>Loading...</p></div>
    }
    
      const productInCard = cartItems.find((items) => items.id === product.id);
    
      const productQuantity = productInCard ? `(${productInCard.quantity})` : "" ;

  return (
    <div className='page'>
      <div className='container'>
        <div className='product-detail'>
          <div className='product-detail-image'>
            <img src={product?.image} alt={product?.name} />
          </div>
          <div className='product-detail-content'>
            <h1 className='product-detail-name'>{product?.name}</h1>
            <p className='product-detail-price'>{product?.price}</p>
            <p className='product-detail-description'>{product?.description}</p>
            <button className='btn btn-primary' onClick={() => addToCart(product.id)}>Add to cart {productQuantity}</button>
          </div>
        </div>    
      </div>
    </div>
  )
}

export default ProductDetails