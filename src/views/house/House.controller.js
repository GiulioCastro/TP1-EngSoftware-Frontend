import React from 'react'
import HouseView from './House.view'
import GenericForm from '../../component/genericForm/GenericForm'
import {RestAPI, Mask} from '../../module'
import {withRouter} from "react-router-dom"

class HouseController extends React.Component {    
    constructor(props) {
        super(props);
        this.state = {
            house: {
                roomsQuantity: {
					typeInput: GenericForm.FORM_INPUT,
					xl: "6",
					required: true,
					label: "Quantidade de Quartos",
					type: "number",
					value: ""
                },
                suitesQuantity: {
					typeInput: GenericForm.FORM_INPUT,
					xl: "6",
					required: true,
					label: "Quantidade de Suítes",
					type: "number",
					value: ""
                },
                livingRoomsQuantity: {
					typeInput: GenericForm.FORM_INPUT,
					xl: "6",
					required: true,
					label: "Quantidade de Salas de Estar",
					type: "number",
					value: ""
                },
                parkingSpaces: {
					typeInput: GenericForm.FORM_INPUT,
					xl: "6",
					required: true,
					label: "Vagas de Garagem",
					type: "number",
					value: ""
                },
                area: {
					typeInput: GenericForm.FORM_INPUT,
					required: true,
					label: "Área (m²)",
					type: "number",
					value: ""
                },
                hasCloset: {
					typeInput: GenericForm.FORM_CHECKBOX,
					label: "Possui Armário Embutido",
					value: false
                },
                rentValue: {
					typeInput: GenericForm.FORM_INPUT,
					required: true,
					label: "Valor do Aluguel",
					value: ""
                },
                description: {
					typeInput: GenericForm.FORM_TEXTAREA,
					required: true,
					maxLength: 50,
					rows: 4,
					label: "Descrição",
					value: ""
                },
            },
            address: {
                zipCode: {
					typeInput: GenericForm.FORM_INPUT,
					required: true,
					label: "CEP",
					value: ""
                },
                uf: {
                    typeInput: GenericForm.FORM_INPUT,
                    xl: "4",
					required: true,
					label: "UF",
					value: ""
                },
                city: {
                    typeInput: GenericForm.FORM_INPUT,
                    xl: "8",
					required: true,
					label: "Cidade",
					value: ""
                },
                neighborhood: {
                    typeInput: GenericForm.FORM_INPUT,
					required: true,
                    label: "Bairro",
					value: ""
                },
                streetName: {
                    typeInput: GenericForm.FORM_INPUT,
                    xl: "8",
					required: true,
					label: "Logradouro",
					value: ""
                },
                streetNumber: {
                    typeInput: GenericForm.FORM_INPUT,
                    xl: "4",
					required: true,
					label: "Número",
					value: ""
                }
            },
            currentStep: HouseView.FORM_STEP.HOUSE,
            submitType: HouseView.SUBMIT_TYPE.INSERT,
            awaitingData: false,
            awaitingSubmit: false,
            awaitingDelete: false,
        };
        this.resetForm = this.resetForm.bind(this);
    }

    componentDidMount(){        
        if(this.props.match.params.id) this.getHouseById();
    }

    getHouseById(){
        this.setState({awaitingData: true, submitType: HouseView.SUBMIT_TYPE.UPDATE});
        RestAPI.GetHouseById(this.props.match.params.id).then((res) => {
            console.log(res)
            this.setState({awaitingData: false});
            if(res.status && res.data) {
                let {house, address} = this.state;
                
                house.roomsQuantity.value = res.data.roomsQuantity;
                house.suitesQuantity.value = res.data.suitesQuantity;
                house.livingRoomsQuantity.value = res.data.livingRoomsQuantity;
                house.parkingSpaces.value = res.data.parkingSpaces;
                house.area.value = res.data.area;
                house.hasCloset.value = res.data.hasCloset;
                house.rentValue.value = Mask.formatDecimal(res.data.rentValue.toFixed(2), "R$");
                house.description.value = res.data.description;
                
                address.zipCode.value = Mask.applyMask(Mask.MASK.ZIP_CODE, res.data.address.zipCode);
                address.uf.value = res.data.address.uf;
                address.city.value = res.data.address.city;
                address.neighborhood.value = res.data.address.neighborhood;
                address.streetName.value = res.data.address.streetName;
                address.streetNumber.value = res.data.address.streetNumber;

                this.setState({house, address});
            } else {
                window.alert("Não foi possível obter a resposta do servidor, verifique sua conexão e tente novamente.");        
                this.props.history.push("/houses");
            }
        }).catch((e) => this.setState({awaitingData: false}, () => {
            console.log(e);
            window.alert("Não foi possível obter a resposta do servidor, verifique sua conexão e tente novamente.");        
            this.props.history.push("/houses");
        }));
    }

    getAddressByCep(cep){
        RestAPI.GetAddressByCep(cep).then((res) => {
            console.log(res);
			if(!res.erro){
                let {address} = this.state;
                address.streetName.value = res.logradouro;
                address.neighborhood.value = res.bairro;
                address.city.value = res.localidade;
                address.uf.value = res.uf;
                this.setState({address});
			}
		}).catch((e) => console.log("erro", e));
    }

    onInputHouseChange(value, id) {
		let {house} = this.state;
        switch(id){
            case "rentValue":
                house[id].value = Mask.formatDecimal(value, "R$");
                break;
            default:
                house[id].value = value;
                break;
        }
		this.setState({house});
    }
    
    onInputAddressChange(value, id) {
		let {address} = this.state;
        switch(id){
            case "zipCode":
                address[id].value = Mask.applyMask(Mask.MASK.ZIP_CODE, value);
                if(address[id].value.match(/[0-9]{5}-[0-9]{3}/)){
                    this.getAddressByCep(address[id].value);
                }
                break;
            case "uf":
                address[id].value = Mask.applyMask(Mask.MASK.UF, value).toUpperCase();
                break;
            default:
                address[id].value = value;
                break;
        }
		this.setState({address});
	}

    resetForm(){
        let {house, address} = this.state;

        Object.keys(house).map((key) => { 
            if(house[key].typeInput === GenericForm.FORM_CHECKBOX) house[key].value = false;
            else house[key].value = "";
        });

        Object.keys(address).map((key) => address[key].value = "");

		this.setState({house, address, currentStep: HouseView.FORM_STEP.HOUSE});
    }

    toggleStep = (step) => this.setState({currentStep: step});

    handleHouseSubmit(e){
        e.preventDefault();
        this.toggleStep(HouseView.FORM_STEP.ADDRESS);
    }

    handleAddressSubmit(e){
        e.preventDefault();
        this.setState({awaitingSubmit: true});
        const {house, address} = this.state;

        let body = {
            address: {
                zipCode: address.zipCode.value,
                uf: address.uf.value,
                city: address.city.value,
                neighborhood: address.neighborhood.value === "Outro" ? address.neighborhoodInput.value : address.neighborhood.value,
                streetName: address.streetName.value,
                streetNumber: address.streetNumber.value,
            },
            roomsQuantity: house.roomsQuantity.value,
            suitesQuantity: house.suitesQuantity.value,
            livingRoomsQuantity: house.livingRoomsQuantity.value,
            parkingSpaces: house.parkingSpaces.value,
            area: house.area.value,
            hasCloset: house.hasCloset.value,
            description: house.description.value,
            rentValue: Mask.unmaskDecimal(house.rentValue.value, "R$"),
        }

        console.log(body)
        
        switch(this.state.submitType){
            case HouseView.SUBMIT_TYPE.INSERT:
                this.insertHouse(body);
                break;
            case HouseView.SUBMIT_TYPE.UPDATE:
                body._id = this.props.match.params.id;
                this.updateHouse(body);
                break;
            default:
                this.setState({awaitingSubmit: false});
                break;
        }
    }

    insertHouse(house){
        RestAPI.InsertHouse(house).then((res) => {
            console.log(res);
            this.setState({awaitingSubmit: false});
            if(res.status){
                window.alert("Imóvel adicionado com sucesso.");
                this.resetForm();
            } else {
                window.alert("Houve um erro ao adicionar o imóvel, verifique sua conexão e tente novamente.");
            }
        }).catch((e) => this.setState({awaitingSubmit: false}, () => {
            console.log(e);
            window.alert("Houve um erro ao adicionar o imóvel, verifique sua conexão e tente novamente.");
        }));
    }

    updateHouse(house){
        RestAPI.UpdateHouse(house).then((res) => {
            console.log(res);
            this.setState({awaitingSubmit: false});
            if(res.status){
                window.alert("Imóvel atualizado com sucesso.");
            } else {
                window.alert("Houve um erro ao atualizar o imóvel, verifique sua conexão e tente novamente.");
            }
        }).catch((e) => this.setState({awaitingSubmit: false}, () => {
            console.log(e);
            window.alert("Houve um erro ao atualizar o imóvel, verifique sua conexão e tente novamente.");
        }));
    }

    deleteHouse(){
        let res = window.confirm("Tem certeza que deseja excluir este imóvel?");
        if(!res) return;
        this.setState({awaitingDelete: true});
        RestAPI.DeleteHouse(this.props.match.params.id).then((res) => {
            console.log(res);
            this.setState({awaitingDelete: false});
            if(res.status){
                window.alert("Imóvel excluído com sucesso.");             
                this.props.history.push("/houses")   
            } else {
                window.alert("Houve um erro ao excluir o imóvel, verifique sua conexão e tente novamente.");
            }
        }).catch((e) => this.setState({awaitingDelete: false}, () => {
            console.log(e);
            window.alert("Houve um erro ao excluir o imóvel, verifique sua conexão e tente novamente.");
        }));
    }

    render() {
        return (
            <HouseView
                awaitingData={this.state.awaitingData}
                awaitingSubmit={this.state.awaitingSubmit}
                awaitingDelete={this.state.awaitingDelete}
                houseForm={this.state.house}
                addressForm={this.state.address}
                currentStep={this.state.currentStep}
                submitType={this.state.submitType}
                onInputHouseChange={this.onInputHouseChange.bind(this)}
                onInputAddressChange={this.onInputAddressChange.bind(this)}
                handleHouseSubmit={this.handleHouseSubmit.bind(this)}
                handleHouseDelete={this.deleteHouse.bind(this)}
                handleAddressSubmit={this.handleAddressSubmit.bind(this)}
                handleAddressReturn={() => this.toggleStep(HouseView.FORM_STEP.HOUSE)}
            />
        )
    }
}

export default withRouter(HouseController)