import React from 'react'
import ListWithBars from '../../components/ListWithBars/ListWithBars'


export default class TaskList extends React.Component {

  static propTypes = {
    tasks: React.PropTypes.array,
  }

  constructor(props) {
    super(props)
    this.state = { tasks: [] }
  }

  componentDidMount() {
    this.loadTasks()
  }

  // ** ES7 **
  async loadTasks() {
    const response = await fetch('/api/tasks.json')
    const data = await response.json()
    this.setState({
      tasks: data.tasks,
    })

     // ** ES6 **
     // fetch('/api/tasks.json')
     //  .then((response) => response.json()
     //  .then((data) => {
     //    this.setState({
     //      tasks: data.tasks,
     //    })
     //    console.log(this.state.tasks)
     //  }))
  }

  render() {
    return (
        <ListWithBars data={this.state.tasks} extension />
    )
  }
}
