import { Component } from 'react';

import { Character } from '../../types/apiTypes';

interface CharacterCardProps {
  character: Character;
}

class CharacterCard extends Component<CharacterCardProps> {
  render() {
    const { character } = this.props;

    return (
      <div className="bg-white p-4 border border-green-600 rounded-lg shadow-lg max-w-sm mx-auto">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-64 object-cover rounded-t-lg"
        />
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-gray-800">
            {character.name}
          </h3>
          <p className="text-sm text-gray-700">{`Status: ${character.status}`}</p>
          <p className="text-sm text-gray-700">{`Species: ${character.species}`}</p>
          <p className="text-sm text-gray-700">{`Gender: ${character.gender}`}</p>
          <p className="text-sm text-gray-700">{`Location: ${character.location.name}`}</p>
          <p className="text-sm text-gray-700">{`Origin: ${character.origin.name}`}</p>
        </div>
      </div>
    );
  }
}

export default CharacterCard;
