import React from 'react'
import GridPageLayout from '../../containers/GridPageLayout'
import TaskList from '../../containers/TaskList/TaskList'
import TaskPage from '../../pages/TaskPage/TaskPage'
class TasksPage extends React.Component {
  static propTypes = {
    params: React.PropTypes.object,
  }
  render() {
    const layouts = {
      lg: [
        { x: 0, y: 0, w: 4, h: 24, i: '0' },
        { x: 4, y: 0, w: 8, h: 12, i: '1' },
        { x: 4, y: 12, w: 8, h: 12, i: '2' },
      ],
      md: [
        { x: 0, y: 0, w: 4, h: 24, i: '0' },
        { x: 4, y: 12, w: 8, h: 12, i: '1' },
        { x: 4, y: 12, w: 8, h: 12, i: '2' },
      ],
      sm: [
        { x: 0, y: 0, w: 4, h: 24, i: '0' },
        { x: 0, y: 12, w: 4, h: 24, i: '1' },
        { x: 4, y: 24, w: 4, h: 12, i: '2' },
      ],
    }

    return (
      <GridPageLayout layouts={layouts}>
        <div key={0} style={{ backgroundColor: '#E2E2E2', paddingLeft: '10px' }}>
          <TaskList />
        </div>
        <div key={1} className="gridBox"><TaskPage taskId={this.props.params.taskId} /></div>
        <div key={2} className="gridBox">2</div>
      </GridPageLayout>
    )
  }
}

export default TasksPage
