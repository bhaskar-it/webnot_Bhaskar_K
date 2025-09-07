const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db.sqlite");

// Initialize tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS Colleges (
    college_id INTEGER PRIMARY KEY AUTOINCREMENT,
    college_name TEXT NOT NULL UNIQUE
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS Students (
    student_id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    college_id INTEGER NOT NULL,
    FOREIGN KEY (college_id) REFERENCES Colleges(college_id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS Events (
    event_id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_name TEXT NOT NULL,
    event_description TEXT,
    event_date TEXT NOT NULL,
    location TEXT NOT NULL,
    college_id INTEGER NOT NULL,
    FOREIGN KEY (college_id) REFERENCES Colleges(college_id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS Registrations (
    student_id INTEGER NOT NULL,
    event_id INTEGER NOT NULL,
    registration_date TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    attended INTEGER NOT NULL DEFAULT 0,
    feedback_rating INTEGER CHECK(feedback_rating BETWEEN 1 AND 5),
    PRIMARY KEY (student_id, event_id),
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (event_id) REFERENCES Events(event_id)
  )`);
});

module.exports = db;
