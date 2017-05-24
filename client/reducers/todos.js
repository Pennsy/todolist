import { ADD_TODO, ADD_TODOS, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED } from '../constants/ActionTypes'

const initialState = [
  {
    text: 'Use Redux',
    completed: false,
    cuid: 0
  }
]

export default function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return [action.todo,...state];

    case ADD_TODOS :
      return action.todos;


    case DELETE_TODO:
      return state.filter(todo =>
        todo.cuid !== action.cuid
      )

    case EDIT_TODO:
      return state.map(todo =>
        todo.cuid === action.cuid ?
          { ...todo, text: action.text } :
          todo
      )

    case COMPLETE_TODO:
      return state.map(todo =>
        todo.cuid === action.cuid ?
          { ...todo, completed: !todo.completed } :
          todo
      )


    case COMPLETE_ALL:
      const areAllMarked = state.every(todo => todo.completed)
      return state.map(todo => ({
        ...todo,
        completed: !areAllMarked
      }))

    case CLEAR_COMPLETED:
      return state.filter(todo => todo.completed === false)

    default:
      return state
  }
}

export const getTodos = state => state.todos;
