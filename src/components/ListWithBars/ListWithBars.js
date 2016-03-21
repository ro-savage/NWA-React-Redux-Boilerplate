import React from 'react'
import styles from './ListWithBars.scss'
import ListBar from '../ListBar/ListBar'

export default class ListWithBars extends React.Component {

  static propTypes = {
    data: React.PropTypes.array.isRequired,
    extension: React.PropTypes.bool,
    makeCurrent: React.PropTypes.func,
    currentTask: React.PropTypes.number,
  }

  render() {
    const { data, extension, makeCurrent, currentTask } = this.props

    return (
      <div className={styles.container}>
        {data.map((task) =>
          <ListBar
            id={task.id} text={task.title} current={task.id === currentTask}
            key={task.id} extension={extension} onClick={makeCurrent}
          />
        )}
      </div>
    )
  }
}
