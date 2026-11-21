export const parseSection = (section = '') => {
  const [title, ...content] = section.split('\n');

  const cleanTitle = title.startsWith('#')
    ? title.substring(1).trim()
    : title.trim();

  const points = [];
  let currentPoint = '';

  content.forEach((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('.')) {
      if (currentPoint) points.push(currentPoint.trim());
      currentPoint = trimmedLine;
    } else if (!trimmedLine) {
      if (currentPoint) points.push(currentPoint.trim());
      currentPoint = '';
    } else {
      currentPoint += ' ' + trimmedLine;
    }
  });

  if (currentPoint) points.push(currentPoint.trim());

  return {
    title: cleanTitle,
    points: points.filter(
      (point) =>
        point &&
        !point.startsWith('#') &&
        !point.startsWith('[Choose')
    ),
  };
};

export const parsePoint = (point = '') => {
  const isNumbered = /^\d+\./.test(point);
  const isMainPoint = /^\./.test(point);

  const emojiAtStartRegex = /^(\p{Emoji}|\p{Extended_Pictographic})/u;
  const hasEmoji = emojiAtStartRegex.test(point.trim());
  const isEmpty = !point.trim();

  return { isNumbered, isMainPoint, hasEmoji, isEmpty };
};

export const parseEmojiPoint = (content = '') => {
  const cleanContent = content.replace(/^[.]\s*/, '').trim();
  const matches = cleanContent.match(/^(\p{Emoji}+)(.+)$/u);

  if (!matches) return null;

  const [_, emoji, text] = matches;

  return {
    emoji: emoji.trim(),
    text: text.trim(),
  };
};
