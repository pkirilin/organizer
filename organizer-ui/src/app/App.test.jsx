import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { mount, shallow } from 'enzyme';

describe('App component', () => {
  test('should mount without crashing', () => {
    mount(
      <Provider store={store}>
        <App></App>
      </Provider>,
    );
  });

  test('should shallow render without crashing', () => {
    shallow(<App></App>);
  });
});
