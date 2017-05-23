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
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }
  componentDidMount() {
    this.props.actions.fetchTodos();
  };

  handleDeleteTodo = todo => {
    this.props.actions.deleteTodoRequest(todo);
  };

  handleAddTodo = (text) => {
    this.props.actions.addTodoRequest(text);
  }

  render() {
      return (
        <div>
        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}

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
