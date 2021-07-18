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

// GETo rder by id, private, /api/orders/:id/pay
const updateOrderToPaid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id)
	if (order) {
		order.isPaid = true
		order.paidAt = Date.now()
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address,
		}
		const updatedOrder = await order.save()
		res.json(updatedOrder)
	} else {
		res.status(201)
		throw new Error('Order not found')
	}
})

// @desc    Update Order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id)
	if (order) {
		order.isDelivered = true
		order.deliveredAt = Date.now()

		const updatedOrder = await order.save()
		res.json(updatedOrder)
	} else {
		res.status(201)
		throw new Error('Order not found')
	}
})

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.user._id })
	res.json(orders)
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private
const getOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({}).populate('user', 'id name')
	res.json(orders)
})

export {
	addOrderItems,
	getOrderById,
	updateOrderToPaid,
	updateOrderToDelivered,
	getMyOrders,
	getOrders,
}
