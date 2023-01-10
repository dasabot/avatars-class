import React from 'react';
import './Button.css'

export default class Button extends React.Component {
    render() {
        return <button className='button' onClick={this.props.onClickFunction} type="button">{this.props.buttonText}</button>
    }
}