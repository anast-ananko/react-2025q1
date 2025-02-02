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
      <div className="bg-white p-4 rounded-lg max-w-sm mx-auto">
        <form onSubmit={this.props.onSubmit} className="flex space-x-2">
          <div className="flex-1">
            <input
              type="text"
              value={this.props.query}
              onChange={this.handleQuery}
              placeholder="Search..."
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-0 focus:border-green-400 text-sm placeholder-gray-400"
            />
          </div>
          <button
            type="submit"
            className="py-2 px-4 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-green-600 text-sm font-semibold transition duration-300 cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default TopControls;
