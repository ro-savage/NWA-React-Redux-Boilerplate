import React from 'react'
import ReactGridLayout, { WidthProvider } from 'react-grid-layout'
const ReactGridLayoutWP = WidthProvider(ReactGridLayout)

function calculateLayoutContainer() {
  const browserWidth = window.innerWidth
  const browserHeight = window.innerHeight

  const rowHeight = 10
  const cols = 12
  const fullHeight = Math.floor((browserHeight / rowHeight))
  const fullWidth = Math.floor((browserWidth / cols))

  return {
    browserWidth,
    browserHeight,
    rowHeight,
    cols,
    fullHeight,
    fullWidth,
  }
}

let resizeTimer = setTimeout(() => {}, 1)

class LoginPage extends React.Component {
  constructor() {
    super()
    const layout = calculateLayoutContainer()
    this.state = {
      layout,
    }
  }

  reCalcLayout() {
    const layout = calculateLayoutContainer()
    this.setState({
      layout,
    })
  }

  render() {
    window.addEventListener('resize', (event) => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        console.log(event)
        this.reCalcLayout()
      }, 250)
    })
    const renderDetails = this.state.layout
    console.log(renderDetails)
    const layout = [
      { x: 0, y: 0, w: renderDetails.fullWidth, h: 5, i: '0', static: true },
      { x: 0, y: 5, w: 2, h: renderDetails.fullHeight - 5, i: '1', static: true },
      { x: 4, y: 0, w: 2, h: 4, i: '2' },
      { x: 6, y: 0, w: 2, h: 6, i: '3' },
    ]
    return (
      <ReactGridLayoutWP className="layout" rowHeight={renderDetails.rowHeight}
        cols={renderDetails.cols} layout={layout} margin={[0, 0]} autoSize={false}
      >
        <div key={0} className="gridBox">0</div>
        <div key={1} className="gridBox">1</div>
        <div key={2} className="gridBox">2 - Static</div>
        <div key={3} className="gridBox">3</div>
      </ReactGridLayoutWP>
    )
  }
}

export default LoginPage
