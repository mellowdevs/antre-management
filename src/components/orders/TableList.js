import React, { Component } from 'react';
import Table from './Table';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';

class TableList extends Component {
	state = {};
	render() {
		const { tables } = this.props;

		return (
			<div className='orderlist section'>
				{tables &&
					tables.map((table) => {
						return table.isTaken ? (
							<Table table={table} key={table.id} />
						) : null;
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
