import { useEffect, useState } from "react";
import Description from "./Description/Descriptions";
import Options from "./Options/Options";
import Feedback from "./Feedback/Feedback";
import css from "./App.module.css";
import Notification from "./Feedback/Notification";
const initialCountFeedback = {
  good: 0,
  neutral: 0,
  bad: 0,
};

export default function App() {
  const [feedbacks, setFeedback] = useState(() => {
    const stringifiedFeedbacks = localStorage.getItem("feedbackValues");
    const feedbackParse =
      JSON.parse(stringifiedFeedbacks) ?? initialCountFeedback;
    return feedbackParse;
  });
  const handleResetFeedback = () => {
    setFeedback(initialCountFeedback);
  };

  const handleLogFeedback = (feedbackName) => {
    setFeedback({ ...feedbacks, [feedbackName]: feedbacks[feedbackName] + 1 });
  };

  const feedbackTotal = Object.values(feedbacks).reduce(
    (acc, curr) => acc + curr,
    0
  );
  const positive =
    feedbackTotal === 0
      ? 0
      : Math.round(
          ((feedbacks.good + feedbacks.neutral) / feedbackTotal) * 100
        );

  useEffect(() => {
    localStorage.setItem("feedbackValues", JSON.stringify(feedbacks));
  }, [feedbacks]);

  return (
    <div className={css.box}>
      <Description />
      <Options
        handleResetFeedback={handleResetFeedback}
        handleLogFeedback={handleLogFeedback}
        total={feedbackTotal}
      />
      {feedbackTotal === 0 ? (
        <Notification />
      ) : (
        <Feedback
          feedbacks={feedbacks}
          total={feedbackTotal}
          positive={positive}
        />
      )}
    </div>
  );
}
