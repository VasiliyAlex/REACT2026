import React from 'react';

interface Props {
  onClick: () => void;
}

export class ErrorButton extends React.Component<Props> {
  render() {
    return (
      <button
        type="button"
        onClick={this.props.onClick}
        className="m-4 p-2 bg-red-500 text-white self-end"
      >
        Error Button
      </button>
    );
  }
}