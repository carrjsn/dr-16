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
      beat: 0,
      grid: []
    };

    this.playDrum = this.playDrum.bind(this);
    this.makeGrid = this.makeGrid.bind(this);
    this.changeActiveStatus = this.changeActiveStatus.bind(this);
  }

  componentDidMount() {
    this.makeGrid();
  }

  playDrum(drum) {
    // make clone of original audio node to allow for overlapping plays
    let audioClone = this[drum].cloneNode(true);
    audioClone.play();
  }

  changeActiveStatus(pad, drum) {
    // play the square/pad
    this.playDrum(drum);
    // change status
    this.setState((prev) => {
      let copy = prev.grid;
      copy[pad.row][pad.beat].isActive = !copy[pad.row][pad.beat].isActive;
      return {grid: copy};
    });
  }

  makeGrid() {
    let rows = [];
    for (let i = 0; i < 3; i++) {
      let row = [];
      for (let j = 0; j < 16; j++) {
        // create pad obj
        row.push({
          row: i,
          beat: j,
          isActive: false
        })
      }
      rows.push(row);
    }
    console.log(rows);
    this.setState({ grid: rows }, () => console.log(this.state));
  }

  // startSequence() {

  // }

  render() {
    let hiHatRow = this.state.grid[0];
    let snareRow = this.state.grid[1];
    let kickRow = this.state.grid[2]

    return (
      <div id='main'>
        <h2>DR-16</h2>
        <div className='button-container'>
          <button id='play'>Play</button>
          <button id='pause'>Pause</button>
        </div>

        <div className='hi-hat row'>
          <span className="drum-name">Hi Hat</span>
          <SquareRow drum={'hiHat'} play={this.playDrum} pads={hiHatRow} row={0} changeStatus={this.changeActiveStatus}/>
        </div>
        <div className='snare row'>
          <span className="drum-name">Snare</span>
          <SquareRow drum={'snare'} play={this.playDrum} pads={snareRow} row={1} changeStatus={this.changeActiveStatus}/>
        </div>
        <div className='kick row'>
          <span className="drum-name">Kick</span>
          <SquareRow drum={'kick'} play={this.playDrum} pads={kickRow} row={2} changeStatus={this.changeActiveStatus}/>
        </div>

      </div>
    );
  }

};

ReactDOM.render(<App />, document.getElementById('app'));