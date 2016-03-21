import React from 'react'
import { connect } from 'react-redux'

class TaskPage extends React.Component {
  static propTypes = {
    tasks: React.PropTypes.object,
    currentTask: React.PropTypes.number,
    taskId: React.PropTypes.string,
  }
  constructor(props) {
    super(props)
    this.state = {
      task: props.tasks[props.currentTask],
    }
  }
  render() {
    const props = this.props
    const task = this.props.tasks[props.currentTask]
    console.log('taskPage', props)
    return (
      <div style={{ borderTop: '2px solid orange', width: '100%', height: '100%', backgroundColor: '#EBEBEB' }}>
        <h2>{task.title}</h2>
        <div style={{ backgroundColor: '#FFFFFF', width: '100%', display: 'flex' }}>
          <div style={{ width: '50%', height: '100%', padding: '5px' }}>
            <b>DESCRIPTION</b>
            <p>{task.productDesc}</p>
          </div>
          <div style={{ width: '50%', height: '100%', padding: '5px' }}>
            <div>
              {task.productImgs.map((imgUrl) =>
                <img key={imgUrl} src={imgUrl} style={{ paddingRight: '3px' }} />
              )}
            </div>
            <div>
              <b>Product details</b><br /><br />
              Product name: <b>Awesome Stuff</b><br /><br />
              Barcode: <b>123124324324234</b><br /><br />
              Shipdate: <b>15 March 2015</b><br /><br />
              Buyer: <b>Some guy</b><br /><br />
              Quantity: <b>200</b>
            </div>
          </div>
        </div>
    </div>
    )
  }
}

const mapStateToProps = ({ tasks }) => ({ tasks: tasks.tasks, currentTask: tasks.current })

export default connect(mapStateToProps)(TaskPage)
