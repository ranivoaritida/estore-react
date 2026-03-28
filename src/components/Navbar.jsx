import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const {user,logout} = useAuth();
  return (
    <nav className='navbar'>
        <div className='navbar-container'>
            <Link to='/' className='navbar-brand'>
                eStoreHub
            </Link>
            <div className='navbar-links'>
                <Link to='/'  className='navbar-link'>Home</Link>
                <Link to='/checkout' className='navbar-link' >Checkout</Link>
            </div>
            {!user ? (<div className='navbar-auth'>
                <div className='navbar-auth-links'>
                    <Link to='/auth' className='btn btn-secondary'>Login</Link>
                    <Link to='/auth' className='btn btn-primary'>Signup</Link>
                </div>
            </div>) :(
                <div className='navbar-user'>
                    <span className='navbar-greeting'>Welcome, {user.email}!</span>
                    <button onClick={logout} className='btn btn-secondary'>Logout</button>
                </div>
            )}
        </div>
    </nav>
  )
}

export default Navbar