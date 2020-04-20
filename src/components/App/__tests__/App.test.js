import configureStore from 'redux-mock-store';

import Root from '../../../Root';
import App from '../';
import Shelf from '../../Shelf';

describe('<App />', () => {
  let wrapped;

  afterEach(() => {
    wrapped.unmount();
  });

  it('shows a shelf', () => {
    wrapped = mount(
      <Root>
        <App />
      </Root>
    );
    expect(wrapped.find(Shelf).length).toEqual(1);
  });

  it('should add a product to cart products', () => {

    const initialState = {
      cart: {
        products: [],
        productToAdd: {},
        productToRemove: {}
      }
    };
    const mockStore = configureStore();
    let store=mockStore(initialState);

    const newProduct = {
      id: 12,
      sku: 12064273040195392,
      title: "Apple iPhone XS",
      description: "or_wireless",
      availableSizes: [
        "Apple"
      ],
      style: "Apple iPhone XS Black",
      price: 899.99,
      installments: 0,
      currencyId: "USD",
      currencyFormat: "$",
      isFreeShipping: true
    };

    wrapped = shallow(
        <App store={store} newProduct={{}} />
    );
    wrapped.setProps({newProduct});
    console.log('checking App props', wrapped.props());
    
  });

});
