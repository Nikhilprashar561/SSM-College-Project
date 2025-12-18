# SSM Project — Backend (MERN Stack)

### Last Updated: 31/10/2025

Welcome to the **SSM Project Backend Folder** — this file represents the backend logic and database design for the SSM College Project*.  
---

##  Project Overview

This backend is designed to support a full-featured college management platform.  
It handles **authentication, authorization,Email-Verification, Data Encryption** for all user types.

---

##  Development Progress

###  What’s Completed

1. **Database Models**  
   - All database models are complete.  
   - Each model defines what data is stored, why it is important, and how it will be used in the APIs.  
   - Having a clear schema structure helps visualize the full project flow, ensuring smoother API and frontend development.  
   - These models guide how data moves between users, the backend, and the frontend.

2. **User Authentication & Authorization**  
   - Implemented for all five major user types:
     -  **Developer**
     -  **HOD (Head of Department)**
     -  **Teacher**
     -  **Principal**
     -  **Student**

3. **Model Documentation**
   - Each model includes a short explanation describing its purpose, data importance, and use case within the system.

---

##  User Roles & Responsibilities

| User Type | Description |
|------------|--------------|
| **Developer** | Manages the system, updates subjects, handles requests, and resolves technical issues. |
| **HOD** | Manages their department, creates timetables, assigns tasks, and oversees teachers. |
| **Teacher** | Manages class-related activities, uploads marks, and handles notifications. |
| **Principal** | Oversees all analytics, performance, and activities of teachers, students, and departments. |
| **Student** | Interacts with the platform by uploading achievements, submitting feedback, and viewing results. |

---

##  Database Model Groups

### 🛠 Help Models

| Model | Description |
|--------|--------------|
| **Developer Model** | Stores developer details and track records of updates made in the software. |
| **Help Model** | Used by HODs, Teachers, and Principals to send help or issue reports directly to the developer. |
| **Student Help Model** | Used by premium students to ask doubts or raise queries to the developer. |
| **Upload Subject Model** | Allows the developer to upload and manage subjects for students based on class and department. |

---

###  HOD Models

| Model | Description |
|--------|--------------|
| **DateSheet Model** | Allows HODs to create date sheets for MSTs, UTs, and other exams. |
| **HOD Model** | Stores all registered HOD details, including department and system activity. |
| **Paper Assign Place Model** | Defines the place and schedule for department exams (MST/UT/Final). |
| **TimeTable Model** | Allows HODs to assign teachers to specific lectures and manage class schedules. |

---

###  Principal Models

| Model | Description |
|--------|--------------|
| **Principal Model** | Stores principal details and provides analytics access to monitor performance. |

---

###  Student Models

| Model | Description |
|--------|--------------|
| **Student Achievement Model** | Students can upload achievements and showcase them to others. |
| **Student Complaint Model** | Students can submit complaints regarding teachers or academic issues. |
| **Student Feedback Form Model** | Students provide semester-end feedback for teachers. |
| **Student Image Model** | Students can share images/questions for help — works like a discussion/chat section. |
| **Student Model** | Stores all student details and their overall activity across the system. |

---

###  Utility Models

| Model | Description |
|--------|--------------|
| **Assign Task Model** | HODs, Teachers, and Principals can assign or receive tasks to earn performance points. |
| **Events Model** | Used by all roles (except students) to upload and manage college event images. |
| **MarkSheet Model** | Stores student exam performance (MST, UT, etc.) created by Teachers and HODs. |
| **Notifications Model** | Allows Teachers, HODs, and Principals to send notifications to students. |
| **Overall Record Model** | Maintains overall student performance and result data. |
| **Send Request Money Model** | Allows eligible users to send requests for rewards after semester completion. |
| **Student MarkSheet Details Model** | Contains a student’s complete academic result details. |

---

##  Backend API Development Flow

To maintain clarity and prevent dependency issues, we follow a **structured controller development flow**.

###  Step-by-Step Controller Creation Flow

1. **Start with Independent Controllers**  
   - Developer Controllers  
   - Help Controllers  
   - Subject Upload Controllers  

2. **Move to Department-Level Controllers**  
   - HOD, Teacher, Principal Controllers  
   - TimeTable, DateSheet, and Paper Assignment APIs  

3. **Create Student-Related Controllers**  
   - Student Details, Complaints, Feedback, and Achievements APIs  

4. **Integrate Utility Controllers**  
   - Notification, Event, Task, and Marksheet APIs  

5. **Finalize Overall Records & Money Request Controllers**

6. **Testing Phase**
   - Test each API using **Postman**.
   - Validate with real sample data.
   - Verify database entries.

---

## API Completion Update

```
Each Type of user have 12 type of similar api request 👇

Register
Login
Forgot Password
Verify Email OTP
Email-Verification By Request
Verify Email - GET
Logout - GET
Deactivate Account - GET
Update Credentails - PATCH
Change Avatar  - PATCH
Chnange Email  - PATCH
Change Password - PATCH

```

I’ve completed all the API endpoints so far, but now I need to check how to use this API —  
meaning how to fetch data in a structured way and how to give users better performance  
so that the app can be used more effectively.

# Upcoming Necxt Step to do 

```
1. Figure out All Get Api How Efficiently we fetch data from all post api. Means First Taking all Sanario from one api how the type of data we fetch and taking the user credential.

2. Figure Out User requirement from that one Particular Api, New Api development like (update - delete ) What ever they look .

3. 2. Once the figure out all the api usages then how much need pages and component we are required to append that get or optimize data and where role based.

4. First Complete Above all then Agin Figure Out What Next Step is that.
```


##  Author

**Nikhil Sharma**  
Full Stack Developer 😊
