import React from 'react'
import ApartmentListItem from './UI/ApartmentListItem'
import {Link} from "react-router-dom"

class ApartmentListView extends React.Component {
    render() {
        const {
            awaitingList,
            apartmentList,
        } = this.props

        return (
            <div className="container my-5">
                <div className='row justify-content-center'>
                    <div className='col-lg-8'>
                        <div className='card text-secondary rounded-0'>
                            <div className='card-header bg-light border-0'>
                                <div className="d-flex justify-content-between">
                                    <h2 className='card-title m-0'>Apartamentos</h2>
                                    <Link className="btn btn-secondary" to="/apartment-register">
                                        <i className="fas fa-plus"/>
                                    </Link>
                                </div>
                            </div>
                            <div className='card-body bg-light'>
                                {awaitingList ? (
                                    <div className="d-block text-center">
                                        <div className="spinner-border text-secondary" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                ) : apartmentList && (apartmentList.length > 0) ? (
                                    <div className="list-group list-group-flush" style={{maxHeight: "500px", overflowY: "auto"}}>
                                        {apartmentList.map((apartment, idx) => (
                                            <ApartmentListItem key={idx} apartment={apartment} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="d-block text-center">
                                        <p className="lead mb-2">Nenhum imóvel encontrado</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        )
    }
}

export default ApartmentListView