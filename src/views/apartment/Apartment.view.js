import React from 'react'
import ApartmentForm from './UI/ApartmentForm'

import {AddressForm} from '../../component'

class ApartmentView extends React.Component {

    static FORM_STEP = {
        APARTMENT: 1,
        ADDRESS: 2
    }

    static SUBMIT_TYPE = {
        INSERT: 1,
        UPDATE: 2
    }

    render() {
        const {
            awaitingApartment,
            awaitingDelete,
            awaitingSubmit,
            apartmentForm,
            addressForm,
            currentStep,
            submitType,
            onInputApartmentChange,
            onInputAddressChange,
            handleApartmentSubmit,
            handleApartmentDelete,
            handleAddressSubmit,
            handleAddressReturn
        } = this.props

        return (
            <div className="container my-5">
                <div className='row justify-content-center'>
                    <div className='col-lg-8'>
                        {currentStep === ApartmentView.FORM_STEP.APARTMENT ? (
                            <ApartmentForm
                                form={apartmentForm}
                                awaitingData={awaitingApartment}
                                awaitingDelete={awaitingDelete}
                                insertSubmit={submitType === ApartmentView.SUBMIT_TYPE.INSERT}
                                onInputChange={onInputApartmentChange}
                                onSubmit={handleApartmentSubmit}
                                onDelete={handleApartmentDelete}
                            />
                        ) : currentStep === ApartmentView.FORM_STEP.ADDRESS && (
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

export default ApartmentView