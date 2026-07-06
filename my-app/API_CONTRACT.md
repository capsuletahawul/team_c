# Capsule Tahawul API Contract

**Version:** 1.0  
**API Style:** REST API  
**Format:** JSON  
**Base URL:** `/api/v1`

---

# Table of Contents

1. Introduction
2. Authentication
3. API Standards
4. Authentication APIs
5. Platform APIs
6. Course APIs
7. Trainer APIs
8. Student APIs
9. Learning APIs
10. Quiz & Assignment APIs
11. Review APIs
12. Trainer Workspace APIs
13. Company APIs
14. Admin APIs
15. Notification APIs
16. AI Chatbot APIs
17. Support APIs
18. Error Handling
19. Authorization Matrix
20. Security
21. HTTP Status Codes

---

# 1. Introduction

The Capsule Tahawul API provides backend services for the learning platform that connects Students, Trainers, Companies, and Administrators.

This API follows REST architecture and exchanges data using JSON.

Every endpoint in this document is directly derived from the system User Stories.

---

# 2. Authentication

Unless stated otherwise, protected endpoints require:

```
Authorization: Bearer <JWT_TOKEN>
```

Users are authenticated using JWT access tokens after successful login.

Role-based authorization (RBAC) determines which endpoints can be accessed.

Supported Roles:

- Guest
- Student
- Trainer
- Company
- Admin

---

# 3. API Standards

## Base URL

```
/api/v1
```

---

## Request Format

```
Content-Type: application/json
Accept: application/json
```

---

## Standard Success Response

```json
{
    "success": true,
    "message": "Operation completed successfully.",
    "data": {}
}
```

---

## Standard Error Response

```json
{
    "success": false,
    "message": "Validation failed.",
    "errors": []
}
```

---

# ==========================================================
# AUTHENTICATION MODULE
# ==========================================================

Derived From

Feature 3
Secure Authentication

---

## Action 1

### Register Student

Creates a new Student account.

### Endpoint

POST /api/v1/auth/register

### Authentication

❌ Public

### Headers

```
Content-Type: application/json
```

### Request Body

```json
{
    "fullName": "John Doe",
    "email": "john@email.com",
    "password": "Password123",
    "confirmPassword": "Password123"
}
```

---

### Validation Rules

| Field | Validation |
|--------|------------|
| fullName | Required • Minimum 3 characters |
| email | Required • Valid Email • Unique |
| password | Required • Minimum 8 characters |
| confirmPassword | Must match password |

---

### Business Rules

- Email address must be unique.
- Password is encrypted before storage.
- New accounts are assigned the Student role.
- Verification email is generated after successful registration.

---

### Success Response

HTTP 201 Created

```json
{
    "success": true,
    "message": "Student account created successfully.",
    "data": {
        "id": 25,
        "role": "Student",
        "email": "john@email.com"
    }
}
```

---

### Error Responses

#### 400 Bad Request

```json
{
    "success": false,
    "message": "Missing required fields."
}
```

#### 409 Conflict

```json
{
    "success": false,
    "message": "Email already exists."
}
```

#### 422 Validation Error

```json
{
    "success": false,
    "message": "Passwords do not match."
}
```

---

## Action 2

### Login

Authenticates an existing user.

### Endpoint

POST /api/v1/auth/login

### Authentication

❌ Public

### Headers

```
Content-Type: application/json
```

### Request Body

```json
{
    "email": "john@email.com",
    "password": "Password123"
}
```

---

### Business Rules

- Credentials must match existing account.
- JWT token is generated.
- User role is identified.
- Login timestamp is recorded.
- User is redirected to the appropriate dashboard.

---

### Success Response

HTTP 200 OK

```json
{
    "success": true,
    "message": "Login successful.",
    "data": {
        "token": "JWT_TOKEN",
        "userId": 25,
        "role": "Student"
    }
}
```

---

### Error Responses

#### 401 Unauthorized

```json
{
    "success": false,
    "message": "Invalid email or password."
}
```

#### 403 Forbidden

```json
{
    "success": false,
    "message": "Your account is pending approval."
}
```

---

## Action 3

### Logout

### Endpoint

POST /api/v1/auth/logout

### Authentication

✅ Required

### Business Rules

- Invalidates JWT token.
- Terminates current session.
- Removes refresh token.
- Redirects user to the homepage.

---

### Success Response

HTTP 200 OK

```json
{
    "success": true,
    "message": "Logged out successfully."
}
```
# ==========================================================
# PLATFORM OVERVIEW MODULE
# ==========================================================

Derived From

Feature 1
Platform Vision & Ecosystem Overview

---

## Overview

These endpoints provide all public information displayed on the landing page, allowing visitors to understand the platform ecosystem before creating an account.

Authentication

❌ Not Required

---

## Action 1

### Retrieve Platform Overview

Returns the main information displayed on the public homepage.

### Endpoint

GET /api/v1/platform/overview

---

### Authentication

Public

---

### Headers

```
Accept: application/json
```

---

### Request Parameters

None

---

### Business Rules

- Accessible by everyone.
- Returns latest platform statistics.
- Returns platform value proposition.
- Includes sections for Students, Trainers and Companies.
- Response is cached for performance.

---

### Success Response

HTTP 200 OK

```json
{
  "success": true,
  "message": "Platform overview retrieved successfully.",
  "data": {
    "platformName": "Capsule Tahawul",
    "studentsSection": {
      "title": "Start Your Learning Journey",
      "description": "Access free and premium technical courses."
    },
    "trainersSection": {
      "title": "Become a Trainer",
      "description": "Publish courses and earn revenue."
    },
    "companiesSection": {
      "title": "Corporate Training",
      "description": "Request customized bootcamps and hackathons."
    }
  }
}
```

---

### Error Responses

#### 500 Internal Server Error

```json
{
  "success": false,
  "message": "Unable to load platform information."
}
```

---

## Action 2

### Retrieve Onboarding Information

Returns onboarding instructions depending on the selected role.

### Endpoint

GET /api/v1/platform/onboarding/{role}

---

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| role | String | student, trainer, company |

---

### Business Rules

- Only valid roles are accepted.
- Unknown roles return 404.
- Information is maintained by the Admin.

---

### Success Response

```json
{
  "success": true,
  "data": {
    "role": "Trainer",
    "requirements": [
      "Professional experience",
      "LinkedIn profile",
      "CV Upload",
      "Admin approval required"
    ]
  }
}
```

---

### Error Response

HTTP 404

```json
{
  "success": false,
  "message": "Role not found."
}
```

---

# ==========================================================
# COURSE CATALOG MODULE
# ==========================================================

Derived From

Feature 2
Public Course Catalog Exploration

---

## Overview

These endpoints allow Guests and authenticated users to browse, search, filter and retrieve detailed course information.

---

## Action 1

### Retrieve All Courses

### Endpoint

GET /api/v1/courses

Authentication

Public

---

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | Integer | No | Current page |
| limit | Integer | No | Results per page |
| search | String | No | Search keyword |
| category | String | No | Filter category |
| level | String | No | Beginner / Intermediate / Advanced |
| sort | String | No | newest, oldest, price, rating |

---

### Business Rules

- Returns only published courses.
- Draft courses are hidden.
- Deleted courses never appear.
- Results are paginated.

---

### Success Response

```json
{
  "success": true,
  "data": {
    "page": 1,
    "totalPages": 8,
    "courses": [
      {
        "id": 15,
        "title": "React Bootcamp",
        "category": "Web Development",
        "price": 250,
        "rating": 4.8,
        "students": 1240,
        "thumbnail": "course15.jpg"
      }
    ]
  }
}
```

---

## Action 2

### Retrieve Course Details

Endpoint

GET /api/v1/courses/{courseId}

Authentication

Public

---

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| courseId | Course Identifier |

---

### Business Rules

Returns:

- Full description
- Learning objectives
- Trainer information
- Course syllabus
- Course duration
- Rating
- Reviews
- Enrollment count
- Prerequisites
- Price

---

### Success Response

```json
{
  "success": true,
  "data": {
    "id": 15,
    "title": "React Bootcamp",
    "description": "Complete React development course.",
    "price": 250,
    "duration": "32 Hours",
    "rating": 4.8,
    "students": 1240,
    "trainer": {
      "id": 4,
      "name": "John Smith"
    },
    "prerequisites": [
      "HTML",
      "CSS",
      "JavaScript"
    ]
  }
}
```

---

### Error Responses

HTTP 404

```json
{
  "success": false,
  "message": "Course not found."
}
```

---

## Action 3

### Search Courses

Endpoint

GET /api/v1/courses/search

---

### Query Parameters

| Parameter | Type |
|-----------|------|
| keyword | String |

---

### Business Rules

- Searches title.
- Searches description.
- Searches tags.
- Case insensitive.
- Partial matching supported.

---

### Example Request

```
GET /api/v1/courses/search?keyword=python
```

---

## Action 4

### Filter Courses

Endpoint

GET /api/v1/courses/filter

---

### Query Parameters

| Parameter | Example |
|-----------|---------|
| category | AI |
| price | Free |
| level | Beginner |
| trainer | Ahmed |

---

### Business Rules

Multiple filters may be combined.

Example

```
GET /api/v1/courses/filter?category=AI&level=Beginner
```

---

## Action 5

### Retrieve Course Categories

Endpoint

GET /api/v1/categories

Authentication

Public

---

### Success Response

```json
{
  "success": true,
  "data": [
    "Artificial Intelligence",
    "Programming",
    "Cybersecurity",
    "Data Science",
    "Cloud Computing",
    "Web Development"
  ]
}
```
# ==========================================================
# STUDENT MODULE
# ==========================================================

Derived From

Feature 4
Feature 6

---

## Overview

The Student Module manages student enrollment, dashboard information,
profile management, purchased courses, and learning progress.

Authentication

✅ Student Only

---

# STUDENT PROFILE

---

## Action 1

### Retrieve Student Profile

Returns the authenticated student's profile information.

### Endpoint

GET /api/v1/student/profile

---

### Authentication

Student

---

### Headers

```
Authorization: Bearer <JWT_TOKEN>
Accept: application/json
```

---

### Business Rules

- User must be authenticated.
- Returns only the authenticated user's profile.
- Password is never returned.

---

### Success Response

HTTP 200 OK

```json
{
  "success": true,
  "data": {
    "id": 18,
    "fullName": "John Doe",
    "email": "john@email.com",
    "avatar": "avatar.png",
    "joinedAt": "2026-01-12",
    "completedCourses": 6,
    "activeCourses": 3
  }
}
```

---

### Error Response

401 Unauthorized

```json
{
  "success": false,
  "message": "Authentication required."
}
```

---

## Action 2

### Update Student Profile

Allows students to edit their profile information.

### Endpoint

PUT /api/v1/student/profile

---

### Authentication

Student

---

### Request Body

```json
{
  "fullName": "John Smith",
  "avatar": "avatar2.png"
}
```

---

### Validation Rules

| Field | Validation |
|--------|------------|
| fullName | Required • 3-100 Characters |
| avatar | Optional • Image URL |

---

### Business Rules

- Email cannot be modified from this endpoint.
- Profile changes are immediately reflected across the platform.
- Updated avatar appears on reviews and dashboard.

---

### Success Response

```json
{
  "success": true,
  "message": "Profile updated successfully."
}
```

---

# DASHBOARD

---

## Action 3

### Retrieve Student Dashboard

Returns dashboard summary.

### Endpoint

GET /api/v1/student/dashboard

---

### Business Rules

Returns:

- Active Courses
- Completed Courses
- Certificates
- Upcoming Live Sessions
- Recent Notifications
- Learning Progress

---

### Success Response

```json
{
  "success": true,
  "data": {
    "activeCourses": 5,
    "completedCourses": 4,
    "certificates": 4,
    "notifications": 8,
    "upcomingSessions": 2
  }
}
```

---

# ENROLLMENT

---

## Action 4

### Enroll in Free Course

### Endpoint

POST /api/v1/student/courses/{courseId}/enroll

---

### Authentication

Student

---

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| courseId | Course Identifier |

---

### Business Rules

- Only free courses are allowed.
- Student cannot enroll twice.
- Enrollment date is recorded.
- Course becomes visible on dashboard immediately.

---

### Success Response

```json
{
  "success": true,
  "message": "Enrollment completed successfully."
}
```

---

### Error Responses

409 Conflict

```json
{
  "success": false,
  "message": "Student is already enrolled."
}
```

404 Not Found

```json
{
  "success": false,
  "message": "Course not found."
}
```

---

# PURCHASED COURSES

---

## Action 5

### Retrieve Purchased Courses

### Endpoint

GET /api/v1/student/courses

---

### Business Rules

Returns:

- Purchased Courses
- Free Enrollments
- Completion Percentage
- Last Access Date

---

### Success Response

```json
{
  "success": true,
  "data": [
    {
      "courseId": 15,
      "title": "React Bootcamp",
      "progress": 72,
      "status": "In Progress"
    },
    {
      "courseId": 20,
      "title": "Node.js",
      "progress": 100,
      "status": "Completed"
    }
  ]
}
```

---

# COURSE PROGRESS

---

## Action 6

### Retrieve Course Progress

Endpoint

GET /api/v1/student/courses/{courseId}/progress

---

### Business Rules

Returns

- Completed Lessons
- Remaining Lessons
- Completion Percentage
- Estimated Completion Date

---

### Success Response

```json
{
  "success": true,
  "data": {
    "completedLessons": 18,
    "remainingLessons": 7,
    "progress": 72,
    "estimatedCompletion": "2026-08-15"
  }
}
```

---

## Action 7

### Update Lesson Progress

Endpoint

PATCH /api/v1/student/courses/{courseId}/progress

---

### Request Body

```json
{
  "lessonId": 14,
  "completed": true
}
```

---

### Business Rules

- Marks lesson as completed.
- Recalculates progress percentage.
- Unlocks next lesson if prerequisites are met.
- Automatically checks certificate eligibility.

---

### Success Response

```json
{
  "success": true,
  "message": "Lesson marked as completed.",
  "data": {
    "progress": 76
  }
}
```

---

# CERTIFICATES

---

## Action 8

### Retrieve Earned Certificates

Endpoint

GET /api/v1/student/certificates

---

### Business Rules

Returns certificates only for courses completed successfully.

---

### Success Response

```json
{
  "success": true,
  "data": [
    {
      "certificateId": 8,
      "courseTitle": "React Bootcamp",
      "issueDate": "2026-08-22",
      "downloadUrl": "/certificates/8.pdf"
    }
  ]
}
```

---

## Action 9

### Download Certificate

Endpoint

GET /api/v1/student/certificates/{certificateId}/download

---

### Business Rules

- Certificate must belong to authenticated student.
- Download generated as PDF.
- Download event is logged.

---

### Success

HTTP 200 OK

Returns PDF File
# ==========================================================
# LEARNING MODULE
# ==========================================================

Derived From

Feature 7
Feature 8
Feature 9

---

## Overview

The Learning Module provides access to course content, recorded lessons,
downloadable resources, live sessions, quizzes, assignments and certificates.

Authentication

✅ Student Only

---

# COURSE MODULES

---

## Action 1

### Retrieve Course Modules

Returns all learning modules belonging to a course.

### Endpoint

GET /api/v1/courses/{courseId}/modules

---

### Authentication

Student

---

### Path Parameters

| Parameter | Type | Description |
|----------|------|-------------|
| courseId | Integer | Course ID |

---

### Business Rules

- Student must be enrolled.
- Modules are ordered by sequence.
- Locked modules are returned with status = Locked.

---

### Success Response

HTTP 200 OK

```json
{
  "success": true,
  "data": [
    {
      "moduleId": 1,
      "title": "Introduction",
      "status": "Completed"
    },
    {
      "moduleId": 2,
      "title": "React Components",
      "status": "Unlocked"
    },
    {
      "moduleId": 3,
      "title": "React Hooks",
      "status": "Locked"
    }
  ]
}
```

---

### Error Response

403 Forbidden

```json
{
  "success": false,
  "message": "You are not enrolled in this course."
}
```

---

# VIDEO LESSONS

---

## Action 2

### Retrieve Lesson

Returns lesson details.

### Endpoint

GET /api/v1/modules/{moduleId}

---

### Success Response

```json
{
  "success": true,
  "data": {
    "moduleId": 2,
    "title": "React Components",
    "duration": "38 Minutes",
    "videoUrl": "https://cdn.capsule.com/videos/react-components.mp4",
    "resources": 3
  }
}
```

---

## Action 3

### Mark Lesson as Completed

Endpoint

PATCH /api/v1/modules/{moduleId}/complete

---

### Authentication

Student

---

### Business Rules

- Lesson must be watched.
- Progress percentage is recalculated.
- Next lesson unlocks automatically.

---

### Success Response

```json
{
  "success": true,
  "message": "Lesson completed.",
  "data": {
    "progress": 58
  }
}
```

---

# COURSE RESOURCES

---

## Action 4

### Retrieve Resources

Endpoint

GET /api/v1/modules/{moduleId}/resources

---

### Returns

- PDFs
- Slides
- ZIP files
- Code Examples

---

### Success Response

```json
{
  "success": true,
  "data": [
    {
      "resourceId": 8,
      "title": "Lecture Slides",
      "type": "PDF"
    },
    {
      "resourceId": 9,
      "title": "Source Code",
      "type": "ZIP"
    }
  ]
}
```

---

## Action 5

### Download Resource

Endpoint

GET /api/v1/resources/{resourceId}/download

---

### Business Rules

- Student must own the course.
- Download activity is logged.
- Secure signed URL is generated.

---

### Success

HTTP 200 OK

Returns Binary File

---

# LIVE SESSIONS

---

## Action 6

### Retrieve Upcoming Live Sessions

Endpoint

GET /api/v1/student/live-sessions

---

### Business Rules

Returns only future sessions.

---

### Success Response

```json
{
  "success": true,
  "data": [
    {
      "sessionId": 15,
      "course": "React Bootcamp",
      "date": "2026-08-18",
      "time": "18:00",
      "meetingLink": "https://meet.google.com/abc-defg"
    }
  ]
}
```

---

## Action 7

### Retrieve Live Session Details

Endpoint

GET /api/v1/live-sessions/{sessionId}

---

### Returns

- Title
- Description
- Trainer
- Date
- Meeting URL
- Duration

---

## Action 8

### Join Live Session

Endpoint

POST /api/v1/live-sessions/{sessionId}/join

---

### Business Rules

- Student must be enrolled.
- Session must be active.
- Attendance is automatically recorded.

---

### Success Response

```json
{
  "success": true,
  "message": "Attendance recorded.",
  "data": {
    "meetingUrl": "https://meet.google.com/abc-defg"
  }
}
```

---

# QUIZZES

---

## Action 9

### Retrieve Quiz

Endpoint

GET /api/v1/quizzes/{quizId}

---

### Returns

- Questions
- Passing Score
- Time Limit
- Number of Attempts

---

### Success Response

```json
{
  "success": true,
  "data": {
    "quizId": 6,
    "title": "React Fundamentals",
    "duration": 20,
    "passingScore": 70,
    "attempts": 2,
    "questions": []
  }
}
```

---

## Action 10

### Submit Quiz

Endpoint

POST /api/v1/quizzes/{quizId}/submit

---

### Request Body

```json
{
  "answers": [
    {
      "questionId": 1,
      "answer": "B"
    },
    {
      "questionId": 2,
      "answer": "D"
    }
  ]
}
```

---

### Validation Rules

- All required questions answered.
- Quiz not expired.
- Student has remaining attempts.

---

### Business Rules

- Quiz becomes read-only.
- Score calculated automatically.
- Progress updated.
- Passing status stored.

---

### Success Response

```json
{
  "success": true,
  "message": "Quiz submitted successfully.",
  "data": {
    "score": 92,
    "passed": true
  }
}
```

---

### Error Responses

400 Bad Request

```json
{
  "success": false,
  "message": "Quiz already submitted."
}
```

403 Forbidden

```json
{
  "success": false,
  "message": "Maximum attempts reached."
}
```

---

# ASSIGNMENTS

---

## Action 11

### Retrieve Assignment

Endpoint

GET /api/v1/assignments/{assignmentId}

---

### Returns

- Instructions
- Deadline
- Maximum Marks
- Attachments

---

## Action 12

### Submit Assignment

Endpoint

POST /api/v1/assignments/{assignmentId}/submit

Authentication

Student

Content-Type

multipart/form-data

---

### Request

| Field | Type | Required |
|--------|------|----------|
| file | PDF / DOCX / ZIP | Yes |
| comment | String | No |

---

### Validation Rules

- Maximum Size: 50MB
- Allowed Formats: PDF, DOCX, ZIP
- Submission before deadline

---

### Business Rules

- Student may update submission until deadline.
- Previous submission is replaced.
- Submission timestamp recorded.

---

### Success Response

```json
{
  "success": true,
  "message": "Assignment submitted successfully."
}
```

---

### Error Response

```json
{
  "success": false,
  "message": "Submission deadline has passed."
}
```

---

# COURSE CERTIFICATES

---

## Action 13

### Generate Certificate

Endpoint

POST /api/v1/courses/{courseId}/certificate

---

### Business Rules

Certificate is generated only if:

- Progress = 100%
- All quizzes passed
- All required assignments submitted

---

### Success Response

```json
{
  "success": true,
  "message": "Certificate generated successfully.",
  "data": {
    "certificateId": 25,
    "downloadUrl": "/certificates/25.pdf"
  }
}
```
# ==========================================================
# TRAINER MODULE
# ==========================================================

Derived From

Feature 11
Feature 12
Feature 13
Feature 14

---

## Overview

The Trainer Module enables instructors to apply for trainer access,
create and manage courses, upload educational content,
monitor enrollments, review earnings, and analyze course performance.

Authentication

✅ Trainer Only
(Except Trainer Registration)

---

# TRAINER REGISTRATION

---

## Action 1

### Submit Trainer Application

Description

Allows a registered student to apply as a trainer.

### Endpoint

POST /api/v1/trainers/apply

Authentication

✅ Student

---

### Headers

```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

---

### Request Body

```json
{
    "linkedin":"https://linkedin.com/in/johnsmith",
    "experience":"8 Years",
    "specialization":"Web Development",
    "bio":"Senior Full Stack Developer",
    "cv":"resume.pdf"
}
```

---

### Validation Rules

| Field | Validation |
|--------|------------|
| linkedin | Required • Valid URL |
| experience | Required |
| specialization | Required |
| bio | Maximum 1000 Characters |
| cv | PDF Only |

---

### Business Rules

- Application status defaults to **Pending Verification**
- Trainer dashboard remains inaccessible until approved.
- Admin receives a notification immediately.

---

### Success Response

HTTP 201 Created

```json
{
    "success":true,
    "message":"Trainer application submitted successfully.",
    "data":{
        "status":"Pending Verification"
    }
}
```

---

### Error Responses

409 Conflict

```json
{
    "success":false,
    "message":"Application already exists."
}
```

---

# TRAINER DASHBOARD

---

## Action 2

### Retrieve Trainer Dashboard

Endpoint

GET /api/v1/trainer/dashboard

---

### Returns

- Total Courses
- Published Courses
- Draft Courses
- Active Students
- Revenue
- Notifications

---

### Success Response

```json
{
    "success":true,
    "data":{
        "publishedCourses":8,
        "draftCourses":2,
        "students":950,
        "earnings":12500,
        "notifications":5
    }
}
```

---

# COURSE MANAGEMENT

---

## Action 3

### Create Course

Endpoint

POST /api/v1/trainer/courses

Authentication

Trainer

---

### Request Body

```json
{
    "title":"Advanced React",
    "description":"Master React from beginner to advanced.",
    "category":"Web Development",
    "price":250,
    "language":"English",
    "recommendedPrerequisites":"JavaScript",
    "enrollmentLimit":100
}
```

---

### Validation Rules

| Field | Validation |
|--------|------------|
| title | Required |
| description | Required |
| category | Required |
| price | >= 0 |
| enrollmentLimit | Positive Integer |

---

### Business Rules

- New courses are saved as **Draft**.
- Course is invisible until approved by Admin.
- Trainer may edit draft freely.

---

### Success Response

```json
{
    "success":true,
    "message":"Course created successfully.",
    "data":{
        "courseId":31,
        "status":"Draft"
    }
}
```

---

## Action 4

### Update Course

Endpoint

PUT /api/v1/trainer/courses/{courseId}

---

### Editable Fields

- Title
- Description
- Price
- Category
- Enrollment Limit
- Prerequisites

---

### Business Rules

- Published courses require re-approval if major changes occur.
- Update history is recorded.

---

### Success Response

```json
{
    "success":true,
    "message":"Course updated successfully."
}
```

---

## Action 5

### Delete Course

Endpoint

DELETE /api/v1/trainer/courses/{courseId}

---

### Business Rules

- Only Draft courses can be permanently deleted.
- Published courses are archived instead.

---

### Success Response

```json
{
    "success":true,
    "message":"Course deleted successfully."
}
```

---

# MODULE MANAGEMENT

---

## Action 6

### Create Course Module

Endpoint

POST /api/v1/trainer/courses/{courseId}/modules

---

### Request Body

```json
{
    "title":"React Hooks",
    "description":"Understanding Hooks",
    "order":5
}
```

---

### Business Rules

- Module order must be unique.
- Module belongs to exactly one course.

---

## Action 7

### Update Module

Endpoint

PUT /api/v1/trainer/modules/{moduleId}

---

## Action 8

### Delete Module

Endpoint

DELETE /api/v1/trainer/modules/{moduleId}

---

# CONTENT UPLOAD

---

## Action 9

### Upload Video Lesson

Endpoint

POST /api/v1/trainer/modules/{moduleId}/videos

Authentication

Trainer

Content-Type

multipart/form-data

---

### Request

| Field | Type |
|--------|------|
| video | MP4 |
| title | String |
| duration | Integer |

---

### Validation Rules

Maximum File Size

2 GB

Allowed Formats

- MP4
- MOV
- WEBM

---

### Business Rules

- Upload progress displayed.
- Video transcoded automatically.
- Thumbnail generated automatically.

---

### Success Response

```json
{
    "success":true,
    "message":"Video uploaded successfully."
}
```

---

## Action 10

### Upload Learning Resource

Endpoint

POST /api/v1/trainer/modules/{moduleId}/resources

---

### Supported Formats

- PDF
- DOCX
- PPTX
- ZIP

---

### Business Rules

Resources become immediately available after publishing.

---

### Success Response

```json
{
    "success":true,
    "message":"Resource uploaded successfully."
}
```

---

# QUIZ MANAGEMENT

---

## Action 11

### Create Quiz

Endpoint

POST /api/v1/trainer/modules/{moduleId}/quiz

---

### Request Body

```json
{
    "title":"React Quiz",
    "passingScore":70,
    "duration":20
}
```

---

### Business Rules

- Passing score cannot exceed 100.
- Duration measured in minutes.

---

## Action 12

### Add Quiz Question

Endpoint

POST /api/v1/trainer/quizzes/{quizId}/questions

---

### Request Body

```json
{
    "question":"What is JSX?",
    "options":[
        "Option A",
        "Option B",
        "Option C",
        "Option D"
    ],
    "correctAnswer":"Option A"
}
```

---

# ANALYTICS

---

## Action 13

### Retrieve Trainer Analytics

Endpoint

GET /api/v1/trainer/analytics

---

### Returns

- Total Revenue
- Monthly Revenue
- Total Students
- Active Students
- Average Rating
- Total Reviews
- Completion Rate

---

### Success Response

```json
{
    "success":true,
    "data":{
        "revenue":18540,
        "monthlyRevenue":4200,
        "students":1342,
        "averageRating":4.9,
        "completionRate":87
    }
}
```

---

## Action 14

### Retrieve Trainer Reviews

Endpoint

GET /api/v1/trainer/reviews

---

### Business Rules

Reviews are ordered by newest first.

Average rating is calculated automatically.

---

### Success Response

```json
{
    "success":true,
    "data":[
        {
            "student":"Ahmed",
            "rating":5,
            "comment":"Excellent instructor."
        }
    ]
}
```
# ==========================================================
# COMPANY MODULE
# ==========================================================

Derived From

Feature 15
B2B Enterprise Workspace Intake

---

## Overview

The Company Module enables corporate partners to register organizations,
submit training requests, organize bootcamps and hackathons,
and manage company-exclusive learning programs.

Authentication

✅ Company Only
(Except Company Registration)

---

# COMPANY REGISTRATION

---

## Action 1

### Register Company

Description

Registers a new company account.

### Endpoint

POST /api/v1/company/register

Authentication

❌ Public

---

### Headers

```
Content-Type: application/json
```

---

### Request Body

```json
{
  "companyName": "ABC Technologies",
  "email": "hr@abc.com",
  "phone": "+966500000000",
  "industry": "Technology",
  "employees": 250,
  "website": "https://abc.com"
}
```

---

### Validation Rules

| Field | Validation |
|--------|------------|
| companyName | Required |
| email | Valid Email |
| phone | Required |
| industry | Required |
| employees | Positive Integer |

---

### Business Rules

- Company status = Pending Review
- Admin notification generated
- Company dashboard unavailable until approval

---

### Success Response

HTTP 201 Created

```json
{
  "success": true,
  "message": "Company registration submitted successfully.",
  "data": {
    "status": "Pending Review"
  }
}
```

---

# TRAINING REQUESTS

---

## Action 2

### Submit Bootcamp / Hackathon Request

Endpoint

POST /api/v1/company/requests

Authentication

✅ Company

---

### Request Body

```json
{
  "type": "Bootcamp",
  "title": "AI Bootcamp",
  "participants": 60,
  "preferredDate": "2026-08-25",
  "description": "Internal AI training program."
}
```

---

### Validation Rules

- type = Bootcamp | Hackathon
- participants > 0

---

### Business Rules

- Service ticket created.
- Status defaults to Pending Review.
- Assigned to Admin queue.

---

### Success Response

```json
{
  "success": true,
  "message": "Request submitted successfully.",
  "data": {
    "ticketId": 1052,
    "status": "Pending Review"
  }
}
```

---

## Action 3

### Retrieve Company Requests

Endpoint

GET /api/v1/company/requests

Authentication

✅ Company

---

### Returns

- Pending Requests
- Approved Requests
- Rejected Requests
- Completed Requests

---

### Success Response

```json
{
  "success": true,
  "data": [
    {
      "ticketId": 1052,
      "title": "AI Bootcamp",
      "status": "Pending Review"
    }
  ]
}
```

---

## Action 4

### Retrieve Company Courses

Endpoint

GET /api/v1/company/courses

Authentication

✅ Company

---

### Business Rules

Returns only company-exclusive courses.

Employees outside the organization cannot access these courses.

---

# ==========================================================
# ADMIN MODULE
# ==========================================================

Derived From

Feature 16

---

## Overview

The Admin Module provides platform-wide management capabilities,
including moderation, user management, course approval,
analytics, reports, and system monitoring.

Authentication

✅ Admin Only

---

# DASHBOARD

---

## Action 1

### Retrieve Admin Dashboard

Endpoint

GET /api/v1/admin/dashboard

---

### Returns

- Total Users
- Students
- Trainers
- Companies
- Courses
- Reports
- Revenue
- Pending Requests

---

### Success Response

```json
{
  "success": true,
  "data": {
    "users": 4250,
    "students": 3810,
    "trainers": 220,
    "companies": 45,
    "courses": 318,
    "reports": 9
  }
}
```

---

# TRAINER APPROVAL

---

## Action 2

### Retrieve Pending Trainer Applications

Endpoint

GET /api/v1/admin/trainers/pending

---

### Returns

All trainer applications awaiting approval.

---

## Action 3

### Approve Trainer

Endpoint

PATCH /api/v1/admin/trainers/{trainerId}/approve

---

### Business Rules

- Trainer role activated.
- Notification sent.
- Dashboard unlocked.

---

### Success Response

```json
{
  "success": true,
  "message": "Trainer approved successfully."
}
```

---

## Action 4

### Reject Trainer

Endpoint

PATCH /api/v1/admin/trainers/{trainerId}/reject

---

### Request Body

```json
{
  "reason": "Professional experience requirements not met."
}
```

---

### Business Rules

- Rejection reason required.
- Applicant receives notification.

---

# COMPANY APPROVAL

---

## Action 5

### Retrieve Pending Companies

Endpoint

GET /api/v1/admin/companies/pending

---

## Action 6

### Approve Company

Endpoint

PATCH /api/v1/admin/companies/{companyId}/approve

---

## Action 7

### Reject Company

Endpoint

PATCH /api/v1/admin/companies/{companyId}/reject

---

# COURSE MODERATION

---

## Action 8

### Retrieve Pending Courses

Endpoint

GET /api/v1/admin/courses/pending

---

### Returns

Draft courses awaiting publication.

---

## Action 9

### Publish Course

Endpoint

PATCH /api/v1/admin/courses/{courseId}/publish

---

### Business Rules

- Course status changes to Published.
- Course appears in public catalog.
- Trainer notified automatically.

---

### Success Response

```json
{
  "success": true,
  "message": "Course published successfully."
}
```

---

## Action 10

### Reject Course

Endpoint

PATCH /api/v1/admin/courses/{courseId}/reject

---

### Request Body

```json
{
  "comments": "Learning objectives need improvement."
}
```

---

### Business Rules

- Comments are mandatory.
- Trainer receives rejection feedback.

---

# USER MANAGEMENT

---

## Action 11

### Retrieve All Users

Endpoint

GET /api/v1/admin/users

---

## Action 12

### Suspend User

Endpoint

PATCH /api/v1/admin/users/{userId}/suspend

---

## Action 13

### Reactivate User

Endpoint

PATCH /api/v1/admin/users/{userId}/activate

---

# REPORTS

---

## Action 14

### Retrieve Reports

Endpoint

GET /api/v1/admin/reports

---

### Returns

- User Reports
- Course Reports
- Trainer Reports

---

# PLATFORM ANALYTICS

---

## Action 15

### Retrieve System Analytics

Endpoint

GET /api/v1/admin/statistics

---

### Success Response

```json
{
  "success": true,
  "data": {
    "activeUsers": 3920,
    "newUsersThisMonth": 430,
    "publishedCourses": 318,
    "pendingCourses": 21,
    "reportedContent": 6,
    "monthlyRevenue": 182000
  }
}
```
# ==========================================================
# NOTIFICATION MODULE
# ==========================================================

Derived From

Feature 17
System Notifications

---

## Overview

The Notification Module delivers real-time and in-app notifications to all authenticated users regarding important platform events such as approvals, course updates, live sessions, assignments, and support replies.

Authentication

✅ Authenticated Users

---

## Action 1

### Retrieve Notifications

Description

Returns all notifications for the authenticated user.

### Endpoint

GET /api/v1/notifications

Authentication

Required

---

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| page | Current page |
| limit | Number of notifications |
| unreadOnly | Return unread notifications only |

---

### Success Response

HTTP 200 OK

```json
{
  "success": true,
  "data": [
    {
      "notificationId": 55,
      "title": "Course Approved",
      "message": "Your course has been published successfully.",
      "type": "Course",
      "isRead": false,
      "createdAt": "2026-07-04T15:22:00Z"
    }
  ]
}
```

---

## Action 2

### Mark Notification as Read

Endpoint

PATCH /api/v1/notifications/{notificationId}

---

Business Rules

- Updates notification status.
- Read notifications remain in history.

---

Success

```json
{
  "success": true,
  "message": "Notification marked as read."
}
```

---

## Action 3

### Delete Notification

Endpoint

DELETE /api/v1/notifications/{notificationId}

---

Business Rules

Notification is permanently removed from the user's account.

---

Success

```json
{
  "success": true,
  "message": "Notification deleted successfully."
}
```

---

# ==========================================================
# AI CHATBOT MODULE
# ==========================================================

Derived From

Feature 10

---

## Action 1

### Send Message

Endpoint

POST /api/v1/chatbot/message

Authentication

Student

---

Request Body

```json
{
  "message": "How do I enroll in a course?"
}
```

---

Business Rules

- Stores conversation history.
- Generates AI response.
- Response time should not exceed 5 seconds.

---

Success

```json
{
  "success": true,
  "data": {
    "reply": "To enroll in a free course, click 'Enroll'. Paid courses must be purchased first."
  }
}
```

---

# ==========================================================
# SUPPORT MODULE
# ==========================================================

Derived From

Feature 10

---

## Action 1

### Create Support Ticket

Endpoint

POST /api/v1/support

Authentication

Authenticated User

---

Request Body

```json
{
  "subject": "Payment Problem",
  "message": "Payment completed but course is still locked."
}
```

---

Business Rules

- Every ticket receives a unique Ticket ID.
- Initial status = Open.
- Admin receives notification.

---

Success

```json
{
  "success": true,
  "data": {
    "ticketId": 842,
    "status": "Open"
  }
}
```

---

## Action 2

### Retrieve Support Tickets

Endpoint

GET /api/v1/support

Returns all tickets belonging to the authenticated user.

---

## Action 3

### Reply to Support Ticket

Endpoint

POST /api/v1/support/{ticketId}/reply

---

# ==========================================================
# GLOBAL ERROR MODEL
# ==========================================================

Every API returns errors using the following structure:

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": [
    {
      "field": "email",
      "message": "Email already exists."
    }
  ]
}
```

---

## Common Error Codes

| HTTP Code | Description |
|-----------|-------------|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Resource Not Found |
| 409 | Conflict |
| 422 | Validation Error |
| 429 | Too Many Requests |
| 500 | Internal Server Error |

---

# ==========================================================
# AUTHORIZATION MATRIX
# ==========================================================

| Endpoint | Guest | Student | Trainer | Company | Admin |
|-----------|:----:|:------:|:-------:|:-------:|:-----:|
| Browse Courses | ✅ | ✅ | ✅ | ✅ | ✅ |
| Register | ✅ | ❌ | ❌ | ❌ | ❌ |
| Login | ✅ | ❌ | ❌ | ❌ | ❌ |
| Purchase Course | ❌ | ✅ | ❌ | ❌ | ❌ |
| Submit Assignment | ❌ | ✅ | ❌ | ❌ | ❌ |
| Submit Review | ❌ | ✅ | ❌ | ❌ | ❌ |
| Create Course | ❌ | ❌ | ✅ | ❌ | ❌ |
| Upload Content | ❌ | ❌ | ✅ | ❌ | ❌ |
| View Analytics | ❌ | ❌ | ✅ | ❌ | ✅ |
| Company Requests | ❌ | ❌ | ❌ | ✅ | ❌ |
| Approve Trainers | ❌ | ❌ | ❌ | ❌ | ✅ |
| Publish Courses | ❌ | ❌ | ❌ | ❌ | ✅ |

---

# ==========================================================
# API SECURITY
# ==========================================================

Authentication

- JWT Bearer Authentication

Authorization

- Role-Based Access Control (RBAC)

Password Storage

- bcrypt password hashing

Transport Security

- HTTPS required in production

Rate Limiting

| Endpoint Type | Limit |
|---------------|-------|
| Authentication | 5 requests/minute/IP |
| Public APIs | 100 requests/minute/IP |
| Authenticated APIs | 300 requests/minute/User |

CORS

- Allowed origins configured by administrator.

Audit Logs

- Login attempts
- Course publishing
- Trainer approvals
- Company approvals
- User suspension
- Payment transactions

---

# ==========================================================
# API VERSIONING
# ==========================================================

Current Version

```
/api/v1
```

Future versions

```
/api/v2
```

Backward compatibility should be maintained whenever possible.

---

# ==========================================================
# REST API DESIGN STANDARDS
# ==========================================================

HTTP Methods

| Method | Purpose |
|---------|---------|
| GET | Retrieve Data |
| POST | Create Resource |
| PUT | Replace Resource |
| PATCH | Partial Update |
| DELETE | Delete Resource |

Resource Naming

✅ /courses

✅ /students

✅ /trainers

✅ /notifications

❌ /getCourse

❌ /deleteCourse

Use plural nouns for all resources.

---

# ==========================================================
# API CONVENTIONS
# ==========================================================

Pagination

```
?page=1&limit=10
```

Filtering

```
?category=AI
```

Searching

```
?search=React
```

Sorting

```
?sort=rating
```

---

# ==========================================================
# FUTURE API ENHANCEMENTS
# ==========================================================

The following features are planned for future releases:

- OAuth2 Authentication
- Two-Factor Authentication (2FA)
- WebSocket Notifications
- Payment Gateway Integration (Mada, Apple Pay, Visa)
- Video Streaming CDN
- Recommendation Engine
- AI Course Recommendations
- Mobile Push Notifications
- Multi-language API Support

---

# END OF API CONTRACT
