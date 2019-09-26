import React, {Component} from 'react'

class Button extends Component {
    render() {
        return (
            <button className="calc-button">{this.props.symbol}</button>
        )
    }

}

export default Button