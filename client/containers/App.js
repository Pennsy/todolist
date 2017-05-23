import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'
import MainSection from '../components/MainSection'
import * as TodoActions from '../actions'
import { fetchTodos, deleteTodoRequest, addTodoRequest } from '../actions'
/*
const App = ({todos, actions}) => (
  <div>
    <Header addTodo={actions.addTodo} />
    <MainSection todos={todos} actions={actions} />
  </div>
)
*/

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTodos());
  };

  handleDeleteTodo = todo => {
    this.props.dispatch(deleteTodoRequest(todo));
  };

  handleAddTodo = (text) => {
    console.log("! in app handle add todo !!")
    this.props.dispatch(addTodoRequest(text));
  }

  render() {
      return (
        <div>
          <Header addTodo={this.handleAddTodo} />
          <MainSection todos={this.props.todos} actions={this.props.actions} />
        </div>
    );
  }
}
App.need = [() => { return fetchTodos(); }];
/*
App.propTypes = {
  //todos: PropTypes.array.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
  })).isRequired,
  actions: PropTypes.object.isRequired,
  //dispatch: PropTypes.func.isRequired,
}
*/
/*
const mapStateToProps = state => ({
  todos: state.todos
})
*/

function mapStateToProps(state) {
    return {todos: state.todos}
}
/*
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
})
*/

function mapDispatchToProps(dispatch){
  return {actions: bindActionCreators(TodoActions, dispatch)}

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
