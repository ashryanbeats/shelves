#!/usr/bin/env node
const cli = require("cli");

cli.enable("version");

const args = cli.parse({
  wallWidth: ["w", "Wall width", "int", 82.5],
  shelfWidth: ["s", "Shelf width", "int", 36],
  shelfCount: ["c", "Shelf count", "int", 2],
  bracketPadding: [
    "p",
    "Padding between the edge of the shelf and the center of the bracket",
    "int",
    5,
  ],
});

const { wallWidth, shelfWidth, shelfCount, bracketPadding } = args;

if (shelfWidth * shelfCount > wallWidth) {
  cli.fatal("Your shelves are wider than your wall.");
}

const blankSpaceTotal = wallWidth - shelfWidth * shelfCount;
const blankSpaceCount = shelfCount + 1;
const singleBlankSpaceWidth = blankSpaceTotal / blankSpaceCount;

const calculateSingleShelfBrackets = (leftMargin) => {
  return {
    1: leftMargin + bracketPadding,
    2: leftMargin + (shelfWidth - bracketPadding),
  };
};

const calculateBracketsForAllShelves = () => {
  let shelvesWithBrackets = new Array(shelfCount).fill(0).map((_shelf, i) => {
    const shelfWithMargin = singleBlankSpaceWidth + shelfWidth;
    const leftMargin = singleBlankSpaceWidth + i * shelfWithMargin;

    return calculateSingleShelfBrackets(leftMargin);
  });

  return shelvesWithBrackets;
};

const bracketPositions = calculateBracketsForAllShelves();

cli.output(bracketPositions);
