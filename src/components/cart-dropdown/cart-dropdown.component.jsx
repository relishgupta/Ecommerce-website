import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';

import './cart-dropdown.style.scss';

const CartDropdown=()=>{
    const dispatch=useDispatch();
    const cartItems=useSelector(selectCartItems);
    const navigate=useNavigate();

    const goToCheckoutHandler=()=>{
        navigate('/checkout');
        dispatch(setIsCartOpen(false));
    }

    const handleOutsideClick=()=>{
        dispatch(setIsCartOpen(false));
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