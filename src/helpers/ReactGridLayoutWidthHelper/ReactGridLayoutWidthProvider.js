import React from 'react'
import ReactDOM from 'react-dom'
/*
 * A simple HOC that provides facility for listening to container resizes.
 */
const WidthProvider = (ComposedComponent) => class extends React.Component {

  constructor() {
    super()
    this.state = {
      width: 1280,
    }
  }

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this)
    // Bind here so we have the same reference when removing the listener on unmount.
    this.onWindowResize = this.onWindowResize.bind(this, node)

    window.addEventListener('resize', this.onWindowResize)
    // This is intentional. Once to properly set the breakpoint and resize the elements,
    // and again to compensate for any scrollbar that appeared because of the first step.
    this.onWindowResize()
    this.onWindowResize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize)
  }

  onWindowResize(node) {
    this.setState({ width: node.offsetWidth })
  }

  render() {
    return <ComposedComponent {...this.props} {...this.state} />
  }
}

export default WidthProvider
