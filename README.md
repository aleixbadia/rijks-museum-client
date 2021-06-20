# Rijk Museum - Client

Welcome to the Rijk Museum Art Gallery

## Description

On this web application you will find a display of some of the art objects present in the Rijk Museum. Here you will be able to search them by name or maker and also add them to you list of favourite art objects.

The development is based on MERN, Typescript and Antdesign. The deployment has been done on Heroku.

## User stories - Client

- **Gallery - homepage** - As a client you are able to access the homepage, where a nice gallery of all the art objects will be shown tou you and where you will be able to searh them by title or maker.

- **Details** - As a client you are able click on any card of the gallery and you will be redirected to a details page. There you will be able to read the description of the art object and also add it to you list of favourite art objects.

- **Favourite art objects list** - As a client you are able to see the list of all your favourite the art objects and also delete them from the list.

- **Sign up - Login** - As a client you are able to sign up and ogin on the web page so that you can access the functionaities of the favourite art abjects.

- **Logout** - As a client you are able to log out from the web page so that I can make sure no one will access my account.

# Client / Frontend

## React Router Routes (React App)

| Path                     | Component | Behavior                                                                          |
| ------------------------ | --------- | --------------------------------------------------------------------------------- |
| `/`                      | Gallery   | Home page with a display of all art objects.                                      |
| `/signup`                | Signup    | Signup form, navigate to homepage after signup.                                   |
| `/login`                 | Login     | Login form, navigate to homepage after login.                                     |
| `/logout`                | n/a       | Navigate to Home screen after logout, expire session.                             |
| `/favourites`            | Gallery   | Show the the list of favourite art objects and lets you delete them from you list |
| `/details/:objectNumber` | Profile   | Show art object details and lets you add it to you list of favourites.            |

## Git

Url to repository and to deployed project

[Repository Link](https://github.com/aleixbadia/rijks-museum-client)
