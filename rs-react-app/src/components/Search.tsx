import React from 'react';

interface Props {
  onSearch: (query: string) => void;
}

interface State {
  search: string;
  lastQuery: string;
}

export class Search extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const saved = localStorage.getItem('searchQuery') || '';
    this.state = {
      search: saved,
      lastQuery: saved,
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ search: e.target.value });
  };


  handleClick = () => {
    const trimmed = this.state.search.trim();
    if (trimmed === this.state.lastQuery) return;
    localStorage.setItem('searchQuery', trimmed);
    this.setState({ lastQuery: trimmed });
    this.props.onSearch(trimmed);
  };

  render() {
    return (
      <div className="flex gap-2 p-4 bg-gray-100 border border-black ">
        <input
          value={this.state.search}
          placeholder="Enter your query"
          onChange={this.handleChange}
          className="border p-2 text-gray-800 w-full"
        />
        <button
          type="button"
          onClick={this.handleClick}
          className="bg-blue-500 text-white p-2 hover:bg-blue-700 transition rounded cursor-pointer"
        >
          Search
        </button>
      </div>
    );
  }
}
