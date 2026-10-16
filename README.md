# NUL Student Management System

This is my DIWA2110 assignment for the National University of Lesotho. It is a small
React app I built to manage student records. You can look at all the students, add a
new one, edit an existing one, or delete one, and the list on the screen updates right
after each action without needing to refresh the page.

I wrote the background, the design decisions and the full write-up in `REPORT.md`.
This file is just a short guide to the project.

## Features

- A table that shows every student: student ID, full name, age, email, course and enrollment status
- Three cards at the top showing the total number of students, how many are enrolled and how many are not
- Add Student button that opens a modal with the form
- Edit button on each row that opens the same form, filled in with that student's details
- Delete button that opens a confirmation modal first, so nothing is removed by mistake
- A search box that filters by ID, name, email or course as you type
- Form validation with messages for missing fields, a bad email and an age that is out of range
- Records saved in the browser's localStorage, so they are still there after a refresh
- Dark theme that works on desktop and on phone screens

The four sample students are Relebohile Makoa, Reabetsoe Pelesa, Tebello Mabeleng and
Lerato Shale. The courses you can pick from are Economics, Computer Science, General
Nursing and BSc General.

## Running the project

You need Node.js installed. Then in this folder:

```
npm install
npm run dev
```

Vite will print a local address, usually `http://localhost:5173`. If that port is
already in use it will pick the next free one, like `http://localhost:5174`, and print
that instead, so just open whatever address it shows.

To make a production build:

```
npm run build
```

That creates a `dist` folder. You can preview it with `npm run preview`. There is also
`npm run lint`, which runs Oxlint over the source.

## Folder layout

```
index.html                 the page Vite loads
package.json               the scripts and dependencies
vite.config.js             Vite setup
public/favicon.svg         the small icon in the browser tab
src/
  App.jsx                  main component with the state and the add/edit/delete logic
  main.jsx                 renders App into the page
  index.css                all the styling for the whole app
  components/
    Dashboard.jsx          the three summary cards
    StudentTable.jsx       the table of students and the empty state message
    StudentModal.jsx       the form used for adding and editing
    DeleteModal.jsx        the confirmation box for deleting
  utils/
    studentHelpers.js      validation, filtering, storage and the other functions
```

## What I used

React 19 with Vite, plain JavaScript and plain CSS. I did not add a CSS framework
because I wanted to write and understand the styles myself. The only other thing used
is localStorage for saving the data.

## A few notes on the JavaScript

- A student is an object and the whole list is an array. The fields use different
  types on purpose: `studentId`, `fullName`, `email` and `course` are strings, `age`
  is a number and `enrolled` is a boolean.
- Form inputs always give strings, so the age is converted with `Number()` and the
  enrollment value with `Boolean()` before a record is saved.
- I used `const` for values that never change, like the storage key and the course
  list, and `let` for the one counter that changes when a new ID is created.
- `var` is used only in `generateStudentId()` in `studentHelpers.js`, kept there to
  show how it works. Everything else uses `const` and `let`.
- The add, edit and delete logic sits in reusable functions in `studentHelpers.js`.
  The list is updated with `map` and `filter`, which return new arrays so React
  re-renders the table immediately.

## Testing

I checked the app by hand and everything below passed:

| Test | What I did | What happened |
|---|---|---|
| Show records | Opened the app | The four students showed up and the cards had the right numbers |
| Add student | Filled the form and saved | The new student appeared in the table straight away |
| Empty form | Tried to save a blank form | Messages appeared asking for the missing fields |
| Bad email | Typed an email without a domain | Got the "Please enter a valid email address." message |
| Bad age | Typed 12 and then 500 | Got the age range message both times |
| Same ID twice | Added a student with an ID that already existed | Got the "This student ID already exists." message |
| Edit student | Changed a course in the edit form and saved | The row updated with the new course |
| Cancel | Opened the modal and pressed Cancel and Escape | The modal closed and nothing changed |
| Delete | Clicked delete and confirmed | The row was removed and the cards updated |
| Cancel delete | Clicked delete and then Cancel | The student stayed in the list |
| Search | Typed a name and then a course | The table filtered and the count changed |
| No results | Searched for something that is not there | The "No students found" message appeared |
| Refresh | Added a student and reloaded the page | The student was still there |
| Small screen | Made the browser window narrow | The cards stacked and the table scrolled sideways |

I also ran `npm run lint` and `npm run build` at the end and both finished without errors.

## Live version

- GitHub repo: (add the repository link here)
- Deployed app: (add the Netlify or Vercel link here)

## Author

Relebohile Makoa
Diploma in Information Technology, Faculty of Information and Communication Technology
National University of Lesotho
