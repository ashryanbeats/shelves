const wallWidth = 82.5;
const shelfWidth = 36;
const shelfCount = 2;

const blankSpaceTotal = wallWidth - shelfWidth * shelfCount;
const blankSpaceCount = shelfCount + 1;
const singleBlankSpaceWidth = blankSpaceTotal / blankSpaceCount;

const bracketPadding = 6;
const bracketCount = 4;

const calculateSingleShelfBrackets = (leftMargin) => {
  return {
    1: leftMargin + bracketPadding,
    2: leftMargin + (shelfWidth - bracketPadding),
  };
};

const calculateBracketsForAllShelves = () => {
  let shelvesWithBrackets = new Array(shelfCount).fill(0).map((shelf, i) => {
    const shelfWithMargin = singleBlankSpaceWidth + shelfWidth;
    const leftMargin = singleBlankSpaceWidth + i * shelfWithMargin;
    return calculateSingleShelfBrackets(leftMargin);
  });

  return shelvesWithBrackets;
};

const bracketPositions = calculateBracketsForAllShelves();

console.log(bracketPositions);
