import React from 'react';
import { parseEmojiPoint, parsePoint } from '../../utils/summaryHelper';

const EmojiPoint = ({ point }) => {
  const parsed = parseEmojiPoint(point);
  if (!parsed) return null;

  const { emoji, text } = parsed;

  return (
    <div className="relative bg-gradient-to-br from-gray-200/[0.1] to-gray-400/[0.05] p-3 my-3 rounded-xl border border-gray-500/10 hover:shadow-md transition-all">
      <div className="flex items-start gap-3">
        <span className="text-xl shrink-0 pt-0.5">{emoji}</span>
        <p className="text-base lg:text-lg text-gray-700 leading-relaxed text-left">
          {text}
        </p>
      </div>
    </div>
  );
};

const RegularPoint = ({ point }) => {
  return (
    <div className="relative bg-gradient-to-br from-gray-200/[0.1] to-gray-400/[0.05] p-3 my-3 rounded-xl border border-gray-500/10 hover:shadow-md transition-all">
      <div className="flex items-start gap-3">
        <p className="text-base lg:text-lg text-gray-700 leading-relaxed text-left">
          {point}
        </p>
      </div>
    </div>
  );
};

const ContentSection = ({ points = [] }) => {
  return (
    <div className="space-y-4">
      {points.map((point, index) => {
        const { hasEmoji, isEmpty } = parsePoint(point);

        if (isEmpty) return null;

        // Remove leading dot and whitespace
        const cleanPoint = point.replace(/^\.\s*/, '').trim();

        if (hasEmoji) {
          const parsed = parseEmojiPoint(cleanPoint);
          if (parsed) {
            return (
              <EmojiPoint key={`point-${index}`} point={cleanPoint} />
            );
          }
          return (
            <RegularPoint key={`point-${index}`} point={cleanPoint} />
          );
        }

        return <RegularPoint key={`point-${index}`} point={cleanPoint} />;
      })}
    </div>
  );
};

export default ContentSection;
