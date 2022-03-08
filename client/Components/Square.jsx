import React from 'react';

class Square extends React.Component {
  constructor(props) {
    super();

    this.state = {
      isActive: false
    }
  }

  render() {
    let classList = this.state.isActive ? 'square active' : 'square inactive';

    return (
      <div beat={this.props.idx} className={classList} onClick={() => {
        this.props.play(this.props.drum);
        this.setState((prev) => {
          return { isActive: !prev.isActive }
        });
      }}></div>
    );
  }
}

export default Square;


