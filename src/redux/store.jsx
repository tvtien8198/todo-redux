
import { configureStore } from "@reduxjs/toolkit"
import FilterSlice from './../components/Filters/FilterSlice';
import TodoSlice from './../components/TodoList/TodoSlice';

const saveToLocalStorage = (state) => {
    try {
      const todoState = JSON.stringify(state);
      localStorage.setItem("TodoApp", todoState);
    } catch (e) {
      console.warn(e);
    }
}

const reHydrateStore = () => {
    if (localStorage.getItem('TodoApp') !== null) {
      return JSON.parse(localStorage.getItem('TodoApp')); // re-hydrate the store
    }
};

const localStorageMiddleware = ({ getState }) => {
    return next => action => {
      const result = next(action);
      localStorage.setItem('TodoApp', JSON.stringify(getState()));
      return result;
    };
};

const store = configureStore({
    reducer: {
        filters: FilterSlice.reducer,
        todoList: TodoSlice.reducer
    },
    preloadedState: reHydrateStore(),
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(localStorageMiddleware),

})

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store