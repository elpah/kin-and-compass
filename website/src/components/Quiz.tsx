"use client";

import { quizQuestions } from "@/data/lessons";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export function Quiz({ lessonSlug }: { lessonSlug: string }) {
  const { markComplete, user } = useAuth();
  const [answers, setAnswers] = useState<number[]>(Array(quizQuestions.length).fill(-1));
  const [submitted, setSubmitted] = useState(false);
  const score = answers.filter((a, i) => a === quizQuestions[i].answer).length;

  return (
    <div className="mt-8 space-y-6">
      {quizQuestions.map((item, i) => (
        <fieldset key={item.q} className="rounded-lg bg-white p-5 ring-1 ring-sand">
          <legend className="font-semibold text-burgundy">
            {i + 1}. {item.q}
          </legend>
          <div className="mt-3 space-y-2">
            {item.options.map((opt, oi) => {
              const chosen = answers[i] === oi;
              const correct = submitted && oi === item.answer;
              const wrong = submitted && chosen && oi !== item.answer;
              return (
                <label
                  key={opt}
                  className={`flex cursor-pointer items-center gap-3 rounded px-3 py-2 text-sm ${
                    correct
                      ? "bg-emerald-50 text-emerald-900"
                      : wrong
                        ? "bg-rose-50 text-crimson"
                        : "hover:bg-cream"
                  }`}
                >
                  <input
                    type="radio"
                    name={`q${i}`}
                    className="accent-crimson"
                    disabled={submitted}
                    checked={chosen}
                    onChange={() =>
                      setAnswers((prev) => {
                        const next = [...prev];
                        next[i] = oi;
                        return next;
                      })
                    }
                  />
                  {opt}
                </label>
              );
            })}
          </div>
        </fieldset>
      ))}
      {!submitted ? (
        <button
          type="button"
          className="h-12 rounded bg-burgundy px-8 text-sm font-semibold text-white"
          onClick={() => {
            setSubmitted(true);
            if (user) markComplete(lessonSlug);
          }}
        >
          Check answers
        </button>
      ) : (
        <p className="text-burgundy">
          You scored {score} / {quizQuestions.length}.{" "}
          {score >= 4
            ? "You are ready to browse Visit Ghana."
            : "Revisit etiquette and travel-prep lessons, then try again."}
        </p>
      )}
    </div>
  );
}
