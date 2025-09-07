CREATE TABLE Colleges (
  college_id INTEGER PRIMARY KEY AUTOINCREMENT,
  college_name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE Students (
  student_id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  college_id INTEGER NOT NULL,
  FOREIGN KEY (college_id) REFERENCES Colleges(college_id)
);

CREATE TABLE Events (
  event_id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_name VARCHAR(255) NOT NULL,
  event_description TEXT,
  event_date DATETIME NOT NULL,
  location VARCHAR(255) NOT NULL,
  college_id INTEGER NOT NULL,
  FOREIGN KEY (college_id) REFERENCES Colleges(college_id)
);

CREATE TABLE Registrations (
  student_id INTEGER NOT NULL,
  event_id INTEGER NOT NULL,
  registration_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  attended BOOLEAN NOT NULL DEFAULT 0,
  feedback_rating INTEGER CHECK(feedback_rating BETWEEN 1 AND 5),
  PRIMARY KEY (student_id, event_id),
  FOREIGN KEY (student_id) REFERENCES Students(student_id),
  FOREIGN KEY (event_id) REFERENCES Events(event_id)
);
