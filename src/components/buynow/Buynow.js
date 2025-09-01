import React, { useState, useEffect } from 'react';
import './buynow.css'
import { Divider } from '@mui/material'
import Option from './Option'
import Right from './Right'
import Subtotal from './Subtotal';

const Buynow = () => {

    const [cartdata, setCartdata] = useState("");
    console.log(cartdata)

    const getdatabuy = async () => {
        const res = await fetch("/cartdetails", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();


        if (res.status !== 201) {
            alert("no data available")
        } else {
            setCartdata(data.carts);
        }
    };

    useEffect(() => {
        getdatabuy();
    }, []);

    return (
    <>
        {cartdata.length > 0 ? (
            <div className='buynow_section'>
                <div className='buynow_container'>
                    <div className="left_buy">
                        <h1>Shopping Cart</h1>
                        <p>Select all items</p>
                        <span className='leftbuyprice'>Price</span>
                        <Divider />

                        {cartdata.map((e, k) => (
                            <React.Fragment key={e.id || k}>
                                <div className='item_containert'>
                                    <img src={e.detailUrl} alt="product" />
                                    <div className="item_details">
                                        <h3>{e.title.longTitle}</h3>
                                        <h3>{e.title.shortTitle}</h3>
                                        <h3 className="diffrentprice">₹4049.00</h3>
                                        <p className='unusuall'>Usually dispatched in 8 days.</p>
                                        <p>Eligible for FREE Shipping</p>
                                        <img src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png" alt="badge" />
                                        <Option deletedata={e.id} get={getdatabuy} />
                                    </div>
                                    <h3 className='item_price'>₹{e.price.cost}.00</h3>
                                </div>
                                <Divider />
                            </React.Fragment>
                        ))}

                        <Subtotal iteam={cartdata} />
                    </div>
                    <Right iteam={cartdata} />
                </div>
            </div>
        ) : (
            <div className="empty_cart" style={{ textAlign: 'center', marginTop: '50px' }}>
                <img
                    src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
                    alt="Empty Cart"
                    style={{ width: '150px', marginBottom: '20px' }}
                />
                <h2>Your Cart is Empty</h2>
                <p>Looks like you haven’t added anything to your cart yet.</p>
            </div>
        )}
    </>
);


    
}

export default Buynow
