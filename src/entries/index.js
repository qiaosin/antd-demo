import './index.html';
import './index.less';
import 'babel-polyfill'
import {render} from 'react-dom';
import React from 'react';
import Routes from '../routes/index';
import { Provider } from 'react-redux'
import configureStore from '../store/configureStore';

const store = configureStore({});
render(
    <Provider store={store}>
       <Routes/>
    </Provider>, 
    document.getElementById('root')
);
