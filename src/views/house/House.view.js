import React from 'react'
import HouseForm from './UI/HouseForm/'

import {AddressForm} from '../../component'

class HouseView extends React.Component {

    static FORM_STEP = {
        HOUSE: 1,
        ADDRESS: 2
    }

    static SUBMIT_TYPE = {
        INSERT: 1,
        UPDATE: 2
    }

    render() {
        const {
            awaitingData,
            awaitingDelete,
            awaitingSubmit,
            houseForm,
            addressForm,
            currentStep,
            submitType,
            onInputHouseChange,
            onInputAddressChange,
            handleHouseSubmit,
            handleHouseDelete,
            handleAddressSubmit,
            handleAddressReturn
        } = this.props

        return (
            <div className='container my-5'>
                <div className='row justify-content-center'>
                    <div className='col-lg-8'>
                        {currentStep === HouseView.FORM_STEP.HOUSE ? (
                            <HouseForm
                                form={houseForm}
                                awaitingData={awaitingData}
                                awaitingDelete={awaitingDelete}
                                insertSubmit={submitType === HouseView.SUBMIT_TYPE.INSERT}
                                onInputChange={onInputHouseChange}
                                onSubmit={handleHouseSubmit}
                                onDelete={handleHouseDelete}
                            />
                        ) : currentStep === HouseView.FORM_STEP.ADDRESS && (
                            <AddressForm
                                form={addressForm}
                                onInputChange={onInputAddressChange}
                                onAddressReturn={handleAddressReturn}
                                onSubmit={handleAddressSubmit}
                                awaitingSubmit={awaitingSubmit}
                            />
                        )}
                    </div>    
                </div>
            </div>
        )
    }
}

export default HouseView