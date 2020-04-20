import Checkbox from '..';

const label = 'M';
let wrapped;

beforeEach(() => {
  wrapped = mount(<Checkbox label={label} updateProductList={() => { }} />);
});

afterEach(() => {
  wrapped.unmount();
});

it('should toggle isChecked state when input change', () => {
  const input = wrapped.find('input');

  /* isChecked should start with false */
  expect(wrapped.state().isChecked).toEqual(false);
  input.simulate('change');
  /* Then toggle to true */
  expect(wrapped.state().isChecked).toEqual(true);
  input.simulate('change');
  /* And then to false */
  expect(wrapped.state().isChecked).toEqual(false);
});
