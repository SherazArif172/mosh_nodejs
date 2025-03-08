const express = require("express");
const router = express.Router();

// all courses
const courses = [
  { id: 1, name: "ali" },
  { id: 2, name: "hassan" },
  { id: 3, name: "sheraz" },
  { id: 4, name: "ahmed" },
];

// get request all
router.get("/", (req, res) => {
  res.send(courses);
  // res.render("index", { title: "express js", heading: "heading" });
});

// get request single id
router.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("not found");
  res.send(course);
});

// post request
router.post("/", (req, res) => {
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
router.put("/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
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

module.exports = router;
