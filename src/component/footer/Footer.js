import React from "react";

class Footer extends React.Component {
    render() {
        return (
            <footer className="navbar navbar-dark bg-dark ">
                <span className="navbar-text copyright ml-auto">
                    {new Date().getFullYear()} Giulio Lelis
                </span>
            </footer>
        );
    }
}

export default Footer;