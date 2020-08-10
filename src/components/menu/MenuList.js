import React from 'react';
import MenuCategory from './MenuCategory';
import AddMenu from './AddMenu';
import { Row, Tab, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const MenuList = ({ categories }) => {
	const results = categories;

	return (
		<div className='menu'>
			<Tab.Container id='left-tabs-example' defaultActiveKey='first'>
				<Row>
					<Col sm={3}>
						<Nav variant='pills' className='flex-column '>
							{results &&
								results.map((category) => {
									return (
										<Nav.Item className='categories-nav' key={category.id}>
											<Nav.Link eventKey={category.id}>
												{category.name}
											</Nav.Link>
										</Nav.Item>
									);
								})}
							<Nav.Item className='categories-nav'>
								<Nav.Link eventKey='addNew'>Yeni Ekle</Nav.Link>
							</Nav.Item>
						</Nav>
					</Col>
					<Col sm={9}>
						<Tab.Content>
							{results &&
								results.map((category) => {
									return (
										<Tab.Pane key={category.id} eventKey={category.id}>
											<MenuCategory
												category={category}
												cid={category.id}
												key={category.id}
											/>
										</Tab.Pane>
									);
								})}
							<Tab.Pane eventKey='addNew'>
								<AddMenu />
							</Tab.Pane>
						</Tab.Content>
					</Col>
				</Row>
			</Tab.Container>
		</div>
	);
};

export default MenuList;
