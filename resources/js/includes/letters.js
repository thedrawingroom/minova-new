export default {
  init() {
    $('.title-split').each(function (index, element) {
      const heading = $(element);
      const text = $(element).html();
      const segmenter = new Intl.Segmenter([], { granularity: 'word' });
      const segmentedText = segmenter.segment(text);
      const words = [...segmentedText].filter(s => s.isWordLike).map(s => s.segment);
      const length = words.length;

      if (length > 1) {
        const lastItem = ' <span style="color: #FAB90A;">' + words.splice(-1) + '</span>';
        heading.html([words, lastItem].join(''));
      }
    });
  },
};
