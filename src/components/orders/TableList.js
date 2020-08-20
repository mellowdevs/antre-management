import React, { Component } from 'react';
import Table from './Table';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import firebase from 'firebase';

class TableList extends Component {
	state = {};

	render() {
		const { tables } = this.props;

		return (
			<div className='orderlist tables-flex section'>
				<h5>{this.state.title}</h5>
				{tables &&
					tables.map((table) => {
						return <Table table={table} key={table.id} />;
					})}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		tables: state.firestore.ordered.tables,
	};
};

export default compose(
	firestoreConnect(() => [{ collection: 'tables', orderBy: ['name', 'asc'] }]),
	connect(mapStateToProps)
)(TableList);
