(done) 1. -> Create a question model in VS matching the React question model (quizData in src/data)

(done) 2. -> Create an answer model in VS as per above

(done) 3. -> Create a new HTTP Folder in Models in VS.

(done)	3.1 -> Create a question request model som kommer se ut som den datan man skickar in/med när man anropar APIet
		(request = när man anropar APIet med data från t.ex. en form, genom put/post)

(done)	3.2 -> Create a question (response?) model som skickas tillbaka från APIet, som blir som en kopia av databasmodellen

(done)	3.3 -> Do the same for the answer model

(done) 4. -> Create the database and seed it with the two questions in the quizData. Answer has to have Id too and questionId.

(done) 5. -> Create a question controller.

(done)	5.1 -> Allow use of the question model and HTTP Models

(done)	5.2 -> Get data from the database.

(done)	5.3 -> Return it as Json.

(done) 6. -> Find out how to call the API from React

(done) 7. -> Create Component/function in React that calls the API

(done)	7.1 -> Store data in state and display as per usual.
	7.2 -> Create an actual seeding method in C# in dbContext or elsewhere when time allows (this can be down prioritised).

8. -> Read up routing, link at the top of this document.

(done) 9. -> When all of the above works, check how to best follow the REST API standard and setting response header/body etc.
	
(done)	9.1 -> Check how to set data in the response header.
	
(done)	9.2 -> Check how to set data in the response body.
	
(done)	9.3 -> Implement it.

10. -> Create a post-route and component where user, in a form, enters a question, then (not needed) page changes to add 4 answers (and set a radio button on the correct one or something like that), use routing and push to history.

10.1 -> Pointing to the API, use fetch with the method 'POST', headers: { "Content-type": "application/json"}, and send in the methods body: JSON.stringify({object that fits the database databasemodel})
Receive the model, check for null and then map the request DTO to the databsemodel and add to Db. Then map to a responsemodel and return Ok if all went well. Else error.

(done) 12. -> Create the admin role.

12.1 -> Restrict adding questions to only allow users with the admin role to do it.

13. -> Add HighScore component in front end and model + return in controller/backend.
14. -> Check the G and VG criterias.

15. -> Make sure it's all responsive.

16. -> Clean and shave excessive code.

17. -> Add some CSS animations and proceed re-iterate this list.
