import React from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import { Button } from 'react-toolbox/lib/button'
import Dialog from 'react-toolbox/lib/dialog'
import Input from 'react-toolbox/lib/input'
import { newTask } from '../../redux/modules/tasks/tasks'


export default class AddTaskBtnDialog extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
  }

  constructor() {
    super()
    autoBind(this)
    this.state = {
      active: false,
      task: {
        title: '',
      },
    }
  }

  handleToggle = () => {
    this.setState({ active: !this.state.active })
  }

  handleChange(value) {
    this.setState({
      task: {
        title: value,
      },
    })
  }

  handleSave() {
    this.props.dispatch(newTask(this.state.task))
    this.handleToggle()
    this.clearTask()
  }

  clearTask() {
    this.setState({
      task: {
        title: '',
      },
    })
  }

  render() {
    const actions = [
      { label: 'Cancel', onClick: this.handleToggle },
      { label: 'Save', onClick: this.handleSave },
    ]

    return (
      <div style={{ display: 'inline-block' }}>
        <Button icon="add" onClick={this.handleToggle} raised primary>Add Task</Button>
        <Dialog
          actions={actions}
          active={this.state.active}
          title="My awesome dialog"
          onOverlayClick={this.handleToggle}
        >
          <p>Enter the name of your task.</p>
          <Input type="text" label="Task Name" name="title" value={this.state.task.title} onChange={this.handleChange} />
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = ({ tasks }) => ({ tasks })

export default connect(mapStateToProps)(AddTaskBtnDialog)
