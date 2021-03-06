import fs from 'fs';
const cardSvg = fs.readFileSync(__dirname + '/../image/card.svg', 'utf8');

class Card {

  constructor(rank, family) {

    this.rank = rank;
    this.family = family;
    this.container = document.createElement('div');
    this.container.classList.add('card-container');
    this.container.innerHTML = `<div>${cardSvg}</div>`;
    this.svgCard = this.container.querySelector('svg');
    this.gRankCard = this.svgCard.getElementById('rank');
    this.gFamilyCard = this.svgCard.getElementById('family');
    this.revealColor();

  }

  isSameFamily(card) {

    return this.family === card.family;

  }

  isSameRank(card) {

    return this.rank === card.rank;

  }

  revealColor () {

    const gRankCardItems = this.gRankCard.getElementsByTagName('g');
    const gFamilyCardItems = this.gFamilyCard.getElementsByTagName('g');

    Array.from(gRankCardItems).forEach(rank => {

      if (rank.id !== this.rank){

        this.gRankCard.removeChild(rank);

      } else {

        const paths = rank.getElementsByTagName('path');
        const color = this.family === 'club' || this.family === 'spade' ? '#3D3C3C' : '#FF6161';
        Array.from(paths).forEach(path => path.setAttribute('fill', color) );

      }

    });

    Array.from(gFamilyCardItems).forEach(family => {

      if (family.id !== this.family){

        this.gFamilyCard.removeChild(family);

      } else {

        const paths = family.getElementsByTagName('path');
        const color = this.family === 'club' || this.family === 'spade' ? '#3D3C3C' : '#FF6161';
        Array.from(paths).forEach(path => path.setAttribute('fill', color) );

      }

    });

  }

  toJson() {

    return {
      rank: this.rank,
      family: this.family,
    };

  }

}

export { Card };
