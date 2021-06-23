import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Card, Button, Image, ListGroup } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'
const ProductScreen = ({ match }) => {
	const { id } = useParams()
	//const id = match.params.id
	const dispatch = useDispatch()
	const productDetails = useSelector((state) => state.productDetails)
	const { product, error, loading } = productDetails
	useEffect(() => {
		dispatch(listProductDetails(id))
	}, [match, dispatch])
	console.log(id)
	return (
		<>
			<Link to='/' className='btn btn-info my-3'>
				Go Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Row>
					<Col md={6}>
						<Image fluid src={product.image} alt={product.name}></Image>
					</Col>
					<Col md={3}>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h3>{product.name}</h3>
							</ListGroup.Item>
							<ListGroup.Item>
								<Rating
									value={product.rating}
									text={`${product.numReviews} reviews`}
								/>
							</ListGroup.Item>
							<ListGroup.Item>
								<h4>Price: ${product.price}</h4>
							</ListGroup.Item>
							<ListGroup.Item>
								<p>Description: {product.description}</p>
							</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={3}>
						<Card>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<Row>
										<Col>Price</Col>
										<Col>${product.price}</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Status</Col>
										<Col>
											{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Button
										className='btn-block w-100'
										type='button'
										disabled={product.countInStock === 0}>
										Add to Cart
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</>
	)
}

export default ProductScreen
