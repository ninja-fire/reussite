import fs from 'fs';
const cardSvg = fs.readFileSync(__dirname + '/../image/card-all.svg', 'utf8');

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
    this.gRankCardItems = this.gRankCard.getElementsByTagName('g');
    this.gFamilyCardItems = this.gFamilyCard.getElementsByTagName('g');
    Array.from(this.gRankCardItems).forEach(rank => {
      if (rank.id !== this.rank){
        this.gRankCard.removeChild(rank);
      } else {
        const paths = rank.getElementsByTagName('path');
        Array.from(paths).forEach(path => {
          path.setAttribute('fill', '#3D3C3C');
        });
      }
    });

    Array.from(this.gFamilyCardItems).forEach(family => {
      if (family.id !== this.family){
        this.gFamilyCard.removeChild(family);
      } else {
        const paths = family.getElementsByTagName('path');
        Array.from(paths).forEach(path => {
          path.setAttribute('fill', '#3D3C3C');
        });
      }
    });
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
