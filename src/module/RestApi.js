export default class RestAPI{
    static URL = "http://localhost:3001";

    static httpMethod(method, url, body){
        return fetch(url, {
            method, 
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify(body)
        }).then((res) => res.json());
    }

    static httpGet = (url) => RestAPI.httpMethod("GET", url);
    static httpPost = (url, body) => RestAPI.httpMethod("POST", url, body);
    static httpPut = (url, body) => RestAPI.httpMethod("PUT", url, body);
    static httpDelete = (url) => RestAPI.httpMethod("DELETE", url);

    // ************************************************** //
    // House Controller
    // ************************************************** //
    static URL_HOUSE = `${RestAPI.URL}/houses`;

    static GetHouseById = (id) => RestAPI.httpGet(`${RestAPI.URL_HOUSE}/getById/${id}`);
    static GetAllHouses = () => RestAPI.httpGet(`${RestAPI.URL_HOUSE}/getAll`);
    static InsertHouse = (body) => RestAPI.httpPost(`${RestAPI.URL_HOUSE}/insert`, body);
    static UpdateHouse = (body) => RestAPI.httpPut(`${RestAPI.URL_HOUSE}/update`, body);
    static DeleteHouse = (id) => RestAPI.httpDelete(`${RestAPI.URL_HOUSE}/delete/${id}`);

    // ************************************************** //
    // Apartment Controller
    // ************************************************** //
    static URL_APARTMENT = `${RestAPI.URL}/apartments`;

    static GetApartmentById = (id) => RestAPI.httpGet(`${RestAPI.URL_APARTMENT}/getById/${id}`);
    static GetAllApartments = () => RestAPI.httpGet(`${RestAPI.URL_APARTMENT}/getAll`);
    static InsertApartment = (body) => RestAPI.httpPost(`${RestAPI.URL_APARTMENT}/insert`, body);
    static UpdateApartment = (body) => RestAPI.httpPut(`${RestAPI.URL_APARTMENT}/update`, body);
    static DeleteApartment = (id) => RestAPI.httpDelete(`${RestAPI.URL_APARTMENT}/delete/${id}`);

    // ************************************************** //
    // Viacep
    // ************************************************** //
    
    static GetAddressByCep = (cep) => RestAPI.httpGet(`https://viacep.com.br/ws/${cep}/json/`);
}
