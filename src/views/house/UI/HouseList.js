import React from 'react'
import HouseListItem from './HouseListItem'

class HouseList extends React.Component {
    render() {
        const {
            list,
            awaitingData
        } = this.props

        return (
            <div className='card text-secondary rounded-0'>
                <div className='card-header bg-light border-0'>
                    <h2 className='card-title'>Casas</h2>
                </div>
                <div className='card-body bg-light'>
                    {awaitingData ? (
                        <div className="d-block text-center">
                            <div className="spinner-border text-secondary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    ) : list && (list.length > 0) ? (
                        <div className="list-group list-group-flush" style={{maxHeight: "500px", overflowY: "auto"}}>
                            {list.map((apartment, idx) => (
                                <HouseListItem key={idx} apartment={apartment} />
                            ))}
                        </div>
                    ) : (
                        <div className="d-block text-center">
                            <p className="lead mb-2">Nenhum imóvel encontrado</p>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default HouseList