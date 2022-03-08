import React from 'react';
import ReactDOM from 'react-dom';
import SquareRow from './Components/SquareRow.jsx';
import kick from './audio/Kick.mp3';
import snare from './audio/Snare.mp3';
import hiHat from './audio/Hi-Hat-Closed.mp3';

class App extends React.Component {
  constructor() {
    super();
    this.kick = new Audio(kick);
    this.snare = new Audio(snare);
    this.hiHat = new Audio(hiHat);

    this.state = {
      // drum grid update tracking..
    };

    this.playDrum = this.playDrum.bind(this);
  }

  playDrum(drum) {
    // make clone of original audio node to allow for overlapping plays
    let audioClone = this[drum].cloneNode(true);
    audioClone.play();
  }

  // startSequence() {

  // }

  render() {
    return (
      <div id='main'>
        <h2>DR-16</h2>
        <div className='button-container'>
          <button id='play'>Play</button>
          <button id='pause'>Pause</button>
        </div>
        <div className='hi-hat row'>
          <span className="drum-name">Hi Hat</span>
          <SquareRow drum={'hiHat'} play={this.playDrum}/>
        </div>
        <div className='snare row'>
          <span className="drum-name">Snare</span>
          <SquareRow drum={'snare'} play={this.playDrum}/>
        </div>
        <div className='kick row'>
          <span className="drum-name">Kick</span>
          <SquareRow drum={'kick'} play={this.playDrum}/>
        </div>

      </div>
    );
  }

};

ReactDOM.render(<App />, document.getElementById('app'));