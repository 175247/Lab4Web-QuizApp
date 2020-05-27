import React from "react"

function Question(props) {
    //let displayStatus = !props.correctAnswer ? "Wrong choice..." : null

    // Currently the displayStatus is always active.
    // Make it so that it only appears AFTER we've selected the wrong answer
    // Also... try to make the button logic below "better" Great job at making it work though!
    // Now just improve it. :)

    //{ console.log(props.question) }
    return (
        <div>
            <p>{props.question.questionString}</p>
            {
                props.question.answerOptions.map(answer => (
                    <button className="btn btn-primary"
                        key={answer.id}
                        onClick={() => props.handler(answer)}
                    >
                        {answer.answerString}
                    </button>
                ))
            }
        </div>
    )
}

export default Question