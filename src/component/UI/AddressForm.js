import React from 'react'

import { GenericForm } from '../'

class AddressForm extends React.Component {
    render() {
        const {
            form,
            onInputChange,
            onAddressReturn,
            onSubmit,
            awaitingSubmit
        } = this.props

        return (
            <div className='card text-secondary rounded-0'>
                <div className='card-header bg-light border-0'>
                    <h2 className='card-title'>Endereço</h2>
                </div>
                <div className='card-body bg-light'>
                    <form onSubmit={onSubmit}>
                        <GenericForm
                            form={form}
                            onInputChange={onInputChange}
                        />
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <button type="button" className="btn btn-secondary btn-block" onClick={onAddressReturn}>
                                    <i className="fas fa-arrow-left" /> Voltar
                                </button>
                            </div>
                            <div className="col-md-6">
                                <button type="submit" className="btn btn-secondary btn-block">
                                    {awaitingSubmit ? (
                                        <div className="spinner-border spinner-border-sm" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    ) : (
                                        <React.Fragment>
                                            <i className="fas fa-check" /> Salvar
                                        </React.Fragment>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddressForm