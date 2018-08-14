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
  // comparision operators
  // eq (equal)
  // ne (not equal)
  // gt (greater than)
  // gte (greater than or equal to)
  // lt (less than)
  // lte (less than or equla to)
  // in
  // nin (not in)

  // logical operators
  // or
  // and

  const courses = await Course
    //.find({ author: "mosh", isPublished: true })

    // starts with
    .find({ author: /^mosh/ })

    // ends with
    // for not case sensitive add i
    .find({ author: /hamedani$/i })

    // Contains mosh
    .find({ author: /.*mosh.* / })

    .limit(2)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

getCourses();

//.find({ price: { $gt: 10, $lte: 20 } })
//.find({ price: { $in: [10, 15, 20] } })
// .find()
// .or([{ author: "mosh" }, { isPublished: true }])
// .and([{ author: "mosh" }, { isPublished: false }])
