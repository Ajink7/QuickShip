const notFound = (err, req, res, next) => {
	const error = new Error(`Not Found ${req.originalUrl}`)
	res.status(404)
	next(error)
}

const errorHandler = (err, req, res, next) => {
	const statusCode = err.statusCode === 200 ? 500 : err.statusCode
	//res.status(statusCode)
	res.json({
		message: err.message,
	})
}

export { notFound, errorHandler }
