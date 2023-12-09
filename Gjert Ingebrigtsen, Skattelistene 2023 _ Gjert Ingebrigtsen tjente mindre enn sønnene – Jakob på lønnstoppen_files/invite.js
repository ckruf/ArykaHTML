import { BrickButton } from 'https://assets.acdn.no/pkg/@amedia/brick-button/v1/dist/dist.js';

class AmediaCommentInvite extends BrickButton {
    constructor() {
        super();
        this.addEventListener('click', () => {
            const amediaComments = document.querySelector('amedia-comments');
            const amediaCommentsArea = document.querySelector('.am-commentArea');
            if (amediaComments) {
                amediaComments.scrollIntoView();
            } else if (amediaCommentsArea) {
                amediaCommentsArea.scrollIntoView();
            }
        });
    }
}

if (!customElements.get('amedia-comment-invite')) {
  customElements.define('amedia-comment-invite', AmediaCommentInvite);
}