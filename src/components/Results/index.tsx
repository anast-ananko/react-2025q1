import { Component } from 'react';
import { Character } from '../../types/apiTypes';
import CharacterCard from '../CharacterCard';

interface ResultsProps {
  characters: Character[];
}

class Results extends Component<ResultsProps> {
  render() {
    const { characters } = this.props;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    );
  }
}

export default Results;
