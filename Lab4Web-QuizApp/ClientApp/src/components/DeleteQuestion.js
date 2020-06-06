import React from 'react'

export default function DeleteQuestion(props) {
    const question = props.question;
    console.log(question)
    return (
        <div>
            <p>Question: {question.questionString}</p>
            <p>ID: {question.id}</p>
            <ol>
                Answers:
                {question.answerOptions.map(answer =>
                <li key={answer.id}>{answer.answerString}</li>)}
                <br />
                <button className="btn btn-primary" onClick={() => deleteQuestion()}>Delete</button>
            </ol>
            <button className="btn btn-primary" onClick={() => props.stateHandler("list", null)}>Back to the list</button>
        </div>

    )
    async function deleteQuestion() {
        await fetch('questions/' + question.id, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
        })
        await props.stateHandler("list", null);
    }
}