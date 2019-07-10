import React from 'react';
import SwitchNavigator from './app/navigation/SwitchNavigator'

import reducers from './app/reducers'

import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

const store = createStore(reducers,
    applyMiddleware(thunk)
);
const App = () => (
    <Provider store={store}>
        <SwitchNavigator />
    </Provider>
)

export default App
