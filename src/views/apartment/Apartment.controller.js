import React from 'react'
import ApartmentView from './Apartment.view'
import GenericForm from '../../component/genericForm/GenericForm'
import {RestAPI, Mask} from '../../module'
import {withRouter} from "react-router-dom"

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
                    options: [
                        {value: "", label: "Selecione"},
                        {value: "Outro", label: "Outro"},
                        {value: "Bairro 1", label: "Bairro 1"},
                        {value: "Bairro 2", label: "Bairro 2"},
                        {value: "Bairro 3", label: "Bairro 3"},
                        {value: "Bairro 4", label: "Bairro 4"},
                    ],
					value: ""
                },
                neighborhoodInput: {
                    typeInput: GenericForm.FORM_INPUT,
                    hide: true,
					required: true,
                    label: "Especifique o bairro",
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
            currentTab: ApartmentView.TAB.LIST,
            currentStep: ApartmentView.FORM_STEP.APARTMENT,
            awaitingList: false,
            awaitingApartment: false,
            awaitingSubmit: false,
            awaitingDelete: false,
        };

        this.resetForm = this.resetForm.bind(this);
    }
    
    componentDidMount(){        
        if(this.props.match.params.id) this.getApartmentById();
        else this.getAllAparments();
    }

    getAllAparments(){
        this.setState({awaitingList: true});
        RestAPI.GetAllApartments().then((res) => {
            console.log(res)
            this.setState({awaitingList: false});
            if(res.status) {
                this.setState({list: res.data})
            } else {

            }
        }).catch((e) => this.setState({awaitingList: false}, () => {
            console.log(e)
        }));
    }
    
    getApartmentById(){
        this.setState({awaitingApartment: true, currentTab: ApartmentView.TAB.FORM, submitType: ApartmentView.SUBMIT_TYPE.UPDATE});
        RestAPI.GetApartmentById(this.props.match.params.id).then((res) => {
            console.log(res)
            this.setState({awaitingApartment: false});
            if(res.status) {
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
                if(address.neighborhood.options.find((o) => o.value === res.data.address.neighborhood)){
                    address.neighborhood.value = res.data.address.neighborhood;
                } else {
                    address.neighborhood.value = "Outro";
                    address.neighborhoodInput.hide = false;
                    address.neighborhoodInput.value = res.data.address.neighborhood;
                }
                address.streetName.value = res.data.address.streetName;
                address.streetNumber.value = res.data.address.streetNumber;

                this.setState({apartment, address});
            }
        }).catch((e) => this.setState({awaitingApartment: false}, () => {
            console.log(e)
        }));
    }

    toggleStep = (step) => this.setState({currentStep: step});
    toggleTab = (tab) => this.setState({currentTab: tab});

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
                break;
            case "uf":
                address[id].value = Mask.applyMask(Mask.MASK.UF, value).toUpperCase();
                break;
            case "neighborhood":
                address[id].value = value;
                address.neighborhoodInput.hide = value !== "Outro";
                break;
            default:
                address[id].value = value;
                break;
        }
		this.setState({address});
    }
    
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
                this.getAllAparments();
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
                window.alert("Imóvel excluir com sucesso.");             
                this.props.history.push("/apartments")   
            } else {
                window.alert("Houve um erro ao excluir o imóvel, verifique sua conexão e tente novamente.");
            }
        }).catch((e) => this.setState({awaitingDelete: false}, () => {
            console.log(e);
            window.alert("Houve um erro ao excluir o imóvel, verifique sua conexão e tente novamente.");
        }));
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

    render() {
        return (
            <ApartmentView
                awaitingList={this.state.awaitingList}
                awaitingApartment={this.state.awaitingApartment}
                awaitingSubmit={this.state.awaitingSubmit}
                awaitingDelete={this.state.awaitingDelete}
                apartmentList={this.state.list}
                apartmentForm={this.state.apartment}
                addressForm={this.state.address}
                currentTab={this.state.currentTab}
                currentStep={this.state.currentStep}
                submitType={this.state.submitType}
                toggleTab={this.toggleTab.bind(this)}
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