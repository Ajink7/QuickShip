import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

const getProducts = asyncHandler(async (req, res) => {
	const keyword = req.query.keyword
		? {
				name: {
					$regex: req.query.keyword,
					$options: 'i',
				},
		  }
		: {}

	const products = await Product.find({ ...keyword })
	res.json(products)
})

const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)
	if (product) {
		res.json(product)
	} else {
		res.status(404).json({ message: 'Product not found' })
	}
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)

	if (product) {
		await product.remove()
		res.json({ message: 'Product removed' })
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: 'Dell G3 Laptop 12th edition latest',
		price: 109.99,
		user: req.user._id,
		image: '/images/sample.jpg',
		brand: 'DELL',
		category: 'Laptop',
		countInStock: 3,
		numReviews: 0,
		description: 'It is a great gaming laptop and has 16GB RAM ans 256GB SSD',
	})

	const createdProduct = await product.save()
	res.status(201).json(createdProduct)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
	const { name, price, description, image, brand, category, countInStock } =
		req.body

	const product = await Product.findById(req.params.id)

	if (product) {
		product.name = name
		product.price = price
		product.description = description
		product.image = image
		product.brand = brand
		product.category = category
		product.countInStock = countInStock
		//console.log('Hiii')
		const updatedProduct = await product.save()
		res.json(updatedProduct)
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})

// @desc    Create a review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body

	const product = await Product.findById(req.params.id)

	if (product) {
		const aldreadyReviewed = product.reviews.find(
			(r) => r.user.toString() === req.user.toString()
		)
		if (aldreadyReviewed) {
			res.status(400)
			throw new Error('Product aldready Reviewed')
		}
		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment,
			user: req.user._id,
		}
		product.reviews.push(review)
		product.numReviews = product.reviews.length
		product.rating =
			product.reviews.reduce((acc, item) => item.rating + acc, 0) /
			product.reviews.length
		await product.save()
		res.status(200).json({ message: 'Review Added' })
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})

export {
	getProductById,
	getProducts,
	deleteProduct,
	createProduct,
	updateProduct,
	createProductReview,
}
