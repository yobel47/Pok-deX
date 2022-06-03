import { TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import {
  Bug,
  Dark,
  Dragon,
  Electric,
  Fairy,
  Fighting,
  Fire,
  Flying,
  Ghost,
  Grass,
  Ground,
  Ice,
  Normal,
  Poison,
  Psychic,
  Rock,
  Steel,
  Water,
} from '../../assets/icons';

function Logo({
  name, onPress, height, width, style,
}) {
  let RenderIcon;
  switch (name) {
    case 'bug':
      RenderIcon = Bug;
      break;
    case 'dark':
      RenderIcon = Dark;
      break;
    case 'dragon':
      RenderIcon = Dragon;
      break;
    case 'electric':
      RenderIcon = Electric;
      break;
    case 'fairy':
      RenderIcon = Fairy;
      break;
    case 'fighting':
      RenderIcon = Fighting;
      break;
    case 'fire':
      RenderIcon = Fire;
      break;
    case 'flying':
      RenderIcon = Flying;
      break;
    case 'ghost':
      RenderIcon = Ghost;
      break;
    case 'grass':
      RenderIcon = Grass;
      break;
    case 'ground':
      RenderIcon = Ground;
      break;
    case 'ice':
      RenderIcon = Ice;
      break;
    case 'normal':
      RenderIcon = Normal;
      break;
    case 'poison':
      RenderIcon = Poison;
      break;
    case 'psychic':
      RenderIcon = Psychic;
      break;
    case 'rock':
      RenderIcon = Rock;
      break;
    case 'steel':
      RenderIcon = Steel;
      break;
    case 'water':
      RenderIcon = Water;
      break;
    default:
      RenderIcon = Normal;
  }

  return (
    <TouchableWithoutFeedback
      style={{ paddingHorizontal: 20, ...style }}
      onPress={onPress}
    >
      {name ? (
        <RenderIcon height={height} width={width} style={{ color: 'white' }} />

      ) : (
        <Normal height={10} width={10} style={{ color: 'white' }} />
      )}
    </TouchableWithoutFeedback>
  );
}

export default Logo;
