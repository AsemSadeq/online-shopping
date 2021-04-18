import './App.css';
import Home from './components/Home/Home';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import ProductContainer from './components/ProductContainer/ProductContainer';
import Email from './components/Email/Email';
import Footer from './components/Footer/Footer';
import OrderProduct from './components/OrderProduct/OrderProduct';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <main>
            <Route exact path="/" component={Home} />
            <Route path={["/all", "/men", "/women", "/kids", "/sale", "/wishes"]} component={ProductContainer} />
            <Route path="/cart" component={Cart} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/product/:productId" component={OrderProduct} />
          </main>
          <Redirect to="/" />
        </Switch>
        <Email />
        <Footer />
      </Router>
    </Provider>

  );
}

export default App;
