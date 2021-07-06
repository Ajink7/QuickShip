import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler'

// POST req to create order, private, /api/orders
const addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		taxPrice,
		shippingPrice,
		totalPrice,
		itemsPrice,
	} = req.body
	if (orderItems && orderItems.length === 0) {
		res.status(400)
		throw new Error('No items found')
		return
	} else {
		const order = Order({
			orderItems,
			shippingAddress,
			paymentMethod,
			taxPrice,
			shippingPrice,
			totalPrice,
			itemsPrice,
			user: req.user._id,
		})
		const createdOrder = await order.save()
		res.status(201).json(createdOrder)
	}
})

// GETo rder by id, private, /api/orders/:id
const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate(
		'user',
		'name email'
	)
	if (order) {
		res.json(order)
	} else {
		res.status(201)
		throw new Error('Order not found')
	}
})

export { addOrderItems, getOrderById }
