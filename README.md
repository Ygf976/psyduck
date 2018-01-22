_Synopsis_
===================
### Team Psyduck :  **Emmanuel Coucy, Yann Giry-Fouquet, Etienne Gineste, Silouane Galinou**

#  TUTO FONCTIONNEMENT APPLICATION

## commande a lancé dans l'ordre pour lauch l'application :


* mongod
* npm run initiateDB
* npm start

## Fonction Disponible et Fonctionnelle

getEmployeeVacations
getEmployeesVacationsByManage
addVacation
createEmployee
authenticate


## Action disponible sur le calendrier

# **The Subject**
-----------

Our project will be a web site displaying a calendar. It will be the main plateforme of vacation gestion between the employee and the employer. 

This tool will allow employee to drop vacation wishes and allow the employer to validate this days or not according to the disponibility of the team and according to the demand of the service. 

Why develop such a web site :  especially as an answer to a real need of the nursing employee who are  struggling to get a decent planning due to the under staff and the non-expertise of the cadre to deals with the planning amenagement.

**This subject will be decomposed in 4 parts :** 

* 1 parts of conception of the web site (the schedule page, the  authentication page, the inscription pages) 
* 1 parts of development of the calendar ( how to display it, what to display on this calendar, how to define to make it efficient and optimized for our application) 
* Back end development :  3,4 routes for our web pages,  
* Conception of the BDD and it’s connection to our application


**Some problems/challenge  will interfere with our project development :** 

* Displaying a calendar who is rightfully parameterized and visually optimized to make clear and easy  the vacation gestion. 
* The booking and unbooking of vacation period in the bdd. 
* Problem with the selection of vacation day ( discontinued time  : Monday, Tuesday, Thursday, Friday ...) 


## **Conception**
-------------


**Our solutions** 

*  To answer the problematic of users gestion we will use mongoDB DataBase and put in place a connection via the mongoose module. 

* The server and Back-End parts will be established on Node.js

*  Voir pour la conception? sur node + framework? ou angular ?.. 
* The Web page will be coded in HTML with a CSS design

**Architecture :**

![structure du projet ](https://img4.hostingpics.net/pics/56198823365219102148385345062851933550889n.jpg)










## **Planning**
-------------------


**Team :**

* _Emmanuel_ _Coucy_ 		**Project Manager**
* _Yann_ _Giry-Fouquet_		**Technical Manager**
* _Etienne_ _Gineste_		**Design Manager**
* _Silouane_ _Galinou_		**Communication Manager**

### Nos tâches regroupées en titre de phases avec leur volume de travail

| Tâches     | Membre     |
| --------------| ------------  | 
| Creation of the Node server and definition of routes | *Yann & Emmanuel* |
| Conception of BDD (MongoDB) (employee, manager, information employee : vacation day) | *Silouane* |
| Connection MongoDB (module mongoose ?)| *Emmanuel or Yann* |
| Conception of Web pages (login page, calendar page, employee management page in administrator mode) and their interaction with Node.js | *Etienne & Silouane* |
| Creation of a calendar in javascript | *Etienne* |
| Mechanism for the reservation of a day off | *Etienne  + (Yann & Emmanuel)* |
| Live Synchronization of all calendars | *All four* |
| Automatic suggestions for day off | *All four* |

### Agenda de ces tâches par personnes, par semaines avec en plus les rdv physiques de l’équipe :

| Week          | Phase         | Description      |
| --------------| ------------  | ----------       |
| Week 1        |       1       | Formation of the team - Brainstorming for a project idea - Elaboration of a synopsis  |
| Week 2        |       2       | Elaboration of the node server and their routes - Creation of the webpages and their design (1) - Conception of Mongodb |
| Week 3        |       3       | Creation of the webpages and their design (2) - Connection with mongoDB    |
| Week 4        |       4       | Creation of the functionalities for the differents webpages and their interaction with node (1) - Mechanism for the reservation of a day off                    |
| Week 5        |       5       | Creation of the functionalities for the differents webpages and their interaction with node (2) - Live Synchronization of all calendars   |
| Week 6        |       6       | Automatic suggestions for day off  |
| Week 7        |       7       | Finalisation of the project  |
## **Our initial prototype**
------------------------------

#### Our first prototype

* A employee management page (admin mode)
* A login page differencing the employee of the manager.
* A calendar page with a simple calendar. The employee can select a date and ask for a day off.
* The manager can accept or not the request.
* The employee will see if is request is accepted or not.
* If too many employees want the same vacation laptime the manager will know and will refuse the employee request.



#### What we want our prototype to be

* There will be 2 different calendars : one for the manager which is totally transparent and one for the employee who will just see if the day is available or not
* The calendar will be adapted to highlight the days where the requests are disabled according to the number of employees who request those days



#### Ideas of improvement


* Add a notification system when the manager took the decision to accept or not the request of the employee
* Add meeting management for the manager account. It can permits to synchronise all the employee calendar needed for the meeting

We will follow the roadmap and everyone has to work several hours per week in order to achieve our goals for every stages. With the weekly meeting we will know if we are on tracks for the realisation of our prototype.

