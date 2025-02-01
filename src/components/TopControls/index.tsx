import { Component } from 'react';

interface TopControlsProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

class TopControls extends Component<TopControlsProps> {
  handleQuery = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.props.onQueryChange(e.target.value);
  };

  render() {
    return (
      <header>
        <form onSubmit={this.props.onSubmit}>
          <div>
            <input
              type="text"
              value={this.props.query}
              onChange={this.handleQuery}
              placeholder="Search..."
            />
          </div>
          <button type="submit">Search</button>
        </form>
      </header>
    );
  }
}

export default TopControls;
