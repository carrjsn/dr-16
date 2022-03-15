import React from 'react';
import ReactDOM from 'react-dom';
import SquareRow from './Components/SquareRow.jsx';
import kick from './audio/Kick.mp3';
import snare from './audio/Snare.mp3';
import hiHat from './audio/Hi-Hat-Closed.mp3';
import * as Tone from 'tone';

class App extends React.Component {
  constructor() {
    super();

    this.kick = new Audio(kick);
    this.snare = new Audio(snare);
    this.hiHat = new Audio(hiHat);

    this.state = {
      // drum grid update tracking..
      beat: 0,
      grid: [],
      isPlaying: false,
      currEvent: null
    };

    this.playDrum = this.playDrum.bind(this);
    this.makeGrid = this.makeGrid.bind(this);
    this.startSequence = this.startSequence.bind(this);
    this.stopSequence = this.stopSequence.bind(this);
    this.changeActiveStatus = this.changeActiveStatus.bind(this);
  }

  componentDidMount() {
    this.makeGrid();
  }

  componentDidUpdate() {
    // start play loop
    if (this.state.isPlaying) {
      console.log('looping')
    } else {
      console.log('paused')
    }
  }

  playDrum(drum) {
    // make clone of original audio node to allow for overlapping plays
    let audioClone = this[drum].cloneNode(true);
    audioClone.play();
  }

  changeActiveStatus(pad, drum) {
    this.playDrum(drum);
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

  startSequence() {
    if (!this.state.isPlaying) {
      this.setState({isPlaying: true});
    }

    // assign uploaded mp3 audio files to Tone.js 'note value keys' so they can be referenced and triggered later
    // a tone.js 'note' key must be a keyboard note 'g1', 'd3', 'a2', etc... regardless of the actual audio value
    const tones = new Tone.Sampler({
      'A1': hiHat,
      'B1': snare,
      'C1': kick
    }).toDestination();

    const noteMap = {
      0: 'A1',
      1: 'B1',
      2: 'C1'
    }

    // scheduleRepeat returns a unique event Id - store in state and use to "clear() the event" on stop click
    let eventId = Tone.Transport.scheduleRepeat(repeat, '8n');
    this.setState({currEvent: eventId});

    Tone.Transport.bpm.value = 135;

    // Start loop
    Tone.start()
    .then(() => {
      Tone.Transport.start();
    })
    .catch((err) => {
      console.log('error', err)
    })

    const rows = document.getElementsByClassName('row');
    let idx = 0;

    function repeat(time) {
      // current step
      let step = idx % 16;
      // iterate over beat nodes
      for (let i = 0; i < rows.length; i++) {
        let note = noteMap[i];
        let row = rows[i];
        let square = row.querySelector(`.square:nth-child(${step + 1})`);
        // if node is Active
        if (square.classList.contains('active')) {
          // trigger attack
          tones.triggerAttackRelease(note, '8n', time)
        }
      }
      // increment global index
      idx++;
    }
  }

  stopSequence() {
    if(this.state.isPlaying) {
      this.setState({isPlaying: false});
    }
    Tone.Transport.clear(this.state.currEvent);
    Tone.Transport.stop();
  }

  render() {
    let hiHatRow = this.state.grid[0];
    let snareRow = this.state.grid[1];
    let kickRow = this.state.grid[2]

    return (
      <div id='main'>
        <h2>DR-16</h2>
        <div className='button-container'>
          <button id='play' onClick={this.startSequence} >Play</button>
          <button id='pause' onClick={this.stopSequence} >Pause</button>
        </div>



        <div className='hi-hat row'>
          <span className="drum-name">Hi Hat</span>
          <SquareRow
            beat={this.state.beat}
            drum={'hiHat'}
            play={this.playDrum}
            pads={hiHatRow}
            row={0}
            isPlaying={this.state.isPlaying}
            changeStatus={this.changeActiveStatus}/>
        </div>

        <div className='snare row'>
          <span className="drum-name">Snare</span>
          <SquareRow
            beat={this.state.beat}
            drum={'snare'}
            play={this.playDrum}
            pads={snareRow}
            row={1}
            isPlaying={this.state.isPlaying}
            changeStatus={this.changeActiveStatus}/>
        </div>

        <div className='kick row'>
          <span className="drum-name">Kick</span>
          <SquareRow
            beat={this.state.beat}
            drum={'kick'}
            play={this.playDrum}
            pads={kickRow}
            row={2}
            isPlaying={this.state.isPlaying}
            changeStatus={this.changeActiveStatus}/>
        </div>

      </div>
    );
  }

};

ReactDOM.render(<App />, document.getElementById('app'));