# Recipes Book application
Recipes Book application built using Spring Boot v2.4, Spring Security with JPA Authentication, Spring Data JPA with MySQL -  You can find the backend source code here : https://github.com/OuniAbir/recipe-book-back-spring

The frontend is built using Angular v10.


*main branch : for dev.

*master branch : for deploy on heroku.


# Deploy 

The Application is deployed on Heroku - Deploy Link : https://recipe-book-front-angular.herokuapp.com/

For Login you can use these credentials :


	-name : Guest
	-password : Guest


Link to code : 

*Frontend: https://github.com/OuniAbir/recipes-book-front-angular/tree/master 

*Backend: https://github.com/OuniAbir/recipe-book-back-spring/tree/master


## Java Development Environment

You should have the following items already installed 


	-JDK
	-Maven
	
## DataBase 

1- You should have MySQL Database and MySQL Workbench instaled.


## Usage 


1- Download the backend and run it on the http://localhost:8080


2- Download the Frontend and run it using : ng serve --open, the application will be opened on the link : http://localhost:4200



## Application pages

1- Start Page :
![Start Page ](https://github.com/OuniAbir/recipes-book-front-angular/blob/main/app-screenShots/startPage.png)


2- Sign Up page :


![Sign Up](https://github.com/OuniAbir/recipes-book-front-angular/blob/main/app-screenShots/signUp.PNG)


After you enter your information, you will be redirected to login page and receive mail for activation link.

![SignUpSucces](https://github.com/OuniAbir/recipes-book-front-angular/blob/main/app-screenShots/signUpSucce.PNG)



3- Login Page  :

![Login Page ](https://github.com/OuniAbir/recipes-book-front-angular/blob/main/app-screenShots/LoginPage.PNG)



4- Recipe Details only for loggedin user :


![Recipe detail ](https://github.com/OuniAbir/recipes-book-front-angular/blob/main/app-screenShots/recipeDetails.PNG)


5- recipe review for loggedin user: 


![review ](https://github.com/OuniAbir/recipes-book-front-angular/blob/main/app-screenShots/review.PNG)



The owner of recipe will receive a notification mail for interactions on his recipe.


![mail ](https://github.com/OuniAbir/recipes-book-front-angular/blob/main/app-screenShots/NotifEmail.PNG)


6- searche by Name :

![search by name](https://github.com/OuniAbir/recipes-book-front-angular/blob/main/app-screenShots/search.PNG)


7- when u are logged in :


![ logged in](https://github.com/OuniAbir/recipes-book-front-angular/blob/main/app-screenShots/logged.PNG)



8- when your not logged in :


![ not logged in ](https://github.com/OuniAbir/recipes-book-front-angular/blob/main/app-screenShots/loggout.PNG)
