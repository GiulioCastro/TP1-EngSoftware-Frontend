import React from 'react'
import { Link } from "react-router-dom";
import { Mask } from '../../../../module'

class ApartmentListItem extends React.Component {
    render() {
        const {
            apartment,
        } = this.props

        return (
            <Link to={`/apartment/${apartment._id}`} className="list-group-item list-group-item-action list-group-item-light">
                <div className="row">
                    <div className="col-3">
                        <div className="d-flex align-items-center justify-content-center bg-secondary" style={{height: "135px", width: "135px"}}>
                            <i className="fas fa-building fa-3x text-light" />
                        </div>
                    </div>
                    <div className="col-9 d-flex flex-column justify-content-between">
                        <div className="row mb-4">
                            <div className="col-9 d-flex flex-column justify-content-between">
                                <p className="lead mb-2">{apartment.description}</p>
                                <p className="m-0">{apartment.roomsQuantity} quarto(s) | {apartment.area}m² | {apartment.parkingSpaces} vaga(s)</p>
                            </div>
                            <div className="col-3 text-right">
                                <p className="font-weight-bold mb-2">{Mask.formatDecimal(apartment.rentValue.toFixed(2), "R$")}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-9">
                                <p className="small m-0">{apartment.address.city}, {apartment.address.neighborhood}</p>
                            </div>
                            <div className="col-3 text-right">
                                <p className="small m-0">{Mask.formatDate(apartment.createdAt)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
}

export default ApartmentListItem