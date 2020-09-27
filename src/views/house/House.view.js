import React from 'react'
import HouseList from './UI/HouseList'
import HouseForm from './UI/HouseForm'

import {AddressForm} from '../../component'

class HouseView extends React.Component {

    static TAB = {
        FORM: 1,
        LIST: 2
    }

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
            awaitingList,
            awaitingHouse,
            awaitingDelete,
            awaitingSubmit,
            houseList,
            houseForm,
            addressForm,
            currentTab,
            currentStep,
            submitType,
            toggleTab,
            onInputHouseChange,
            onInputAddressChange,
            handleHouseSubmit,
            handleHouseDelete,
            handleAddressSubmit,
            handleAddressReturn
        } = this.props

        return (
            <div className='container my-5'>
                {submitType === HouseView.SUBMIT_TYPE.INSERT && (
                    <div className="row justify-content-center mb-3">
                        <div className="col-lg-8">
                            <div className="btn-group btn-block">
                                <button className={`btn btn-dark ${currentTab === HouseView.TAB.LIST && 'active'}`} onClick={() => toggleTab(HouseView.TAB.LIST)}>
                                    Lista
                                </button>
                                <button className={`btn btn-dark ${currentTab === HouseView.TAB.FORM && 'active'}`} onClick={() => toggleTab(HouseView.TAB.FORM)}>
                                    Cadastro
                                </button>
                            </div>  
                        </div>  
                    </div>
                )}
                <div className='row justify-content-center'>
                    {currentTab === HouseView.TAB.FORM ? (
                        <div className='col-lg-8'>
                            {currentStep === HouseView.FORM_STEP.HOUSE ? (
                                <HouseForm
                                    form={houseForm}
                                    awaitingData={awaitingHouse}
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
                    ) : currentTab === HouseView.TAB.LIST && (
                        <div className='col-lg-8'>
                            <HouseList
                                list={houseList}
                                awaitingData={awaitingList}
                            />
                        </div> 
                    )}
                </div>
            </div>
        )
    }
}

export default HouseView