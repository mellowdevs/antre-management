import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import SignIn from './components/auth/SignIn';
import OrderDetails from './components/orders/OrderDetails';
import CreateOrder from './components/orders/CreateOrder';
import Warehouse from './components/warehouse/Warehouse';
import AddProduct from './components/warehouse/AddProduct';
import UpdateProduct from './components/warehouse/UpdateProduct';
import Menu from './components/menu/Menu';
function App() {
	return (
		<BrowserRouter>
			<div className='App'>
				<Navbar />
				<div className='container'>
					<Switch>
						<Route exact path='/' component={Dashboard}></Route>
						<Route exact path='/order/:id' component={OrderDetails}></Route>
						<Route exact path='/update/:id' component={UpdateProduct}></Route>
						<Route exact path='/create' component={CreateOrder}></Route>
						<Route exact path='/signin' component={SignIn}></Route>
						<Route exact path='/warehouse' component={Warehouse}></Route>
						<Route exact path='/add-product' component={AddProduct}></Route>
						<Route exact path='/menu' component={Menu}></Route>
					</Switch>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
