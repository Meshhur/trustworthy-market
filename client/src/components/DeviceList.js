import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from '../index'
import DeviceItem from './DeviceItem'

const DeviceList = observer(() => {
    const { device } = useContext(Context)

    return (
        <div className='d-flex flex-wrap justify-content-start byOne'>
            {device.devices.map(device =>
                <DeviceItem key={device.id} device={device}/>
            )}
        </div>
    )
})

export default DeviceList