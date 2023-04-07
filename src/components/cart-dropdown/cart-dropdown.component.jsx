import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../../contexts/cart.context';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import './cart-dropdown.style.scss';

const CartDropdown=()=>{
    const {cartItems,setIsCartOpen}=useContext(CartContext);
    const navigate=useNavigate();

    const goToCheckoutHandler=()=>{
        navigate('/checkout');
        setIsCartOpen(false);
    }

    const handleOutsideClick=()=>{
        setIsCartOpen(false);
    }

    return (
        <>
            <div className="modal-wrapper" onClick={handleOutsideClick}></div> 
            <div className='cart-dropdown-container'>
                <div className='cart-items'>
                    {cartItems.length ? (
                        cartItems.map(item=><CartItem key={item.id} cartItem={item} />)
                    ):(
                        <span>Your cart is empty</span>)}
                </div>
                <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
            </div>
        </>
    );   
};

export default CartDropdown;