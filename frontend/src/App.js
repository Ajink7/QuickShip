import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import CartScreen from './screens/CartScreen'

function App() {
	return (
		<Router>
			<Header></Header>
			<main className='py-3'>
				<Container>
					<Route exact path='/' component={HomeScreen} />
					<Route path='/product/:id' component={ProductScreen} />
					<Route path='/cart/:id?' component={CartScreen}></Route>
				</Container>
			</main>
			<Footer></Footer>
		</Router>
	)
}

export default App
