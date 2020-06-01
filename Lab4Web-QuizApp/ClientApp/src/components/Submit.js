import React from "react";

export default async function Submit(inputData) {
  const QuestionString = inputData.question;
  const correctAnswer = {
    Answerstring: inputData.correctAnswer,
    IsCorrectAnswer: true,
  };
  const answer2 = { AnswerString: inputData.answer2, IsCorrectAnswer: false };
  const answer3 = { AnswerString: inputData.answer3, IsCorrectAnswer: false };
  const request = {
    QuestionString: QuestionString,
    AnswerOptions: [correctAnswer, answer2, answer3],
  };
  console.log(JSON.stringify(request));
  return await fetch("questions", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(request),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
}
