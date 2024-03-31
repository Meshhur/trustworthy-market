import React, { useContext, useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import { Context } from '../index.js'
import { observer } from 'mobx-react-lite'

const TypeBar = observer(() => {
    const { device } = useContext(Context)
    const [allTypesActive, setAllTypesActive] = useState(false)

    const getAllTypes = () => {
        device.setSelectedType({});
        setAllTypesActive(true)
    }

    const getType = (type) => {
        device.setSelectedType(type)
        setAllTypesActive(false)
    }

    return (
        <ListGroup>
            <ListGroup.Item
                style={{ cursor: "pointer" }}
                onClick={getAllTypes}
                active={allTypesActive}
            >
                All types
            </ListGroup.Item>
            {device.types.map(type =>
                <ListGroup.Item
                    style={{ cursor: "pointer" }}
                    active={type.id === device.selectedType.id}
                    key={type.id}
                    onClick={() => getType(type)}
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    )
})

export default TypeBar