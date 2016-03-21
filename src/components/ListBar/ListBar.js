import React from 'react'
import styles from './ListBar.scss'
import FontIcon from 'react-toolbox/lib/font_icon'
import autoBind from 'react-autobind'

export default class ListBar extends React.Component {
  static propTypes = {
    id: React.PropTypes.number,
    text: React.PropTypes.string.isRequired,
    current: React.PropTypes.bool,
    extension: React.PropTypes.bool,
    onClick: React.PropTypes.func,
  }

  constructor() {
    super()
    autoBind(this)
  }

  addExtension(required) {
    if (required) {
      return (
        <div className={styles.ext}>
          <div className={styles.block}></div><div className={styles.triangle}></div>
        </div>
      )
    }
    return null
  }

  createClasses() {
    const classes = [styles.listbar]

    if (this.props.current) {
      classes.push(styles.current)
    }

    if (this.props.extension) {
      classes.push(styles.extension)
    }

    return classes.join(' ')
  }

  handleClick() {
    this.props.onClick(this.props)
  }

  render() {
    const { text, extension } = this.props

    return (
      <div>
        <div className={this.createClasses()} onClick={this.handleClick}>
          <div className={styles.mainbar}>
              <FontIcon value="check_circle" />{text}
          </div>
          {this.addExtension(extension)}
        </div>
      </div>
    )
  }
}
