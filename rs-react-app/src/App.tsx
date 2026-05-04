import React from 'react';
import { Search } from './components/Search';
import { CardList } from './components/CardList';
import { ErrorButton } from './components/ErrorButton';
import './App.css';

interface State {
  query: string;
  triggerError: boolean;
}

export class App extends React.Component {
  state: State = {
    query: localStorage.getItem('searchQuery') || '',
    triggerError: false,
  };

  onSearch = (query: string) => {
    this.setState({ query });
  };

  render() {
    if (this.state.triggerError) {
      throw new Error('Test error');
    }

    return (
      <div className="flex flex-col min-h-screen">
        <Search onSearch={this.onSearch} />
        <CardList search={this.state.query} />
        <ErrorButton onClick={() => this.setState({ triggerError: true })} />
      </div>
    );
  }
}
