import React, {Component} from 'react'
import Button from './Button'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            current: "0",
            previous: [],
            nextIsReset: false
        }
    }
    
    reset = () => {
        this.setState({current: "0", previous: [], nextIsReset: false})
    }

    addToCurrent = (symbol) => {
        if(['/', '*', '+', '-'].indexOf(symbol) > -1 ) {
            let {previous} = this.state
            previous.push(this.state.current, symbol)
            this.setState({previous, nextIsReset: true}) // previous: previous
        } else {
            if ((this.state.current === "0" && symbol !== '.') || this.state.nextIsReset) {
                this.setState({current: symbol, nextIsReset: false})
            } else {
                this.setState({
                    current: this.state.current + symbol})
            }
        }
    }

    addToCalculate = (symbol) => {
        let {current, previous, nextIsReset} = this.state
        if(previous.length > 0) {
            current = eval((previous[0]) + (previous[1]) + (parseInt(current))).toString()
            this.setState({current, previous: [], nextIsReset: true})
            console.log(parseInt(previous[1]))
        }
    }

    changeSign = () => {
        let {current, previous} = this.state
        if (current.includes('-')) {
            let sign = '+'
            let newCurrent = current.replace('-', '')
            this.setState({current: newCurrent})
        } else {
            let sign = '-'
            let newCurrent = sign.concat(current)            
            console.log("It's a positive number")
            this.setState({current: newCurrent})
        }
    }

    render() {
        const buttons = [
            {symbol: 'C', cols: 2, action: this.reset},
            {symbol: '+-', cols: 1, action: this.changeSign},
            {symbol: '/', cols: 1, action: this.addToCurrent},
            {symbol: '7', cols: 1, action: this.addToCurrent},
            {symbol: '8', cols: 1, action: this.addToCurrent},
            {symbol: '9', cols: 1, action: this.addToCurrent},
            {symbol: '*', cols: 1, action: this.addToCurrent},
            {symbol: '4', cols: 1, action: this.addToCurrent},
            {symbol: '5', cols: 1, action: this.addToCurrent},
            {symbol: '6', cols: 1, action: this.addToCurrent},
            {symbol: '+', cols: 1, action: this.addToCurrent},
            {symbol: '1', cols: 1, action: this.addToCurrent},
            {symbol: '2', cols: 1, action: this.addToCurrent},
            {symbol: '3', cols: 1, action: this.addToCurrent},
            {symbol: '-', cols: 1, action: this.addToCurrent},
            {symbol: '0', cols: 2, action: this.addToCurrent},
            {symbol: '.', cols: 1, action: this.addToCurrent},
            {symbol: '=', cols: 1, action: this.addToCalculate},
        ]
        return (
            <div className="calculator">
                {this.state.current.length > 0 ?
                    <div className="floaty-last">{this.state.previous[0]}{this.state.previous[1]}</div>
                : null
                }

                <input className="result" type="text" value={this.state.current} />
                {
                    buttons.map((btn, i) => {
                        return <Button key={i} symbol={btn.symbol} cols={btn.cols} action={symbol => btn.action(symbol)} />
                    })
                }
            </div>
        )
    }
}

export default App