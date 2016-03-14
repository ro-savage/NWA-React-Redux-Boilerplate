import React from 'react'
import styles from './ListBar.scss'
import FontIcon from 'react-toolbox/lib/font_icon'

export default class ListBar extends React.Component {
  static propTypes = {
    text: React.PropTypes.string.isRequired,
    current: React.PropTypes.bool,
  }

  render() {
    const current = this.props.current
    return (
      <div>
        <div className={current ? styles.current : styles.listbar}>
          <div className={styles.mainbar}>
              <FontIcon value="check_circle" />{this.props.text}
          </div>
          <div className={styles.ext}><div className={styles.block}></div><div className={styles.triangle}></div></div>
        </div>
      </div>
    )
  }
}

/*
 <div className={styles.ext1}></div>
 <div className={styles.ext2}><div className={styles.triangle}></div></div>
 */
