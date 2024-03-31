import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import CreateBrand from '../components/modals/CreateBrand'
import CreateType from '../components/modals/CreateType'
import CreateDevice from '../components/modals/CreateDevice'
import { observer } from 'mobx-react-lite'

const Admin = observer(() => {
    const [brandVis, setBrandVis] = useState(false)
    const [typeVis, setTypeVis] = useState(false)
    const [deviceVis, setDeviceVis] = useState(false)

    return (
        <Container className='d-flex flex-column'>
            <Button
                variant='outline-dark'
                className='mt-4 p-2'
                onClick={() => setTypeVis(true)}
            >
                Add type
            </Button>
            <Button
                variant='outline-dark'
                className='mt-4 p-2'
                onClick={() => setBrandVis(true)}
            >
                Add brand
            </Button>
            <Button
                variant='outline-dark'
                className='mt-4 p-2'
                onClick={() => setDeviceVis(true)}
            >
                Add device
            </Button>

            <CreateType show={typeVis} onHide={() => setTypeVis(false)} />
            <CreateBrand show={brandVis} onHide={() => setBrandVis(false)} />
            <CreateDevice show={deviceVis} onHide={() => setDeviceVis(false)} />


        </Container>
    )
})

export default Admin