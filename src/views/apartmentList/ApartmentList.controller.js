import React from 'react'
import ApartmentListView from './ApartmentList.iew'
import {RestAPI} from '../../module'

class ApartmentListController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            awaitingList: false,
        };
    }
    
    componentDidMount(){        
        this.getAllAparments();
    }

    getAllAparments(){
        this.setState({awaitingList: true});
        RestAPI.GetAllApartments().then((res) => {
            console.log(res)
            this.setState({awaitingList: false});
            if(res.status) {
                this.setState({list: res.data})
            } else {
                window.alert("Não foi possível obter a resposta do servidor, verifique sua conexão e tente novamente.");
            }
        }).catch((e) => this.setState({awaitingList: false}, () => {
            console.log(e)
            window.alert("Não foi possível obter a resposta do servidor, verifique sua conexão e tente novamente.");
        }));
    }

    render() {
        return (
            <ApartmentListView
                awaitingList={this.state.awaitingList}
                apartmentList={this.state.list}
            />
        )
    }
}

export default ApartmentListController