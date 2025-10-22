## SSM Project 👇

```
There is our SSM Project Backend Part 👇 What we are did till know 05/09/2025....
```

```
1.  We are Done With our Database models what we are do and why we are did and which things is important to store . Because one a database models created we have an idea how we are make a API's and what problem's i'll solve and it's reason . It's has a clear picture of project what we are build then automatically we got idea how things are work and there flow . they also help me to create a good frontend and thinking power how we are make our frontend and which page i wanna be show to a which type of user , if a student showing different user interface .. Okay i understand what i meant .....
```

```
2. In this Project we have a total 5 Main type of user 👇 All have they completed Authentication and Authorizations controller's...

Developer :-
Hod :-
Teacher :-
Principal :-
Students :-
```

```
3. Below a All Data Models Explanations why we are make a that one models and it's also help me to understand problem in future..  Make Sure Write Down All Models Details in depth and one by one ....
```

```
Help-Models :- 👇

1. Developer Models :- Here we are storing a all about developer details and it's track record what he will did in a softwar .

2. Help Models :- If any Failure occurs or system crash or any type of updation college need Teacher , Hod, and Principal just sent help message to a developer for full filled problem.

3. Students Help Models :- Those models only accessciable who students become a our pro student means Buy a Subjects according to their class . they ask for question and asking for help to solve our problem to a developer .

4. Upload Subject Models :- There System Owner Means Developer upload a Subjects for students according to their class and other Solutions.
```

```
Hod-Models :- 👇

1. DateSheet Models :-  In this datesheet model where only particular department hod create date sheet for mst , ut and other task for .. Only Hod Can Access these

2. Hod Models :- Here We are store all about register Hod Details track there record how they are use software and all about hod they belong to a particular department

3. Paper Assign Place Models :- In this models where a that one department of hod create a sheet where they create a Place where they conduct a Paper like Mst , ut and for other Task same like that in the final Universtiy paper where a one page are on board and inside class name ,it's roll no and Paper name and it's all about ..

4. Time Tables Models :- Here Hod can create a lecture time table according to that class and assign teachers means that one particular teacher assign which one classes like that first lecture , second and so on .. and it is same for a hod . simple we can say like my BscIT 5 where hod create class lecture time table and assign teacher who take a lecture for that oen particular subject .. i understand what i meant ... Note:- This is only create by a hod not a Teacher or other .
```

```
Principal-Models :- 👇

1. Principal Models :- Here are Principal Model all details they we are store in our db Principal not do anthings they just see analytics and our college teacher, Students and hod perfromance
```

```
Students-Models :- 👇

1. Students Acheivement Models :- In this model where one students upload their acheivement and winning moments on college their id to show case a all type of user in the site 

2. Students Complaint Models :- Here a Students can put complaint against teacher that is did not like a way how they teach .

3. Students FeedBack Form Models :- Feedback form here a student gives a feedback to a our teacher at the end of a semester or in mid . that teacher how they teach us class and other things..

4. Students Images Models :- In this model one student ask and chat with other student ask with their topic problem class subjects problem and othen work as a chating application . if any student have a problem in any question or regarding to any subject topic they just upload a image on there and if any one have a solutions then thet problem is solved ... i understood what i want to implement ..

5. Students Models :- In this Student model we are store all about students details and all there activity how they efficiently use a software and what they do...
```

```
Teacher-Models :- 👇

1. Teacher Models :- Here We are store all about a teacher how they are use and work on a software and add other details they need when they are create.
```

```
Utils-Models :- 👇

1. Assign Task Models :- If Any Teacher and hod want to get some Points and earn some they are just assign to task to their assign classes and earn . Principal also give task to teacher and student by they are not getting a points.

2. Events Models :- Here All type of user upload a college Events images not include students .

3. MarkSheet Models :- Teacher And Hod Create a Models Marksheet and final result of a Mst and ut . this is a reason is start to build this project 

4. Notifications Models :- Here Teacher , Hod and Principal Sent a Notification to a Students and all user ..

5. Overall Record Models :- Only Tecaher , HOD and Principal can Access these here Store one Student overall details Performance and their result

6. Sent Request Money Models :- If End of a Semester and After they have a complete all Points they just will sent a Money request to won a result ..

7. Student MarkSheet Details Models :- This is a overall result of students wheather it is Final Exam and College Exam ...

```

```
## Know Make a flow how we are make our next controller and what's a step by step guide which controller be first and then next because it is important to decide becuase many of the api we are get user details by it's details so that why make sure Make all backend flow below . and then after that we are easy to thing about how our frontend work and what a element and how many pages we are need that add only usefull things not a random stuff ..
```

## Below Next Backend flow 👇 
## Below Backend Get Api's we need to append data on "Frontend"👇 
## Frontend Pages How much are neccessary 👇

```
 All Type of User have same basic Authenticated and Authorization Page Below Like 👇
```
- >> Register Page.
- >> Login Page.
- >> Forgot Password Page.
```
 Below Similar Models Used By Type of User But Only Students 👇
```
- >> Assign Task Page // Access by Hod's Teacher and Principal. >>> But Not Developer
- >> Help Page // Access by Hod's Teacher and Principal. >>> But Not Developer
- >> Event Image upload Page // Access by Hod's Teacher and Principal. Also Developer.
- >> MarkSheet Create Page // Access by Hod's and Teacher.
- >> Notification sent Page // Access by Hod's Teacher and Principal. >>> But Not Developer
- >> OverAll Record Create Page // Access by Hod's and Teacher.
- >> Sent Request Money Page // // Access by Hod's Teacher and Students
- >> Student MarkSheet Details Model Page // Access by Hod's and Teacher.

- Note :- For other Authentication and Authorization Like -> changeAvatar, changeEmail, changePassword, deactivateAccount, logout,   updateStudentDetailsOnDB, verifyOtpEmail, verifyViaEmail :- These Authentication and Authorization for we are creating a components or icons in pages not specifically create a anotheter page , because it take so much lengthy that' why ..

```
Page 1 -> Home Page.
Page 2 -> SSM College Explore Page.
Page 3 -> Register Page
Page 4 -> Login Page
Page 5 -> Forgot Password Page
Page 6 -> Assign Task Page
Page 7 -> Help Page
Page 8 -> Event Image upload Page
Page 9 -> MarkSheet Create Page
Page 10 -> Notification sent Page
Page 11 -> OverAll Record Create Page
Page 12 -> Sent Request Money Page
Page 13 -> Student Help Model Page
Page 14 -> Upload Subject Models Page
Page 15 -> DateSheet Model Page
Page 16 -> Paper Assign Place Models Page
Page 17 -> Time Table Models Page
Page 18 -> Student Achivement Model Page
Page 19 -> Student Complaint Models Page
Page 20 -> Student Feedback Models Page
Page 21 -> Student Image Uplad Models Page // NO 
Page 22 -> Student MarkSheet Details Model Page
```
```
Now These Above type of pages are defined because we have a Data Moels Clearty. But Now We have No idea how much are total need and create so that's why what we do right know i'll first create all Api End Points and then figure out How much api's data append page need and how many dynamic web pages create. Before Creating a pages first of all we are create all api routes they are give us idea how data are receive and sent.
```

```
```
Now We Have an idea what we do i think when we make a backend API's for example Api of create a Student Marksheet details firstly make that frontend flow we are taking a data from a frontend , they got me a idea how data store next step is that make a backend of that particular Api after that a check that api thru postman once APi create a successfully , check there data on database and figure out how that Api data show on frontend and it's all about of that one particular api . Similary to that next one ... This Help to give a idea about software how they work and also help me to figure out how new things. features and Pages add ...

```