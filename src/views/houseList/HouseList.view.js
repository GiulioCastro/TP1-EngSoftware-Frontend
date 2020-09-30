import React from 'react'
import HouseListItem from './UI/HouseListItem'
import {Link} from "react-router-dom"

class ApartmentListView extends React.Component {
    render() {
        const {
            awaitingList,
            houseList,
        } = this.props

        return (
            <div className="container my-5">
                <div className='row justify-content-center'>
                    <div className='col-lg-8'>
                        <div className='card text-secondary rounded-0'>
                            <div className='card-header bg-light border-0'>
                                <div className="d-flex justify-content-between">
                                    <h2 className='card-title m-0'>Casas</h2>
                                    <Link className="btn btn-secondary" to="/house-register">
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
                                ) : houseList && (houseList.length > 0) ? (
                                    <div className="list-group list-group-flush" style={{maxHeight: "500px", overflowY: "auto"}}>
                                        {houseList.map((house, idx) => (
                                            <HouseListItem key={idx} house={house} />
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