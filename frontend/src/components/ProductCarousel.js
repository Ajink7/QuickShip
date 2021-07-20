import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'
import { useSelector, useDispatch } from 'react-redux'
const ProductCarousel = () => {
	const dispatch = useDispatch()

	const productTopRated = useSelector((state) => state.productTopRated)
	const { loading, products, error } = productTopRated
	useEffect(() => {
		dispatch(listTopProducts())
	}, [dispatch])
	return loading ? (
		<Loader />
	) : error ? (
		<Message variant='danger'>{error}</Message>
	) : (
		<Carousel pause='hover' className='bg-dark'>
			{products.map((p) => (
				<Carousel.Item key={p._id}>
					<Link to={`/product/${p._id}`}>
						<Image src={p.image} alt={p.name}></Image>
						<Carousel.Caption className='carousel-caption'>
							<h2>
								{p.name} ($ {p.price})
							</h2>
						</Carousel.Caption>
					</Link>
				</Carousel.Item>
			))}
		</Carousel>
	)
}

export default ProductCarousel
