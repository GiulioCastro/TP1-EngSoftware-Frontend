import React from 'react'
import HouseListView from './HouseList.view'
import {RestAPI} from '../../module'

class HouseListController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            awaitingList: false,
        };
    }
    
    componentDidMount(){        
        this.getAllHouses();
    }

    getAllHouses(){
        this.setState({awaitingList: true});
        RestAPI.GetAllHouses().then((res) => {
            console.log(res)
            this.setState({awaitingList: false});
            if(res.status) {
                this.setState({list: res.data})
            } else {
                window.alert("Não foi possível obter a resposta do servidor, verifique sua conexão e tente novamente.");
            }
        }).catch((e) => this.setState({awaitingList: false}, () => {
            console.log(e);
            window.alert("Não foi possível obter a resposta do servidor, verifique sua conexão e tente novamente.");
        }));
    }

    render() {
        return (
            <HouseListView
                awaitingList={this.state.awaitingList}
                houseList={this.state.list}
            />
        )
    }
}

export default HouseListController