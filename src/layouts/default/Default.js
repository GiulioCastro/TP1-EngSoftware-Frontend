import React from "react";

import {Header, Footer} from '../../component'

import './Default.css';

class DefaultLayout extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};

	}


	render() {		
		return (
			<div style={{minHeight: '100vh'}} className='d-flex flex-column bg-secondary'>
				<Header />
				<main className="flex-grow-1">
					{this.props.children}
				</main>
				<Footer />
			</div>
		);
	}
}

export default DefaultLayout
