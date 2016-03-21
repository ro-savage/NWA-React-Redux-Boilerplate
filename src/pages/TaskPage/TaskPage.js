import React from 'react'
import { connect } from 'react-redux'

class TaskPage extends React.Component {
  static propTypes = {
    tasks: React.PropTypes.object,
    params: React.PropTypes.object,
  }
  constructor(props) {
    super(props)
    this.state = {
      task: props.tasks[props.params.taskId],
    }
  }
  render() {
    const props = this.props
    const { task } = this.state
    console.log(props.tasks)
    return (
      <div>
        Task id: <b>{task.id}</b>
        <br />
        Title: <b>{task.title}</b>
      </div>
    )
  }
}

const mapStateToProps = ({ tasks }) => ({ tasks: tasks.tasks })

export default connect(mapStateToProps)(TaskPage)
