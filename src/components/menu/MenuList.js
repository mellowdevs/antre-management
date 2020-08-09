import React from 'react';
import MenuCategory from './MenuCategory';
import { Row, Tab, Col, Nav } from 'react-bootstrap';
const MenuList = ({ categories }) => {
	const results = categories;
	// return (
	// <MenuCategory
	//     category={category}
	//     cid={category.id}
	//     key={category.id}
	// />
	// );
	return (
		<div className='menu'>
			<Tab.Container id='left-tabs-example' defaultActiveKey='first'>
				<Row>
					<Col sm={3}>
						<Nav variant='pills' className='flex-column'>
							{results &&
								results.map((category) => {
									return (
										<Nav.Item>
											<Nav.Link eventKey={category.id}>
												{category.name}
											</Nav.Link>
										</Nav.Item>
									);
								})}
						</Nav>
					</Col>
					<Col sm={9}>
						<Tab.Content>
							{results &&
								results.map((category) => {
									return (
										<Tab.Pane eventKey={category.id}>
											<MenuCategory
												category={category}
												cid={category.id}
												key={category.id}
											/>
										</Tab.Pane>
									);
								})}
						</Tab.Content>
					</Col>
				</Row>
			</Tab.Container>
		</div>
	);
};

export default MenuList;