**USER STORIES**  
**week 1**

**group c:**  
**ريم حسن ابو عزيز**  
**علي واصف آل طالب**  
**محمد أحمد القفاص**  
**لانا درع القحطاني**  
**یمنی حسین ابوذيب**

\============================================================================================

**User Roles Defined:**  
**Guest / Visitor:** Unauthenticated user exploring public-facing courses, reviews, and profiles.  
**Student:** Authenticated learner managing enrollment, purchasing, tracking progress, and attending lessons.  
**Trainer:** Subject matter expert responsible for content generation, curriculum building, and tracking earnings/enrollment.  
**Company:** Corporate partner requesting employee upskilling, bootcamps, and trackable hackathons.  
**Admin:** Platform superintendent handling moderation, global accounts, safety reports, and performance analytics.  
\============================================================================================

**Feature 1: Platform Vision & Ecosystem Overview (Guest)**  
User Story:  
As a Guest,  
I want to view a dedicated portal overview explaining how Capsule Tahawul connects learners, experts, and organizations through bootcamps, courses, hackathons, and corporate training,  
So that I can immediately understand how the platform fits my needs whether I am a prospective student, a subject matter expert, or a corporate representative.

Acceptance Criteria 1:  
GIVEN a Guest lands on the public homepage or "About Us" section  
WHEN the page assets load  
THEN they see clear, dedicated value-proposition pathways highlighting distinct programmatic offerings for Students (free/paid courses, career bridge), Trainers (monetization, curriculum studio), and Companies (tailored employee training, custom hackathons, and bootcamps).

Acceptance Criteria 2:  
GIVEN a Guest clicks on a corporate or instructor informational call-to-action button  
WHEN the navigation completes  
THEN they are routed to a targeted onboarding landing view that highlights specific platform benefits, operational expectations, and the required administrative validation workflow before account activation.

**Feature 2: Public Course Catalog Exploration (Guest)**  
User Story:  
As a Guest,  
I want to browse available courses and search or filter them by category,  
So that I can easily find subjects that match my learning goals before committing to registration.

Acceptance Criteria 1:  
GIVEN a Guest navigates to the public home or course library directory  
WHEN the page loads  
THEN they see an organized grid of all courses with visible categories, pricing, and card layouts.

Acceptance Criteria 2:  
GIVEN a Guest selects a specific structural category filter (e.g., "Web Development")  
WHEN the system processes the request  
THEN the grid instantly updates to render only the matching courses.

**Feature 3: Onboarding & Secure Authentication (Guest)**  
User Story:  
As a Guest,  
I want to create a new account and log in securely,  
So that I can access my personalized dashboard and student permissions.

Acceptance Criteria 1:  
GIVEN a Guest completes the registration form with a valid email and matching passwords  
WHEN they click the "Register" submit button  
THEN their new Student record is created, and an account creation message confirms success.

Acceptance Criteria 2:  
GIVEN a registered user inputs correct credentials on the Login page  
WHEN they press the "Login" button  
THEN they are safely authenticated and redirected to their protected dashboard environment.

**Feature 4: Course Acquisition & Checkout Workflow (Student)**  
User Story:  
As a Student,  
I want to add multiple courses to my cart, enroll in free courses, and purchase paid entries using secure payment steps,  
So that I can seamlessly register for my desired catalog items.

Acceptance Criteria 1:  
GIVEN a Student clicks "Enroll Now" on an item with a price tag  
WHEN the button action registers  
THEN they bypass checkout queues and find the course immediately listed on their dashboard.

Acceptance Criteria 2:  
GIVEN a Student clicks "Purchase" inside their compiled shopping cart interface  
WHEN the payment fields validate successfully through the interface  
THEN an explicit confirmation is displayed on-screen, a notification copy is dispatched to their email, and the items unlock.

**Feature 5: Comprehensive Trainer Profiles (Guest / Student)**  
User Story:  
As a Platform Visitor,  
I want to view detailed instructor profiles containing a bio, experience metrics, their LinkedIn account link, and their entire course catalog,  
So that I can easily check their professional credentials and past reviews before enrolling.

Acceptance Criteria 1:  
GIVEN a user navigates to a public Instructor Profile page  
WHEN the page mounts completely  
THEN it displays the instructor's personal summary bio, structured text experience fields, a working LinkedIn external hyperlink, and a dynamic grid of all their published courses.

Acceptance Criteria 2:  
GIVEN an instructor has received student evaluations across multiple classes  
WHEN a user scrolls to the bottom of that instructor's profile page  
THEN they see an aggregated collection of all historical student ratings and comments left for that specific trainer.

**Feature 6: Academic Tracking & Dashboard Profile (Student)**  
User Story:  
As a Student,  
I want to manage my profile and visually track my overall learning metrics across purchased courses,  
So that I can keep my information accurate and observe how close I am to course completion.

Acceptance Criteria 1:  
GIVEN a Student edits their profile name or avatar  
WHEN they click "Save Changes"  
THEN the updated parameters are permanently saved and instantly reflected across the site.

Acceptance Criteria 2:  
GIVEN a Student visits their primary user dashboard  
WHEN they view active course cards  
THEN a progress percentage indicator displays how far through the modules they are.

**Feature 7: Asynchronous Learning & Resources (Student)**  
User Story:  
As a Student,  
I want to watch recorded lessons and download linked course resource attachments anytime,  
So that I can progress through study materials at a pace fitting my personal routine.

Acceptance Criteria 1:  
GIVEN a Student opens an active module video segment  
WHEN they select the play option on the media window  
THEN the recorded video streams and plays without blocking interface functions.

Acceptance Criteria 2:  
GIVEN a module contains attached lesson guides or spreadsheets  
WHEN the Student clicks on the listed file attachment resource icon  
THEN a prompt safely initiates a download of the target document file to their computer.

**Feature 8: Synchronous Live Sessions (Student)**  
User Story:  
As a Student,  
I want to view upcoming synchronous live lectures and receive joining links via email,  
So that I can interact with my cohorts and instructor in real time.

Acceptance Criteria 1:  
GIVEN an instructor schedules an upcoming live seminar module block  
WHEN the class schedule updates inside the active course timeline  
THEN a join link highlights on the student's dashboard schedule view.

Acceptance Criteria 2:  
GIVEN a live session link is distributed to course members  
WHEN an automated sync notification is sent  
THEN an email containing the target event join link arrives safely in the student's primary inbox.

**Feature 9: Knowledge Testing & Evaluations (Student)**  
User Story:  
As a Student,  
I want to take online quizzes, submit structured assignments, and earn certificates upon module completion,  
So that I can test my understanding and prove my technical proficiencies.

Acceptance Criteria 1:  
GIVEN a Student fills out all responses inside an interactive module quiz  
WHEN they click the "Submit Quiz" action trigger  
THEN their answers lock, and their current score instantly tallies on the summary window.

Acceptance Criteria 2:  
GIVEN a Student passes all requirements for a specific course curriculum  
WHEN the progress value updates to 100%  
THEN an official digital certification of achievement automatically generates and unlocks for download.

**Feature 10: Platform Communication (Student)**  
User Story:  
As a Student,  
I want to drop reviews for courses/trainers, contact customer support, and interface with an AI chatbot helper,  
So that I can give feedback and resolve any questions instantly.

Acceptance Criteria 1:  
GIVEN a Student completes a course and fills out the text review criteria form  
WHEN they submit their feedback rating  
THEN the system logs the entry and links it openly to the public review queue for that course.

Acceptance Criteria 2:  
GIVEN a Student opens the built-in conversational AI assistant window  
WHEN they type an inquiry and click send  
THEN the assistant returns an automated, contextually smart answer bubble to guide them.

**Feature 11: Instructor Onboarding & Review (Trainer)**  
User Story:  
As a Trainer,  
I want to submit a professional registration request to be audited and approved by system admins,  
So that I can gain access to workspace creator privileges on the portal.

Acceptance Criteria 1:  
GIVEN an aspiring Trainer fills out the credentials intake application form  
WHEN they choose the submit option  
THEN their status changes to "Pending Verification" and routes to an administrative approval backlog.

Acceptance Criteria 2:  
GIVEN an Admin updates the profile flag status to approved  
WHEN the Trainer authenticates into their platform environment next  
THEN they find the specialized Instructor Studio workspace features fully unlocked.

**Feature 12: Course Development & Configuration (Trainer)**  
User Story:  
As a Trainer,  
I want to create courses, outline Recommended prerequisites, price options, cap student enrollment totals, and build quiz frameworks,  
So that I can design highly structured learning content.

Acceptance Criteria 1:  
GIVEN a Trainer sets dynamic rules like "Recommended prerequisites: Basic Python" and "Enrollment Limit: 50"  
WHEN they save the parameters configuration card  
THEN the course rules save successfully to that specific course index.

Acceptance Criteria 2:  
GIVEN a Trainer edits an existing module draft to insert a new media component block  
WHEN they submit updates through the dashboard editor  
THEN the changes save securely and the course status reflects the modifications.

**Feature 13: Content Upload Workspace (Trainer)**  
User Story:  
As a Trainer,  
I want to upload instructional video lessons and text-based reference resources,  
So that my students have all the reference materials they need to complete their studies.

Acceptance Criteria 1:  
GIVEN a Trainer selects a locally stored mp4 video file on their device  
WHEN they drag and drop the item into the module media manager field  
THEN a loader tracks the server asset storage upload, showing a complete confirmation when done.

Acceptance Criteria 2:  
GIVEN a Trainer attaches supplemental presentation files to an assignment block  
WHEN they commit the changes to live viewing  
THEN the assets append clearly below the lesson outline interface.

**Feature 14: Revenue & Engagement Analytics (Trainer)**  
User Story:  
As a Trainer,  
I want to monitor ongoing enrollment trajectories, inspect payout totals, and read text reviews written by students,  
So that I can analyze my overall classroom engagement performance and revenue trends.

Acceptance Criteria 1:  
GIVEN a Trainer visits their specialized Analytics tracking dashboard interface  
WHEN new transaction records trigger on the system  
THEN a numerical graph display details real-time modifications in active student counts and overall payout trends.

Acceptance Criteria 2:  
GIVEN a Trainer opens their reviews log index window  
WHEN student submissions exist for their active catalog  
THEN they can read every text rating written about them or their courses, sorted dynamically by timeline metrics.

**Feature 15: B2B Enterprise Workspace Intake (Company)**  
User Story:  
As a Corporate Partner,  
I want to sign up my organization, submit custom training requests, and arrange bootcamps or hackathons while tracking request tickets,  
So that I can orchestrate continuous structured education for my workforce.

Acceptance Criteria 1:  
GIVEN a Company manager fills out a custom structured "Request a Hackathon/Bootcamp" service sheet form  
WHEN they complete submission parameters  
THEN an organization-bound service ticket is generated inside their tracker portal marked as "Pending Review".

Acceptance Criteria 2:  
GIVEN a Company manager provisions an internal training module dedicated only to their staff  
WHEN a student who is officially affiliated with that company logs into their account  
THEN they can view and access these company-exclusive courses, while standard platform students cannot see them in the public catalog.

**Feature 16: Global Administration Operations Dashboard (Admin)**  
User Story:  
As an Admin,  
I want to moderate users, handle accounts, accept/reject course drafts, handle reports, and track system stats,  
So that I can ensure proper content quality control and keep the entire ecosystem operating safely.

Acceptance Criteria 1:  
GIVEN an Admin opens a draft course currently awaiting review  
WHEN they select either the "Publish" or "Reject with comments" action options  
THEN the item's live index status flag switches instantly, sending an automatic system notice to the organizing Trainer's screen.

Acceptance Criteria 2:  
GIVEN an Admin views the central system diagnostics statistics console  
WHEN the core analytical components compile successfully  
THEN they see charts displaying active user logs, user report flags, and general resource distribution details across the platform.

**Feature 17: System Notifications (All Users)**  
User Story:  
As a Platform User,  
I want to receive immediate in-app system notifications for critical account updates,  
So that I stay informed about account approvals, live stream schedules, or new support replies.

Acceptance Criteria 1:  
GIVEN an Admin officially approves a pending Trainer's or Company's onboarding application account flag  
WHEN that specific Trainer or Company logs in next  
THEN a real-time notification badge pops up on their dashboard navigation bar indicating successful account verification.

Acceptance Criteria 2:  
GIVEN a student is actively browsing the platform  
WHEN an instructor posts a new assignment or starts a live broadcast link  
THEN a banner notification drops down instantly onto their active window view workspace.  
\============================================================================================

**Out of Scope:**  
The following components are explicitly out of scope for Weeks 1-2 of this frontend product sprint and are simulated entirely using a front-end Mock-First Development workflow:  
**Real Backend Infrastructure:** There is no active persistent database or live API server engine connected to the layout. Data displaying on the frontend relies entirely on asynchronous Promises and simulated network delays using setTimeout inside a dedicated mock data layer file to mimic network latency.  
**Production Authentication Engine:** User registration, login states, and account validation rules do not use server-side security encryption protocols, route protection, or JWT tokens. Routes are configured without real protection, assuming the authenticated role is always active for the current workspace view, with true access control scheduled for implementation in later weeks.  
**Live Payment Gateways:** Transaction flows for Mada, Apple Pay, and Moyasar are simulated mock interfaces built using fake credit card validation states. They track mock status properties inside the front-end state architecture without communicating with actual banking infrastructure or live merchant accounts.
