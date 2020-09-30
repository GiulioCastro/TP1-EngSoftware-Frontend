import React from 'react'

import {GenericForm} from '../../../../component'

class ApartmentForm extends React.Component {
    render() {
        const {
            form,
            awaitingData,
            awaitingDelete,
            insertSubmit,
            onInputChange,
            onSubmit,
            onDelete,
        } = this.props

        return (
            <div className='card text-secondary rounded-0'>
                <div className='card-header bg-light border-0'>
                    <h2 className='card-title'>Formulário de Apartamento</h2>
                </div>
                <div className='card-body bg-light'>
                    {awaitingData ? (
                        <div className="d-block text-center">
                            <div className="spinner-border text-secondary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={onSubmit}> 
                            <GenericForm
                                form={form}
                                onInputChange={onInputChange}
                            />
                            <div className="row justify-content-center">
                                {!insertSubmit && (
                                    <div className="col-md-6">
                                        <button type="button" className="btn btn-danger btn-block" onClick={onDelete}>                                        
                                            {awaitingDelete ? (
                                                <div className="spinner-border spinner-border-sm" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            ) : (
                                                <React.Fragment>
                                                    <i className="fas fa-times" /> Excluir
                                                </React.Fragment>
                                            )}
                                        </button>
                                    </div>
                                )}
                                <div className="col-md-6">
                                    <button type="submit" className="btn btn-secondary btn-block">
                                        Continuar <i className="fas fa-arrow-right" />
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        )
    }
}

export default ApartmentForm