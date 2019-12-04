import { createStore } from 'store/lib';
import modules from './modules';

const store = createStore(modules);

export default store;
