import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import SignIn from './components/auth/SignIn';
import TableDetails from './components/orders/TableDetails';
import CreateOrder from './components/orders/CreateOrder';
import Warehouse from './components/warehouse/Warehouse';
import UpdateProduct from './components/warehouse/UpdateProduct';
import Menu from './components/menu/Menu';
import Expenses from './components/expenses/Expenses';
import UpdateMenuItem from './components/menu/UpdateMenuItem';
function App() {
	return (
		<BrowserRouter>
			<div className='App'>
				<Navbar />
				<div className='container'>
					<Switch>
						<Route exact path='/' component={Dashboard}></Route>
						<Route exact path='/order/:id' component={TableDetails}></Route>
						<Route
							exact
							path='/update/:cid/:id'
							component={UpdateProduct}
						></Route>
						<Route
							exact
							path='/item/:cid/:id'
							component={UpdateMenuItem}
						></Route>
						<Route exact path='/create/:id' component={CreateOrder}></Route>
						<Route exact path='/signin' component={SignIn}></Route>
						<Route exact path='/warehouse' component={Warehouse}></Route>
						<Route exact path='/menu' component={Menu}></Route>
						<Route exact path='/expenses' component={Expenses}></Route>
					</Switch>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
