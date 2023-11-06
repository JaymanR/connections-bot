module.exports = (string) => {
  function hasSequence(str) {
    return /(.)\1{3}/u.test(str);
  }

  let correct = 0;
  let incorrect = 0;

  for (let i = 0; i < string.length; i += 8) {
    const puzzleSection = string.slice(i, i + 8);

    if (hasSequence(puzzleSection)) {
      correct++;
    } else {
      incorrect++;
    }
  }

  return [correct, incorrect];
};
