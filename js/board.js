class Board {

  constructor(rootContainer, onMoveCard) {

    this.cards = [];
    this.rootContainer = rootContainer;
    this.onMoveCard = onMoveCard;
    this.container = document.createElement('div');
    this.container.id = 'board-container';
    this.rootContainer.appendChild(this.container);

  }

  isWinSize() {

    return this.cards.length === 2;
  }

  canMove(card) {

    const pickedIndex = this.cards.findIndex(boardCard => boardCard === card);

    if (pickedIndex > 0 && pickedIndex < this.cards.length - 1) {

      if (this.cards[pickedIndex - 1].isSameFamily(this.cards[pickedIndex + 1]) || this.cards[pickedIndex - 1].isSameRank(this.cards[pickedIndex + 1])) {

        return true;
      }
    }

    return false
  }

  addCard(card) {
    this.cards.push(card);
    this.container.appendChild(card.container);
    card.container.addEventListener('click', () => this.onMoveCard(card) )
  }

  suppPreviousCard(card){
    const previousCard = this.cards.find(  (_, i) => this.cards[i + 1] === card);
    this.cards = this.cards.filter( (boardCard) => boardCard !== previousCard);
    this.container.removeChild(previousCard.container);
  }

  canMoveAtLeastOne() {
    return !!this.cards.find(card => this.canMove(card))
  }

  destroy() {
    this.cards = [];
    this.rootContainer.removeChild(this.container);
    this.container.innerHTML = '';
  }

  toJson() {

    return this.cards.map(card => card.toJson());

  }

}

export { Board };
