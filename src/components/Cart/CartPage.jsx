import React from 'react'

import './CartPage.css'
import user from '../../assets/user.webp'
import Table from './../Common/Table';
import QuantityInput from '../SingleProduct/QuantityInput';
import remove from '../../assets/remove.png'

const CartPage = () => {
  return (
    <section className="cart_page align_center">
        <div className="align_center user_info">
            <img src={user} alt='user profile'/>
            <div>
                <p className="user_name">Harley</p>
                <p className="user_email">harrley@gmail.com</p>
            </div>
        </div>
        
        <Table headings={["Item","Price","Quantity","Total","Remove"]}>
            <tbody>
                <tr>
                    <td>iPhone 14</td>
                    <td>$999</td>
                    <td className='align_center table_quantity_input'><QuantityInput/></td>
                    <td>$999</td>
                    <td><img src={remove} alt="remove icon" className='cart_remove_icon'/></td>
                </tr>
            </tbody>
        </Table>

        <table className="cart_bill">
            <tbody>
                <tr>
                    <td>Subtotal</td>
                    <td>$999</td>
                </tr>
                <tr>
                    <td>Shipping Charge</td>
                    <td>$11</td>
                </tr>
                <tr className='cart_bill_final'>
                    <td>Total</td>
                    <td>$1010</td>
                </tr>
            </tbody>
        </table>
        <button className="search_button checkout_button">Checkout</button>
    </section>
)
}

export default CartPage