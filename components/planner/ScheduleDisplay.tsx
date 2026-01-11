"use client";

interface ScheduleDisplayProps {
  schedule: string;
}

const ScheduleDisplay = ({ schedule }: ScheduleDisplayProps) => {
  // Format the schedule text to preserve line breaks and structure
  const formattedSchedule = schedule
    .split("\n")
    .map((line, index) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return null;
      
      // Check if it's a heading
      if (trimmedLine.startsWith("#")) {
        const level = trimmedLine.match(/^#+/)?.[0].length || 1;
        const text = trimmedLine.replace(/^#+\s*/, "");
        return (
          <div
            key={index}
            className={`font-bold text-right mb-4 mt-6 ${
              level === 1
                ? "text-2xl"
                : level === 2
                  ? "text-xl"
                  : "text-lg"
            }`}
          >
            {text}
          </div>
        );
      }
      
      // Check if it's a list item
      if (trimmedLine.startsWith("-") || trimmedLine.startsWith("*") || /^\d+\./.test(trimmedLine)) {
        return (
          <div key={index} className="text-right mb-2 pr-4">
            • {trimmedLine.replace(/^[-*]\s*|^\d+\.\s*/, "")}
          </div>
        );
      }
      
      // Regular paragraph
      return (
        <p key={index} className="text-right mb-4 leading-relaxed">
          {trimmedLine}
        </p>
      );
    })
    .filter(Boolean);

  return (
    <div className="mt-8 bg-white rounded-2xl p-6 sm:p-8 lg:p-12 shadow-lg">
      <h3 className="text-2xl sm:text-3xl font-bold text-right mb-6">
        جدول رحلتك
      </h3>
      <div className="text-right space-y-2" dir="rtl">
        {formattedSchedule.length > 0 ? (
          formattedSchedule
        ) : (
          <div
            className="prose prose-lg max-w-none text-right"
            dangerouslySetInnerHTML={{ __html: schedule }}
            dir="rtl"
          />
        )}
      </div>
    </div>
  );
};

export default ScheduleDisplay;
