import callApi from '../util/apiCaller';
import * as types from '../constants/ActionTypes'

//export const addTodo = text => ({ type: types.ADD_TODO, text })
//export const deleteTodo = id => ({ type: types.DELETE_TODO, id })
//export const editTodo = (cuid, text) => ({ type: types.EDIT_TODO, cuid, text })
//export const completeTodo = cuid => ({ type: types.COMPLETE_TODO, cuid })
export const completeAll = () => ({ type: types.COMPLETE_ALL })
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED })

export function addTodo(text) {
    return {
        type: types.ADD_TODO,
        text,
    };
}

export function addTodos(todos) {
    return {
        type: types.ADD_TODOS,
        todos,
    };
}

export function addTodoRequest(text) {
    console.log("!in action add request!");
    return (dispatch) => {
        return callApi('todos', 'post',{
            todo: {
                text: text,
                completed: false,
            },
        }).then(res => dispatch(addTodo(text)))
    }
}

export function deleteTodo(cuid) {
    return {
        type: types.DELETE_TODO,
        cuid,
    };
}
export function deleteTodoRequest(cuid) {
    return callApi(`todos/${cuid}`, 'delete').then(
                        () => dispatch(deleteTodo(cuid)))
}

export function fetchTodos() {
    return (dispatch) => {
        return callApi('todos').then(
            res => {dispatch(addTodos(res.todos));
        });
    };
}

export function completeTodo(cuid) {
    return {
        type: types.COMPLETE_TODO,
        cuid
    }
}

export function completeTodoRequest(cuid) {
    return (dispatch) => {
        return callApi('todos/${cuid}', 'put',{
            todo: {
                completed: todo.completed,
            },
        }).then(res => dispatch(completeTodo(cuid)))
    }
}

export function editTodo(cuid, text) {
    return {
        type: types.EDIT_TODO,
        cuid,
        text
    }
}

export function editTodoRequest(cuid, text) {
    return (dispatch) => {
        return callApi('todos/$(cuid)', 'put',{
            todo: {
                text: text,
            },
        }).then(res => dispatch(editTodo(cuid, text)))
    }
}
