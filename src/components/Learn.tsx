"use client";

import { QuestionType } from "@/app/[locale]/library/flashCards/[id]/learn/page";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Locale } from "../../i18n-config";

function Learn({ id, t, locale }: { id: string; t: any; locale: Locale }) {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [questions, setQuestions] = useState<QuestionType[]>([]);

  const [progress, setProgress] = useState<number>(10);
  const [revealAnswer, setRevealAnswer] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await fetch(`/api/questions/${id}`);
      const questions = await res.json();
      setQuestions(questions.questions);
    };
    setIsClient(true);
    fetchQuestions();
  }, []);

  const flipCard = () => {
    setRevealAnswer(!revealAnswer);
  };

  const updateStatus = async (status: string) => {
    if (currentQuestion === questions.length - 1) {
      router.push(`/${locale}/library/${id}`);
    }
    const res = await fetch("/api/questions/status", {
      method: "PUT",
      body: JSON.stringify({ status, id: questions[currentQuestion].id }),
    });

    setCurrentQuestion((prev) => prev + 1);
    const progress = Math.ceil(
      ((currentQuestion + 1) / questions.length) * 100
    );
    setProgress(progress);
  };

  if (!isClient) return;

  return (
    <div>
      <div className="flex flex-col pt-10 w-screen h-screen overflow-hidden">
        <div className="flex justify-center items-center text-3xl font-bold w-full my-5">
          {currentQuestion} / {questions.length}
        </div>
        <div
          style={{ width: "100%", height: "10px", backgroundColor: "#DDD6FE" }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor: "#3B82F6",
              transition: "width 0.5s ease",
            }}
          ></div>
        </div>
        <div className="bg-violet-50 w-full h-10 flex-grow flex justify-center items-center">
          <div
            className="p-10 w-3/4 h-3/4 bg-white rounded-2xl border border-blue-500 flex flex-col justofy-between items-center gap-3"
            onClick={flipCard}
          >
            <div className="flex justify-end w-full text-sm text-gray-500 cursor-pointer">
              {t?.["reveal-answer.text"]}
            </div>
            <div
              className={`card relative bottom-3 ${revealAnswer ? "flip" : ""}`}
            >
              <div className="front text-3xl font-bold">
                {questions[currentQuestion]?.question}
              </div>
              <div className="back text-3xl font-bold">
                {questions[currentQuestion]?.answer}
              </div>
            </div>
            <div className="w-full flex gap-2">
              <div
                className="flex-grow text-center bg-red-200 p-3 rounded-md cursor-pointer text-lg font-bold"
                onClick={(e) => {
                  e.stopPropagation();
                  updateStatus("Still Learning");
                }}
              >
                {t?.["still-learning.text"]}
              </div>
              <div
                className="flex-grow text-center bg-green-200 p-3 rounded-md cursor-pointer text-lg font-bold"
                onClick={(e) => {
                  e.stopPropagation();
                  updateStatus("Mastered");
                }}
              >
                {t?.["mastered.text"]}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Learn;
