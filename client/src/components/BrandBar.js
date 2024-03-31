import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { Context } from '../index.js'
import { ListGroup } from 'react-bootstrap'

const BrandBar = observer(() => {
    const { device } = useContext(Context)
    const [getAllBrands, setGetAllBrands] = useState(false)

    const fetchBrands = () => {
        device.setSelectedBrand({})
        setGetAllBrands(true)
    }

    const getBrand = (brand) => {
        device.setSelectedBrand(brand)
        setGetAllBrands(false)
    }

    return (
        <ListGroup>
            <ListGroup.Item
                style={{ cursor: "pointer" }}
                onClick={fetchBrands}
                active={getAllBrands}
            >
                All brands
            </ListGroup.Item>
            {device.brands.map(brand =>
                <ListGroup.Item
                    style={{ cursor: "pointer" }}
                    active={brand.id === device.selectedBrand.id}
                    key={brand.id}
                    onClick={() => getBrand(brand)}
                >
                    {brand.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    )
})

export default BrandBar