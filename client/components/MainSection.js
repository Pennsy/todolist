import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'
import Footer from './Footer'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
}

export default class MainSection extends Component {
  static propTypes = {
    todos: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

  state = { filter: SHOW_ALL }

  handleClearCompleted = () => {
    this.props.actions.clearCompleted()
  }

  handleShow = filter => {
    this.setState({ filter })
  }

  renderToggleAll(completedCount) {
    const { todos, actions } = this.props
    if (todos.data.length > 0) {
      return (
        <input className="toggle-all"
               type="checkbox"
               checked={completedCount === todos.data.length}
               onChange={actions.completeAll} />
      )
    }
  }

  renderFooter(completedCount) {
    const todos = this.props.todos
    const { filter } = this.state
    const activeCount = todos.data.length - completedCount

    if (todos.data.length) {
      return (
        <Footer completedCount={completedCount}
                activeCount={activeCount}
                filter={filter}
                onClearCompleted={this.handleClearCompleted}
                onShow={this.handleShow} />
      )
    }
  }

  render() {
    //console.log(this.props.todos.data);
    const { todos, actions } = this.props
    const { filter } = this.state
    console.log("todos-data", todos.data)
    const filteredTodos = todos.data.filter(TODO_FILTERS[filter])
    console.log("!!! in main!!!", filter,filteredTodos)
    const completedCount = todos.data.reduce((count, todo) =>
      todo.completed ? count + 1 : count,
      0
    )

    return (
      <section className="main">
        {this.renderToggleAll(completedCount)}
        <ul className="todo-list">
          {filteredTodos.map(todo =>
            <TodoItem key={todo.cuid} todo={todo} {...actions} />
          )}
        </ul>
        {this.renderFooter(completedCount)}
      </section>
    )
  }
}
