import { Component } from 'react';
import { Character } from '../../types/apiTypes';

interface ResultsProps {
  characters: Character[];
}

class Results extends Component<ResultsProps> {
  render() {
    const { characters } = this.props;

    return (
      <>
        {characters.map((character) => (
          <div key={character.name}>
            <p>{character.name}</p>
            <p>{character.status}</p>
          </div>
        ))}
      </>
    );
  }
}

export default Results;
