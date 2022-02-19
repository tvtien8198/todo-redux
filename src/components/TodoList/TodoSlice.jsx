// const initState = [
//     { id: 1, name: 'Learn Yoga', completed: false, priority: 'Medium' },
//     { id: 2, name: 'Learn Redux', completed: true, priority: 'High' },
//     { id: 3, name: 'Learn JavaScript', completed: false, priority: 'Low' }
// ]

// const todoReducer = (state = initState, action) => {
//     switch(action.type){
//         case 'todoList/addTodo':
//             return [
//                 ...state,
//                 action.payload
//             ]
//         case 'todoList/toggleTodoStatus':
//             return state.map(todo => todo.id === action.payload ? {...todo, completed: !todo.completed } : todo) 
//         default:
//             return state
//     }
// }
// export default todoReducer

import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    name: 'todoList',
    initialState: [
        { id: 1, name: 'Learn Yoga', completed: false, priority: 'Medium' },
        { id: 2, name: 'Learn Redux', completed: true, priority: 'High' },
        { id: 3, name: 'Learn JavaScript', completed: false, priority: 'Low' }
    ],
    reducers: {
        addTodo: (state, action) => {
            state.push(action.payload)
        },
        deleteTodo: (state, action) => {
            return state.filter(todo => todo.id !== action.payload)
        },
        updateTodo: (state, action) => {
            const actionPayload = action.payload
            return state.map(todo => 
                todo.id === actionPayload.id 
                ? {...todo, name: actionPayload.name, priority: actionPayload.priority} 
                : todo)
            // const todoUpdating = state.find(todo => todo.id === action.payload.id)
            // if(todoUpdating) {
            //     todoUpdating.name = action.payload.name
            //     todoUpdating.priority = action.payload.priority
            // }
        },
        toggleTodoStatus: (state, action) => {
            const currentTodo = state.find(todo => todo.id === action.payload);
            if (currentTodo) {
                currentTodo.completed = !currentTodo.completed;
            }
        }
        
    }
})