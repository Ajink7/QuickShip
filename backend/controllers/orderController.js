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

export { addOrderItems }
