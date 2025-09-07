const express = require("express");
const db = require("./db");
const router = express.Router();

// Create Event
router.post("/events", (req, res) => {
  const { event_name, event_description, event_date, location, college_id } = req.body;
  db.run(
    "INSERT INTO Events (event_name, event_description, event_date, location, college_id) VALUES (?, ?, ?, ?, ?)",
    [event_name, event_description, event_date, location, college_id],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ event_id: this.lastID });
    }
  );
});

// Register Student
router.post("/events/:id/register", (req, res) => {
  const { student_id } = req.body;
  db.run(
    "INSERT INTO Registrations (student_id, event_id) VALUES (?, ?)",
    [student_id, req.params.id],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ message: "Student registered" });
    }
  );
});

// Mark Attendance
router.post("/events/:id/attendance", (req, res) => {
  const { student_id } = req.body;
  db.run(
    "UPDATE Registrations SET attended = 1 WHERE student_id = ? AND event_id = ?",
    [student_id, req.params.id],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ message: "Attendance marked" });
    }
  );
});

// Submit Feedback
router.post("/events/:id/feedback", (req, res) => {
  const { student_id, rating } = req.body;
  db.run(
    "UPDATE Registrations SET feedback_rating = ? WHERE student_id = ? AND event_id = ?",
    [rating, student_id, req.params.id],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ message: "Feedback submitted" });
    }
  );
});

// Reports: Event Popularity
router.get("/reports/events", (req, res) => {
  db.all(
    `SELECT e.event_name, COUNT(r.student_id) AS total_registrations
     FROM Events e
     LEFT JOIN Registrations r ON e.event_id = r.event_id
     GROUP BY e.event_id
     ORDER BY total_registrations DESC`,
    [],
    (err, rows) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json(rows);
    }
  );
});

// Reports: Student Participation
router.get("/reports/students", (req, res) => {
  db.all(
    `SELECT s.first_name || ' ' || s.last_name AS student_name, COUNT(r.event_id) AS attended_events
     FROM Students s
     LEFT JOIN Registrations r ON s.student_id = r.student_id
     WHERE r.attended = 1
     GROUP BY s.student_id`,
    [],
    (err, rows) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json(rows);
    }
  );
});

// Reports: Top 3 Most Active Students
router.get("/reports/top3", (req, res) => {
  db.all(
    `SELECT s.first_name || ' ' || s.last_name AS student_name, COUNT(r.event_id) AS attended_events
     FROM Students s
     JOIN Registrations r ON s.student_id = r.student_id
     WHERE r.attended = 1
     GROUP BY s.student_id
     ORDER BY attended_events DESC
     LIMIT 3`,
    [],
    (err, rows) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json(rows);
    }
  );
});

module.exports = router;
