import { START_LOADING_PRODUCTS, STOP_LOADING_PRODUCTS } from '../types';

export const startLoadingProducts = () => ({ type: START_LOADING_PRODUCTS });

export const stopLoadingProducts = () => ({ type: STOP_LOADING_PRODUCTS });
