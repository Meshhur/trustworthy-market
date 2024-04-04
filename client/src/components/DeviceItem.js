import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Context } from "../index.js"
import "../css/productLook.css"
import { REGISTRATION_ROUTE, UPDATE_PRODUCT } from '../utils/consts.js'
import { observer } from 'mobx-react-lite'
import { addToBasket } from '../http/deviceAPI.js'

const DeviceItem = observer(({ device }) => {
    const { user } = useContext(Context)
    const navigate = useNavigate()
    console.log(user);
    const [mdScreen, setMdScreen] = useState(getMdScreen(window.innerWidth));

    function getMdScreen(screenSize) {
        if (screenSize > 992) {
            return 3;
        } else if (screenSize > 760) {
            return 4;
        } else {
            return 6
        }
    }

    useEffect(() => {
        function handleResize() {
            setMdScreen(getMdScreen(window.innerWidth));
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const appendToBasket = (basketId, deviceId) => {
        if (basketId) {
            try {
                addToBasket(basketId, deviceId)
                user.setIsBasket(true)
                alert("Added to basket")
            } catch (error) {
                console.log("ERROR: ", error);
            }
        } else {
            navigate(REGISTRATION_ROUTE)
        }
    }

    return (
        <Col md={mdScreen} className='product'>
            <Card className='custom-card'>
                <Image
                    className='product-img'
                    src={`http://localhost:7000/${device.img}`}
                    onClick={() => navigate("device/" + device.id)}
                />
                <div className='info' onClick={() => navigate("device/" + device.id)}>
                    <h3 className='product-title'>{device.name}</h3>
                </div>
                <div className='priceBuy'>
                    <div className='product-price'>
                        <p className='custom-price'>{device.price}</p>
                        <p>$</p>
                    </div>
                    <div className='like-basket d-flex'>
                        <button className='like'>
                            <svg className="icon-liked h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212.6 212.6">
                                <path stroke="#EC6323" strokeWidth="13" fill="none" d="M 106.3 193.05 C 103.528 193.049 100.848 192.043 98.76 190.22 C 90.88 183.33 83.29 176.85 76.59 171.14 L 76.59 171.14 C 56.94 154.4 39.98 139.94 28.17 125.7 C 14.98 109.78 8.83 94.7 8.83 78.19 C 8.83 62.19 14.33 47.38 24.3 36.56 C 29.252 31.159 35.282 26.856 41.999 23.928 C 48.716 21 55.973 19.512 63.3 19.56 C 74.404 19.512 85.201 23.241 93.91 30.13 C 98.638 33.824 102.811 38.179 106.3 43.06 C 109.789 38.179 113.962 33.824 118.69 30.13 C 127.405 23.231 138.214 19.498 149.33 19.55 C 156.657 19.502 163.914 20.99 170.631 23.918 C 177.348 26.846 183.378 31.149 188.33 36.55 C 198.33 47.37 203.8 62.15 203.8 78.18 C 203.8 94.67 197.65 109.77 184.46 125.69 C 172.65 139.93 155.69 154.39 136.04 171.13 C 129.33 176.85 121.72 183.33 113.83 190.24 C 111.741 192.052 109.066 193.05 106.3 193.05 Z" />
                            </svg>
                        </button>
                        <button className='toBasket' onClick={() => appendToBasket(user.user.id, device.id)}>
                            <svg className="icon-basket w-5" viewBox="0 0 19 16" xmlns="http://www.w3.org/2000/svg">
                                <path fill="white" d="M16.5 15.355C17.3284 15.355 18 14.6834 18 13.855C18 13.0266 17.3284 12.355 16.5 12.355C15.6716 12.355 15 13.0266 15 13.855C15 14.6834 15.6716 15.355 16.5 15.355ZM5.625 15.355C6.45342 15.355 7.12499 14.6834 7.12499 13.855C7.12499 13.0266 6.45342 12.355 5.625 12.355C4.79657 12.355 4.125 13.0266 4.125 13.855C4.125 14.6834 4.79657 15.355 5.625 15.355ZM17.6249 10.48H5.91411L6.16423 10.0742C6.27148 9.9002 6.30298 9.68983 6.25161 9.49183L6.00748 8.55208L16.8761 7.98733C17.2882 7.96633 17.6249 7.61121 17.6249 7.19871V2.22997C17.6249 1.81748 17.2874 1.47998 16.875 1.47998H4.16961L4.02299 0.916354C3.98122 0.755602 3.88727 0.613263 3.75587 0.511665C3.62448 0.410066 3.46308 0.354957 3.29699 0.35498H0.749998C0.551086 0.35498 0.360321 0.433998 0.219669 0.57465C0.0790174 0.715302 0 0.906066 0 1.10498C0 1.30389 0.0790174 1.49465 0.219669 1.63531C0.360321 1.77596 0.551086 1.85498 0.749998 1.85498H2.71724L4.71974 9.55933L3.93224 10.8362C3.86219 10.9498 3.82376 11.0801 3.82093 11.2135C3.81809 11.3469 3.85096 11.4787 3.91611 11.5952C3.98101 11.7118 4.07589 11.809 4.19094 11.8766C4.30599 11.9443 4.43702 11.9799 4.57049 11.9799H17.6249C17.8239 11.9799 18.0146 11.9009 18.1553 11.7603C18.2959 11.6196 18.3749 11.4289 18.3749 11.2299C18.3749 11.031 18.2959 10.8403 18.1553 10.6996C18.0146 10.559 17.8239 10.48 17.6249 10.48Z" />
                            </svg>
                        </button>
                    </div>
                </div>
                {user?.user?.role === "ADMIN" ?
                    <Button variant='outline-dark' onClick={() => navigate(UPDATE_PRODUCT + "/" + device.id)}>
                        Update this item
                    </Button>
                    :
                    <br />
                }
            </Card>
        </Col>
    )
})

export default DeviceItem