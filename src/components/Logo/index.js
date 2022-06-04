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
  name, height, width, style,
}) {
  let RenderIcon;
  switch (name) {
    case 'Bug':
      RenderIcon = Bug;
      break;
    case 'Dark':
      RenderIcon = Dark;
      break;
    case 'Dragon':
      RenderIcon = Dragon;
      break;
    case 'Electric':
      RenderIcon = Electric;
      break;
    case 'Fairy':
      RenderIcon = Fairy;
      break;
    case 'Fighting':
      RenderIcon = Fighting;
      break;
    case 'Fire':
      RenderIcon = Fire;
      break;
    case 'Flying':
      RenderIcon = Flying;
      break;
    case 'Ghost':
      RenderIcon = Ghost;
      break;
    case 'Grass':
      RenderIcon = Grass;
      break;
    case 'Ground':
      RenderIcon = Ground;
      break;
    case 'Ice':
      RenderIcon = Ice;
      break;
    case 'Normal':
      RenderIcon = Normal;
      break;
    case 'Poison':
      RenderIcon = Poison;
      break;
    case 'Psychic':
      RenderIcon = Psychic;
      break;
    case 'Rock':
      RenderIcon = Rock;
      break;
    case 'Steel':
      RenderIcon = Steel;
      break;
    case 'Water':
      RenderIcon = Water;
      break;
    default:
      RenderIcon = Water;
  }
  return (
    <TouchableWithoutFeedback
      style={{ paddingHorizontal: 20, ...style }}
    >
      {name ? (
        <RenderIcon height={height} width={width} style={{ color: 'white' }} />
      ) : (
        <Normal height={20} width={20} style={{ color: 'white' }} />
      )}
    </TouchableWithoutFeedback>
  );
}

export default Logo;
