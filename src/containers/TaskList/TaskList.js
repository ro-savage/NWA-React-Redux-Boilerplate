import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-toolbox/lib/button'
import { push } from 'react-router-redux'
import autoBind from 'react-autobind'
import rValues from 'ramda/src/values'

import ListWithBars from '../../components/ListWithBars/ListWithBars'
import AddTaskBtnDialog from '../../components/AddTaskBtnDialog/AddTaskBtnDialog'
import { getJsonTasks, makeTaskCurrent } from '../../redux/modules/tasks/tasks'

class TaskList extends React.Component {

  static propTypes = {
    tasks: React.PropTypes.object,
    getTasks: React.PropTypes.func.isRequired,
    makeCurrentTask: React.PropTypes.func,
    currentTask: React.PropTypes.number,
  }

  constructor(props) {
    super(props)
    autoBind(this)
  }

  componentWillMount() {
    this.props.getTasks()
  }

  makeArrFromObj(object) {
    return rValues(object)
  }

  // makeCurrent() {
  //   console.log('blah')
  // }

  render() {
    const { tasks, currentTask, getTasks, makeCurrentTask } = this.props
    return (
      <div>
        <br /><br />
        <Button raised primary onClick={getTasks}>Get Tasks</Button>&nbsp; &nbsp;<AddTaskBtnDialog />
        <br /><br />
        <ListWithBars data={this.makeArrFromObj(tasks)} currentTask={currentTask} makeCurrent={makeCurrentTask} extension={false} />
      </div>
    )
  }
}

// Get the value of the tasks propetry from the store. And pass to to props as tasks
const mapStateToProps = ({ tasks }) => ({ tasks: tasks.tasks, currentTask: tasks.current })

// Get the dispatch func and pass a prop called getTasks as a func that dispatches the getJsonTaks action creator
const mapDispatchToProps = (dispatch) => ({
  getTasks: () => { dispatch(getJsonTasks())},
  makeCurrentTask: (clickedComponentsProps) => {
    dispatch(makeTaskCurrent(clickedComponentsProps.id))
    dispatch(push(`/tasks/${clickedComponentsProps.id}`))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
