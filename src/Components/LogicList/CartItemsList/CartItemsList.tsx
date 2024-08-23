
import React from 'react'
import CartCard from '../../C-Pages-UI/Cart/CartCard'
import {TProducts} from '../../../Types/products'


type CartItemListProps = {
  products: TProducts[];
  changeQuantityHandler: (id: number, quantity: number) => void;
  removeItemHandler: (id: number) => void;
  
};



const CartItemsList = ({products, changeQuantityHandler, removeItemHandler}: CartItemListProps) => {
  
  const renderList = products.map((el) => <CartCard key={el.id} {...el} changeQuantityHandler={changeQuantityHandler} removeItemHandler={removeItemHandler} />);
  
  return (
    <div>{renderList}</div>
  )
}

export default CartItemsList