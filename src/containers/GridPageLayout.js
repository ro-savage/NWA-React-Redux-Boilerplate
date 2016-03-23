import React from 'react'
import ReactDOM from 'react-dom'
import { Responsive as ResponsiveReactGridLayout } from 'react-grid-layout'
import { connect } from 'react-redux'

class GridLayout extends React.Component {

  static propTypes = {
    menuOpen: React.PropTypes.bool,
    layouts: React.PropTypes.object.isRequired,
    children: React.PropTypes.arrayOf(React.PropTypes.element),
  };

  constructor(props) {
    super(props)
    this.state = {
      layouts: this.props.layouts,
      width: 1280,
      menuOpen: this.props.menuOpen,
    }
  }

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this)
    // Bind here so we have the same reference when removing the listener on unmount.
    this.onResize = this.onResize.bind(this, node)

    window.addEventListener('resize', this.onResize)
    // This is intentional. Once to properly set the breakpoint and resize the elements,
    // and again to compensate for any scrollbar that appeared because of the first step.
    this.onResize()
    this.onResize()
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps)

    if (newProps.menuOpen !== this.props.menuOpen) {
      // Check is mobile version
      const menuSize = window.innerWidth < 768 ? 200 : 150
      // If menu is closed, add 150, if it is opened minus 150. 0 and 200 if mobile
      if (newProps.menuOpen) {
        window.setTimeout(() => {
          this.setState({
            width: this.state.width - menuSize,
          })
        }, 300)
      } else {
        this.setState({
          width: this.state.width + menuSize,
        })
      }
    }
  }

  // componentDidUpdate(prevProps) {
  //
  //   window.setTimeout(() => {
  //     const mainContentSize = document.getElementById('mainContent').offsetWidth
  //
  //     if (prevProps.menuOpen !== this.props.menuOpen) {
  //
  //       console.log(this.state.width, mainContentSize)
  //
  //       // If menu is closed, add 150, if it is opened minus 150
  //       if (prevProps.menuOpen) {
  //         this.setState({
  //           width: mainContentSize,
  //         })
  //       } else {
  //         this.setState({
  //           width: mainContentSize,
  //         })
  //       }
  //
  //       console.log(this.state.width, mainContentSize)
  //     }
  //   }, 350)
  // }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

  onResize(node) {
    this.setState({
      width: node.offsetWidth,
    })
  }

  render() {
    return (
      <ResponsiveReactGridLayout className="layout" rowHeight={20}
        layouts={this.state.layouts} margin={[0, 0]} autoSize={false}
        breakpoints={{ lg: 1024, md: 768, sm: 0 }}
        cols={{ lg: 12, md: 12, sm: 4 }}
        width={this.state.width}
      >
        {this.props.children}
      </ResponsiveReactGridLayout>
    )
  }
}

const mapStateToProps = ({ layout }) => ({ menuOpen: layout.menuOpen })

export default connect(mapStateToProps)(GridLayout)
