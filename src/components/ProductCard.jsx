import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({product}) => {
  const { addToCart, cartItems } = useCart();

  const productInCard = cartItems.find((items) => items.id === product.id);

  const productQuantity = productInCard ? `(${productInCard.quantity})` : "" ;

  return (
    <div className='product-card'>
        <img src={product.image} alt={product.name} className='product-image' />
        <div className='product-card-content'>
        <h3 className='product-card-name'>{product.name}</h3>
        <p className='product-card-price'>${product.price}</p>
        <div className='product-card-actions'>
            <Link className='btn btn-secondary' to={`/product/${product.id}`}>
            View details
            </Link>
            <button className='btn btn-primary' onClick={ () => addToCart(product.id)}>Add to cart {productQuantity}</button>
        </div>
        </div>
    </div>
  )
}

export default ProductCard