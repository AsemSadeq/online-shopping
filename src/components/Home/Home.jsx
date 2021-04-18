import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink as Link } from 'react-router-dom'
import ProductSale from '../ProductSale/ProductSale';
import './Home.scss';

function Home() {
	const homeSections = useSelector(state => state.homeSections);
	return (
		<div className="container">
			<div className="first-home-section">
				<div>
					<h4 className="section-title">
						{homeSections.firstSection.title}
					</h4>
					<div className="section-desc">
						{homeSections.firstSection.description}
					</div>
					<Link className="shop-link" to="/all">Shop Now</Link>
				</div>
				<img src={require(`../../assets/images/${homeSections.firstSection.image}`).default} alt={homeSections.firstSection.title} />
			</div>
			<div className="second-home-section">
				{homeSections.secondSection.map((service, index) => {
					return (
						<div className="card-service" key={index}>
							<img src={require(`../../assets/images/${service.image}`).default} alt={service.title} />
							<div className="card-title">{service.title}</div>
							<div className="card-description">{service.description}</div>
						</div>
					)
				})}
			</div>
			<div className="third-home-section">
				{homeSections.thirdSection.map((item, index) => {
					return (
						<div className="third-item-card" key={index}>
							<div>
								<div className="section-title">{item.title}</div>
								<div className="section-description">{item.description}
									<p>{item.discount}</p>
								</div>
								<Link className="shop-link" to={item.url}>Shop Now</Link>
							</div>
							<img src={require(`../../assets/images/${item.image}`).default} alt={item.title} />
						</div>
					)
				})}
			</div>
			<ProductSale />
			<div className="women-section">
				<div className="women-section-img">
					<img src={require(`../../assets/images/${homeSections.forthSection.image}`).default} alt="" />
				</div>
				<div className="women-section-content">
					<h1 className="women-content-title">{homeSections.forthSection.title}</h1>
					<p className="women-content-description">{homeSections.forthSection.description}</p>
					<Link className="women-shop" to={`${homeSections.forthSection.url}`}>Shop Now</Link>
				</div>
			</div>
		</div>
	)
}

export default Home
