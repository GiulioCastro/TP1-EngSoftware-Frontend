import React from 'react'
import ApartmentList from './UI/ApartmentList'
import ApartmentForm from './UI/ApartmentForm'

import {AddressForm} from '../../component'

class ApartmentView extends React.Component {

    static TAB = {
        FORM: 1,
        LIST: 2
    }

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
            awaitingList,
            awaitingApartment,
            awaitingDelete,
            awaitingSubmit,
            apartmentList,
            apartmentForm,
            addressForm,
            currentTab,
            currentStep,
            submitType,
            toggleTab,
            onInputApartmentChange,
            onInputAddressChange,
            handleApartmentSubmit,
            handleApartmentDelete,
            handleAddressSubmit,
            handleAddressReturn
        } = this.props

        return (
            <div className="container my-5">
                {submitType === ApartmentView.SUBMIT_TYPE.INSERT && (
                    <div className="row justify-content-center mb-3">
                        <div className="col-lg-8">
                            <div className="btn-group btn-block">
                                <button className={`btn btn-dark ${currentTab === ApartmentView.TAB.LIST && 'active'}`} onClick={() => toggleTab(ApartmentView.TAB.LIST)}>
                                    Lista
                                </button>
                                <button className={`btn btn-dark ${currentTab === ApartmentView.TAB.FORM && 'active'}`} onClick={() => toggleTab(ApartmentView.TAB.FORM)}>
                                    Cadastro
                                </button>
                            </div>  
                        </div>  
                    </div>
                )}
                <div className='row justify-content-center'>
                    {currentTab === ApartmentView.TAB.FORM ? (
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
                    ) : currentTab === ApartmentView.TAB.LIST && (
                        <div className='col-lg-8'>
                            <ApartmentList
                                list={apartmentList}
                                awaitingData={awaitingList}
                            />
                        </div>  
                    )}
                </div>
            </div>
        )
    }
}

export default ApartmentView