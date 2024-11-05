export default {
  init() {
    $('.title-split').each(function (index, element) {
      var heading = $(element);
      var word_array, last_word, first_part;

      word_array = heading.html().split(/\s+/); // split on spaces
      console.log(word_array.length);
      last_word = word_array.pop(); // pop the last word
      first_part = word_array.join(' '); // rejoin the first words together

      if (word_array.length > 1) {
        heading.html([first_part, ' <span style="color: #FAB90A;">', last_word, '</span>'].join(''));
      } else {
        heading.html([first_part, last_word].join(''));
      }
    });
  },
};
