import React, { useContext, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import DeviceList from '../components/DeviceList'
import { observer } from 'mobx-react-lite'
import { Context } from '../index.js'
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI.js'
import Pages from '../components/Pages.js'

const Shop = observer(() => {
    const { device } = useContext(Context)

    useEffect(() => {

        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 12).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })

    }, [device.page, device.selectedType, device.selectedBrand, device.refreshOrNot])

    return (
        <Container>
            <Row className='mt-2'>
                <Col className='p-0'>
                    <DeviceList />
                    <Pages />
                </Col>
            </Row>
        </Container>
    )
})

export default Shop