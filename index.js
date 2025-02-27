const express = require("express");
const Joi = require("joi");
const app = express();
app.use(express.json());

// all courses
const courses = [
  { id: 1, name: "ali" },
  { id: 2, name: "hassan" },
  { id: 3, name: "sheraz" },
  { id: 4, name: "ahmed" },
];

// get request all
app.get("/api/courses", (req, res) => {
  res.send(courses);
});

// get request single id
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("not found");
  res.send(course);
});

// post request
app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(courses);
});

// put request
app.put("/api/courses/:id", (req, res) => {
  try {
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("Not Found");

    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

//delete request
app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("not fond");

  const index = courses.indexOf();
  courses.splice(index, 1);

  res.send(course);
});

// validate
const validateCourse = (course) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
};

//port
const port = process.env.PORT || 3000;

//listen
app.listen(port, () => {
  console.log(`it is listenig on ${port}`);
});
