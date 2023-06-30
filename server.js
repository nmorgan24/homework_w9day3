require("dotenv").config(); 
const express = require("express"); 
const morgan = require("morgan"); 
const methodOverride = require("method-override"); 
const Animal = require("./models/animals");

const app = express(); 

app.use(morgan("dev")); 
app.use(express.urlencoded({ extended: false })); 
app.use(methodOverride("_method")); 

app.get("/", (req, res) => {
  res.send("hello world"); 
});

app.get("/animals", async (req, res) => {
  const allAnimals = await Animal.find({});
  console.log(allAnimals); 
  res.render("index.ejs", { animals: allAnimals }); 
});

app.get("/animals/new", (req, res) => {
  res.render("new.ejs"); 
});

app.post("/animals", async (req, res) => {
  if (req.body.extinct === "on") {
    req.body.extinct = true; 
  } else {
    req.body.extinct = false; 
  }
  await Animal.create(req.body); 
  res.redirect("/animals"); 
});

app.get("/animals/:id", async (req, res) => {
  const foundAnimal = await Animal.findById(req.params.id); 
  res.render("show.ejs", { animal: foundAnimal });
});

app.delete("/animals/:id", async (req, res) => {

  await Animal.findByIdAndDelete(req.params.id); 
  res.redirect("/animals"); 
});

app.get("/animals/:id/edit", async (req, res) => {
  const animal = await Animal.findById(req.params.id); 
  res.render("edit.ejs", { animal }); 
});

app.put("/animals/:id", async (req, res) => {
  if (req.body.extinct === "on") {
    req.body.extinct = true; 
  } else {
    req.body.extinct = false; 
  }

  await Animal.findByIdAndUpdate(req.params.id, req.body); 
  res.redirect("/animals"); 
});

app.listen(
  process.env.PORT,
  () => console.log(`Itachi is listening to port ${process.env.PORT}`) 
);