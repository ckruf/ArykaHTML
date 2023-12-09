import { BrickImage } from 'https://assets.acdn.no/pkg/@amedia/brick-image/v2/brick-image.js';
import { BrickPlayer } from 'https://assets.acdn.no/pkg/@amedia/brick-player/v1/eik/brick-player.js';

if (customElements && !customElements.get('brick-image')) {
  customElements.define('brick-image', BrickImage);
}

if (customElements && !customElements.get('brick-player')) {
  customElements.define('brick-player', BrickPlayer);
}
