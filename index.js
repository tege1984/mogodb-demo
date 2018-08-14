const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("mongodb connected..."))
  .catch(error => console.error("Could not connect mongodb", error));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});
const Course = mongoose.model("Course", courseSchema);

async function createCourses() {
  const course = new Course({
    name: "Angular course",
    author: "mosh",
    tags: ["Angular", "frontend"],
    isPublished: true
  });

  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  // eq (equal)
  // ne (not equal)
  // gt (greater than)
  // gte (greater than or equal to)
  // lt (less than)
  // lte (less than or equla to)
  // in
  // nin (not in)

  const courses = await Course.find({ author: "mosh", isPublished: true })
    .limit(2)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

getCourses();

//.find({ price: { $gt: 10, $lte: 20 } })
//.find({ price: { $in: [10, 15, 20] } })
