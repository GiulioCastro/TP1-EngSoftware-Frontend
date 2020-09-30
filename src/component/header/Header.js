import React from "react";
import { NavLink } from "react-router-dom";

class Header extends React.Component {
    render() {
        return (
            <header className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#">
                    <i className="fas fa-file-alt fa-lg mr-2" />
                    TP1 Eng de Software
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink to="/houses" activeClassName="active" className="nav-link">
                                Casa
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/apartments" activeClassName="active" className="nav-link">
                                Apartamento
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </header>
        );
    }
}

export default Header;