import React from 'react'
import TaskList from '../../containers/TaskList/TaskList'
import TaskPage from '../../pages/TaskPage/TaskPage'
class TasksPage extends React.Component {
  static propTypes = {
    params: React.PropTypes.object,
  }
  render() {
    return (
      <div className="grid-container" style={{ height: '100%' }}>
        <div className="grid-33 mobile-grid-100" style={{ backgroundColor: '#E2E2E2', paddingLeft: '10px', paddingRight: '0' }}>
          <TaskList />
        </div>
        <div className="grid-66 mobile-grid-100" style={{ padding: '10px', backgroundColor: '#EBEBEB', height: '100%' }}>
          <TaskPage taskId={this.props.params.taskId} />
        </div>
      </div>
    )
  }
}

export default TasksPage
