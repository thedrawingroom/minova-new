export default {
  init() {
    $('.title-split').each(function (index, element) {
      const heading = $(element);
      const text = $(element).html();
      
      const segmenter = new Intl.Segmenter([], { granularity: 'word' });
      const segmentedText = segmenter.segment(text);
      
      const words = [...segmentedText];
      const length = words.filter(s => s.isWordLike).length;

      if (length > 1) {
        let lastWordIndex = -1;

        for (let i = words.length - 1; i >= 0; i--) {
          if (words[i].isWordLike) {
            lastWordIndex = i;
            break;
          }
        }

        const updatedSegments = words.map((segment, index) => {
          if (index === lastWordIndex) {
            return `<span style="color: #FAB90A;">${segment.segment}</span>`;
          }
          return segment.segment;
        });

        heading.html(updatedSegments.join(''));
      }
    });
  },
};
