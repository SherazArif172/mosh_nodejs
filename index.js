const express = require("express");
const Joi = require("joi");
const app = express();
const courses = require("./routes/courses");
const home = require("./routes/home");
app.use(express.json());
const middleware = require("./middleware/looger");
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "husnain",
    author: "ali hamza",
    tags: ["ali", "bilal"],
    isPublished: true,
  });

  // const result = await course.save();
  // console.log(result);
}

createCourse();

async function getCourses() {
  const course = await Course.find({ name: "husnain", isPublished: true })
    .limit(10)
    .sort({ name: -1 })
    .select({ name: 1, tags: 1 });
  console.log(course);
}

getCourses();

mongoose
  .connect("mongodb://localhost:27017/playground")
  .then(() => {
    console.log("connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("api/courses", courses);
app.use("/", home);

// envirnment variables
if (app.get("env") === "development") {
  // app.use(morgan("tiny"));
  console.log("env");
}
// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//port
const port = process.env.PORT || 3000;

//listen
app.listen(port, () => {
  console.log(`it is listenig on ${port}`);
});
