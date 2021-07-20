import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Footer = () => {
	return (
		<footer>
			<Container>
				<Row>
					<Col className='text-center py-3'>
						Copyright &copy; <a href='https://github.com/Ajink7'>Github</a>
					</Col>
				</Row>
			</Container>
		</footer>
	)
}

export default Footer
