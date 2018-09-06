const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("mongodb connected..."))
  .catch(error => console.error("Could not connect mongodb", error));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
    // match : /pathern/
  },
  category: {
    type: String,
    required: true,
    enum: ["mobile", "web", "network"]
  },
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Boolean,
    required: function() {
      return this.isPublished;
    },
    min: 10,
    max: 50
  }
});
const Course = mongoose.model("Course", courseSchema);

async function createCourses() {
  const course = new Course({
    name: "Angular course",
    category: "-",
    author: "mosh",
    tags: ["Angular", "frontend"],
    isPublished: true,
    price: 15
  });

  try {
    // manual validation
    // await course.validate()
    // course.validate(err => {
    //   if (!err) {
    //   }
    // });

    const result = await course.save();
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
}

async function getCourses() {
  const pageNumber = 2;
  const pageSize = 10;
  //  /api/courses/pageNumber=2&pageSize=10
  const courses = await Course.find({ author: "mosh", isPublished: true })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 })
    .count();
  console.log(courses);
}

async function updateCourse(id) {
  const course = await Course.findById(id);
  if (!course) return;
  course.isPublished = true;
  course.author = "another name";

  const result = await course.save();
  console.log(result);
}

async function updateCourse1(id) {
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: { author: "mosh", isPublished: false }
    },
    { new: true }
  );

  console.log(course);
}

async function deleteCourse(id) {
  const result = await Course.deleteOne({ _id: id });
  const course = await Course.findOneAndRemove(id);
  console.log(course);
}

createCourses();
//getCourses();
//updateCourse1("5b729a1ca2ce241c70a33d3b");
//deleteCourse("5b729a1ca2ce241c70a33d3b");
//.find({ price: { $gt: 10, $lte: 20 } })
//.find({ price: { $in: [10, 15, 20] } })
// .find()
// .or([{ author: "mosh" }, { isPublished: true }])
// .and([{ author: "mosh" }, { isPublished: false }])
// starts with
// .find({ author: /^mosh/ })
// // ends with
// // for not case sensitive add i
// .find({ author: /hamedani$/i })
// // Contains mosh
// .find({ author: /.*mosh.*/i })
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
// approach: query first
// findById()
// modify its properties
// save()
// approach: update first
// update directly
// optionally: get the update documents
// another approach to update a document
// course.set({
//   isPublished: true,
//   author: "another name"
// });
// const result = await Course.update(
//   { _id: id },
//   { $set: { author: "michael", isPublished: true } }
// );
