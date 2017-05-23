import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'

export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired
  }

  state = {
    editing: false
  }

  handleDoubleClick = () => {
    this.setState({ editing: true })
  }

  handleSave = (cuid, text) => {
    if (text.length === 0) {
      //this.props.deleteTodo(cuid)
      this.props.deleteTodoRequest(cuid)
    } else {
      this.props.editTodoRequest(cuid, text)
    }
    this.setState({ editing: false })
  }

  handleCompleteTodo = cuid => {
    console.log("!!! in todoitem complete!!!", cuid);
    this.props.completeTodoRequest(cuid)
  }

  handleDeleteTodo = cuid => {
    this.props.deleteTodoRequest(cuid)
  }

  render() {
    //const { todo, completeTodo, deleteTodo } = this.props
    const { todo, actions} = this.props
    console.log("!!!in todoitem", todo);
    let element
    if (this.state.editing) {
      element = (
        <TodoTextInput text={todo.text}
                       editing={this.state.editing}
                       onSave={(text) => this.handleSave(todo.cuid, text)} />
      )
    } else {
      element = (
        <div className="view">
          <input className="toggle"
                 type="checkbox"
                 checked={todo.completed}
                 onChange={() => this.handleCompleteTodo(todo.cuid)} />
          <label onDoubleClick={this.handleDoubleClick}>
            {todo.text}
          </label>
          <button className="destroy"
                  onClick={() => this.handleDeleteTodo(todo.cuid)} />
        </div>
      )
    }

    return (
      <li className={classnames({
        completed: todo.completed,
        editing: this.state.editing
      })}>
        {element}
      </li>
    )
  }
}
