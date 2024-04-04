import React, { useContext, useEffect } from 'react'
import { Card, Col, Container, Image, Row } from 'react-bootstrap'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "../css/devicePage.css"
import { addToBasket, fetchDevice } from '../http/deviceAPI'
import { observer } from 'mobx-react-lite'
import { Context } from '../index.js'
import { REGISTRATION_ROUTE } from '../utils/consts.js'

const DevicePage = observer(() => {
    const navigate = useNavigate()
    const { user } = useContext(Context)
    const [device, setDevice] = useState({ info: [] })
    const { id } = useParams()
    useEffect(() => {
        fetchDevice(id).then(data => setDevice(data))
    }, [id])

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
        <Container className='my-3'>
            <Row className='d-flex justify-content-center'>
                <Card className='p-4 flex-row device-page-card'>
                    <Col md={4} className='img-container border border-primary py-4 d-flex flex-row justify-content-center'>
                        <Image className='device-img' width={420} height={410} src={"http://localhost:7000/" + device.img} />
                    </Col>
                    <Col md={8} className='full-info d-flex flex-column'>
                        <div className='pb-1'>
                            <h2 className='device-name'>{device.name}</h2>
                        </div>
                        <div className='border-style-info'>
                            {device.info.map((info, index) => (
                                <div
                                    className='device-info'
                                    key={info.id}
                                >
                                    <p>{info.title}: </p>
                                    <p>{info.description}</p>
                                </div>
                            ))}
                        </div>
                        <hr />
                        <div className='price-buy'>
                            <div className='price'>{device.price}$</div>
                            <button className='buy' onClick={() => appendToBasket(user.user.id, id)}>
                                <svg viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="active"><path d="M16.5 15.355C17.3284 15.355 18 14.6834 18 13.855C18 13.0266 17.3284 12.355 16.5 12.355C15.6716 12.355 15 13.0266 15 13.855C15 14.6834 15.6716 15.355 16.5 15.355Z" fill="white"></path><path d="M5.625 15.355C6.45342 15.355 7.12499 14.6834 7.12499 13.855C7.12499 13.0266 6.45342 12.355 5.625 12.355C4.79657 12.355 4.125 13.0266 4.125 13.855C4.125 14.6834 4.79657 15.355 5.625 15.355Z" fill="white"></path><path d="M17.6249 10.48H5.91411L6.16423 10.0742C6.27148 9.9002 6.30298 9.68983 6.25161 9.49183L6.00748 8.55208L16.8761 7.98733C17.2882 7.96633 17.6249 7.61121 17.6249 7.19871V2.22997C17.6249 1.81748 17.2874 1.47998 16.875 1.47998H4.16961L4.02299 0.916354C3.98122 0.755602 3.88727 0.613263 3.75587 0.511665C3.62448 0.410066 3.46308 0.354957 3.29699 0.35498H0.749998C0.551086 0.35498 0.360321 0.433998 0.219669 0.57465C0.0790174 0.715302 0 0.906066 0 1.10498C0 1.30389 0.0790174 1.49465 0.219669 1.63531C0.360321 1.77596 0.551086 1.85498 0.749998 1.85498H2.71724L4.71974 9.55933L3.93224 10.8362C3.86219 10.9498 3.82376 11.0801 3.82093 11.2135C3.81809 11.3469 3.85096 11.4787 3.91611 11.5952C3.98101 11.7118 4.07589 11.809 4.19094 11.8766C4.30599 11.9443 4.43702 11.9799 4.57049 11.9799H17.6249C17.8239 11.9799 18.0146 11.9009 18.1553 11.7603C18.2959 11.6196 18.3749 11.4289 18.3749 11.2299C18.3749 11.031 18.2959 10.8403 18.1553 10.6996C18.0146 10.559 17.8239 10.48 17.6249 10.48Z" fill="white"></path></svg>
                            </button>
                        </div>
                        <hr />
                    </Col>
                </Card>
            </Row>
        </Container>
    );

})

export default DevicePage