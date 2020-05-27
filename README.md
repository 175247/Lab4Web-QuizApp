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

9. -> When all of the above works, check how to best follow the REST API standard and setting response header/body etc.
	
	9.1 -> Check how to set data in the response header.
	
	9.2 -> Check how to set data in the response body.
	
	9.3 -> Implement it.

10. -> Create a post-route and component where user, in a form, enters a question, then page changes to add 4 answers (and set a radio button on the correct one or something like that), use routing and push to history.

10.1 -> Call a post API and send the [FormBody]. Add it to the database.

11. -> Create a component to log in with, send a post request to the controller api, check login credentials -
		If the credentials are OK, send an ok request and success-status. If success, proceed. else show error etc.
		Inject the userManager/SignIn-manager in the controller and make requests as such.

11.1 Create a registration with post etc. Remember to check if the user already exists in the api. Similar to the sign in.

12. -> Create the admin role.

12.1 -> Restrict adding questions to only allow users with the admin role to do it.

12. -> Check the G and VG criterias.

13. -> Make sure it's all responsive.

14. -> Clean and shave excessive code.

15. -> Add some CSS animations and proceed re-iterate this list.
