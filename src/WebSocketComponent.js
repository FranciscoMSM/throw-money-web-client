import React, { Component } from 'react';
import Websocket from 'react-websocket';
import { Motion, spring } from 'react-motion';
import QRCode from 'qrcode.react';
import './App.css';

const w = window.innerWidth;
const h = window.innerHeight;

class WebSocketComponent extends Component {

  state = { bills: [], id: null};

  handleData = (data) => {
    if (data.startsWith('ID')) {
      this.setState({ id: data.split('-')[1] });
    } else if (data === 'ERASE') {
      this.setState({ bills: [] })
    } else {
      const x = Number(data.split('-')[0]);
      const vy = Number(data.split('-')[1]);
      this.setState({ bills: [{ id: this.state.bills.length, x, vy }, ...this.state.bills] });
    }
  }

  renderBill(bill) {
    return <Bill key={bill.id} data={bill}/>;
  }

  render() {
    return (
      <div className='container'>

        <p className='title'>Throw Money</p>

        <div className='instruction'>
          <div className='circle'>
            <p className='number'>1</p>
          </div>
          <p className='text'>Download Throw Money from Playstore or Appstore</p>
        </div>

        <div className='instruction'>
          <div className='circle'>
            <p className='number'>2</p>
          </div>
          <p className='text'>Scan the QR Code</p>
        </div>

        <div className='instruction'>
          <div className='circle'>
            <p className='number'>3</p>
          </div>
          <p className='text'>Have fun!</p>
        </div>
        <div className='qrcontainer'>
          <div className='qr'>
            { this.state.id !== null && <QRCode size={150} value={String(this.state.id)}/> }
          </div>
        </div>
        <Websocket
          url='wss://salty-journey-84056.herokuapp.com'
          onMessage={this.handleData}
        />
        {this.state.bills.map(this.renderBill)}
      </div>
    );
  }
}

class Bill extends Component {

  shouldComponentUpdate() {
    return false;
  }

  render() {
    let finalY = (this.props.data.x * w) / 100;

    if (finalY > w/2) {
      finalY = finalY -  2 * (finalY - w/2);
    }
    else {
     finalY = finalY + 2 * (w/2 - finalY);
    }

    return (
      <Motion defaultStyle={{ x: h, y: w/2 }} style={{ x: spring(h/this.props.data.vy - 200), y: spring(finalY) }}>
        {
          value => <div
            style={{ width: 175, height: 325, top: value.x, right: value.y, position: 'fixed', zIndex: this.props.data.id }}
          >
            <img alt='' src={require('./bill.jpg')} />
          </div>
        }
      </Motion>
    );
  }
}

export default WebSocketComponent;
