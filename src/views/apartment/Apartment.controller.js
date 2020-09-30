import React from 'react';
import ApartmentView from './Apartment.view';
import GenericForm from '../../component/genericForm/GenericForm';
import {RestAPI, Mask} from '../../module';
import {withRouter} from "react-router-dom";

class ApartmentController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apartment: {
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
                diningRoomsQuantity: {
					typeInput: GenericForm.FORM_INPUT,
					xl: "6",
					required: true,
					label: "Quantidade de Salas de Jantar",
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
					xl: "6",
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
                floor: {
					typeInput: GenericForm.FORM_INPUT,
					required: true,
					label: "Andar",
					value: ""
                },
                condominiumValue: {
					typeInput: GenericForm.FORM_INPUT,
					xl: "6",
					required: true,
					label: "Valor do Condomínio",
					value: ""
                },
                rentValue: {
					typeInput: GenericForm.FORM_INPUT,
					xl: "6",
					required: true,
					label: "Valor do Aluguel",
					value: ""
                },
                has24HourConcierge: {
					typeInput: GenericForm.FORM_CHECKBOX,
					label: "Possui Portaria",
					value: false
                },
                description: {
					typeInput: GenericForm.FORM_TEXTAREA,
					required: true,
					maxLength: 150,
					rows: 4,
					label: "Descrição (max 150 carateres)",
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
                    xl: "3",
					required: true,
					label: "UF",
					value: ""
                },
                city: {
                    typeInput: GenericForm.FORM_INPUT,
                    xl: "9",
					required: true,
					label: "Cidade",
					value: ""
                },
                neighborhood: {
                    typeInput: GenericForm.FORM_SELECT,
					required: true,
                    label: "Bairro",
					value: ""
                },
                streetName: {
                    typeInput: GenericForm.FORM_INPUT,
                    xl: "9",
					required: true,
					label: "Logradouro",
					value: ""
                },
                streetNumber: {
                    typeInput: GenericForm.FORM_INPUT,
                    xl: "3",
					required: true,
					label: "Número",
					value: ""
                }
            },
            list: [],
            submitType: ApartmentView.SUBMIT_TYPE.INSERT,
            currentStep: ApartmentView.FORM_STEP.APARTMENT,
            awaitingData: false,
            awaitingSubmit: false,
            awaitingDelete: false,
        };

        this.resetForm = this.resetForm.bind(this);
    }
    
    componentDidMount(){        
        if(this.props.match.params.id) this.getApartmentById();
    }

    getApartmentById(){
        this.setState({awaitingData: true, submitType: ApartmentView.SUBMIT_TYPE.UPDATE});
        return RestAPI.GetApartmentById(this.props.match.params.id).then((res) => {
            console.log(res)
            this.setState({awaitingData: false});
            if(res.status && res.data) {
                let {apartment, address} = this.state;
                
                apartment.roomsQuantity.value = res.data.roomsQuantity;
                apartment.suitesQuantity.value = res.data.suitesQuantity;
                apartment.livingRoomsQuantity.value = res.data.livingRoomsQuantity;
                apartment.diningRoomsQuantity.value = res.data.diningRoomsQuantity;
                apartment.parkingSpaces.value = res.data.parkingSpaces;
                apartment.area.value = res.data.area;
                apartment.hasCloset.value = res.data.hasCloset;
                apartment.floor.value = res.data.floor;
                apartment.condominiumValue.value = Mask.formatDecimal(res.data.condominiumValue.toFixed(2), "R$");
                apartment.rentValue.value = Mask.formatDecimal(res.data.rentValue.toFixed(2), "R$");
                apartment.has24HourConcierge.value = res.data.has24HourConcierge;
                apartment.description.value = res.data.description;
                
                address.zipCode.value = Mask.applyMask(Mask.MASK.ZIP_CODE, res.data.address.zipCode);
                address.uf.value = res.data.address.uf;
                address.city.value = res.data.address.city;
                address.neighborhood.value = res.data.address.neighborhood;
                address.streetName.value = res.data.address.streetName;
                address.streetNumber.value = res.data.address.streetNumber;

                this.setState({apartment, address});
            } else {
                window.alert("Não foi possível obter a resposta do servidor, verifique sua conexão e tente novamente.");        
                this.props.history.push("/apartments");
            }
        }).catch((e) => this.setState({awaitingData: false}, () => {
            console.log(e);
            window.alert("Não foi possível obter a resposta do servidor, verifique sua conexão e tente novamente.");        
            this.props.history.push("/apartments");
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

    onInputApartmentChange(value, id) {
		let {apartment} = this.state;
        switch(id){
            case "rentValue":
            case "condominiumValue":
                apartment[id].value = Mask.formatDecimal(value, "R$");
                break;
            default:
                apartment[id].value = value;
                break;
        }
		this.setState({apartment});
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
        let {apartment, address} = this.state;

        Object.keys(apartment).map((key) => { 
            if(apartment[key].typeInput === GenericForm.FORM_CHECKBOX) apartment[key].value = false;
            else apartment[key].value = "";
        });

        Object.keys(address).map((key) => address[key].value = "");

		this.setState({apartment, address, currentStep: ApartmentView.FORM_STEP.APARTMENT});
    }

    toggleStep = (step) => this.setState({currentStep: step});
    
    handleApartmentSubmit(e){
        e.preventDefault();
        this.toggleStep(ApartmentView.FORM_STEP.ADDRESS);
    }

    handleAddressSubmit(e){
        e.preventDefault();
        this.setState({awaitingSubmit: true});
        const {apartment, address} = this.state;

        let body = {
            address: {
                zipCode: Mask.unmask(address.zipCode.value),
                uf: address.uf.value,
                city: address.city.value,
                neighborhood: address.neighborhood.value === "Outro" ? address.neighborhoodInput.value : address.neighborhood.value,
                streetName: address.streetName.value,
                streetNumber: address.streetNumber.value,
            },
            roomsQuantity: apartment.roomsQuantity.value,
            suitesQuantity: apartment.suitesQuantity.value,
            livingRoomsQuantity: apartment.livingRoomsQuantity.value,
            diningRoomsQuantity: apartment.diningRoomsQuantity.value,
            parkingSpaces: apartment.parkingSpaces.value,
            area: apartment.area.value,
            hasCloset: apartment.hasCloset.value,
            floor: apartment.floor.value,
            condominiumValue: Mask.unmaskDecimal(apartment.condominiumValue.value, "R$"),
            rentValue: Mask.unmaskDecimal(apartment.rentValue.value, "R$"),
            has24HourConcierge: apartment.has24HourConcierge.value,
            description: apartment.description.value,
        }

        console.log(body)
        
        switch(this.state.submitType){
            case ApartmentView.SUBMIT_TYPE.INSERT:
                this.insertApartment(body);
                break;
            case ApartmentView.SUBMIT_TYPE.UPDATE:
                body._id = this.props.match.params.id;
                this.updateApartment(body);
                break;
            default:
                this.setState({awaitingSubmit: false});
                break;
        }
    }

    insertApartment(apartment){
        RestAPI.InsertApartment(apartment).then((res) => {
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

    updateApartment(apartment){
        RestAPI.UpdateApartment(apartment).then((res) => {
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

    deleteApartnent(){
        let res = window.confirm("Tem certeza que deseja excluir este imóvel?");
        if(!res) return;
        this.setState({awaitingDelete: true});
        RestAPI.DeleteApartment(this.props.match.params.id).then((res) => {
            console.log(res);
            this.setState({awaitingDelete: false});
            if(res.status){
                window.alert("Imóvel excluído com sucesso.");             
                this.props.history.push("/apartments");
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
            <ApartmentView
                awaitingData={this.state.awaitingData}
                awaitingSubmit={this.state.awaitingSubmit}
                awaitingDelete={this.state.awaitingDelete}
                apartmentForm={this.state.apartment}
                addressForm={this.state.address}
                currentStep={this.state.currentStep}
                submitType={this.state.submitType}
                onInputApartmentChange={this.onInputApartmentChange.bind(this)}
                onInputAddressChange={this.onInputAddressChange.bind(this)}
                handleApartmentSubmit={this.handleApartmentSubmit.bind(this)}
                handleApartmentDelete={this.deleteApartnent.bind(this)}
                handleAddressSubmit={this.handleAddressSubmit.bind(this)}
                handleAddressReturn={() => this.toggleStep(ApartmentView.FORM_STEP.APARTMENT)}
            />
        )
    }
}

export default withRouter(ApartmentController)