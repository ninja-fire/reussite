class Card {

  constructor(rank, family) {

    this.rank = rank;
    this.family = family;
    this.container = document.createElement('div');
    this.container.classList.add('card-container');
    this.container.innerHTML =
      `<div>
  ${this.rank} ${this.family}
</div>`;

  }

  isSameFamily(card) {

    return this.family === card.family;

  }

  isSameRank(card) {

    return this.rank === card.rank;

  }

  toJson() {

    return {
      rank: this.rank,
      family: this.family,
    };

  }

}

export { Card };
