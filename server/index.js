const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const axios = require("axios")
const dotenv = require("dotenv").config();

const app = express();
const port = process.env.PORT;
const URL = process.env.URL
const URL2 = process.env.URL2
const URL3 = process.env.URL3

app.use(cors());
// let imageSequence = 1;
// Set up Multer storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '../darkpen/public/Images');
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     const originalName = file.originalname.replace(/\.[^/.]+$/, '');
//     const filename = `${originalName}-${imageSequence}-${uniqueSuffix}${path.extname(file.originalname)}`;
//     imageSequence++; // Increment the sequence for the next image
//     cb(null, filename);
//   },
// });


// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../darkpen/public/Images');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const originalName = file.originalname
    // .replace(/\.[^/.]+$/, '');
    // const filename = `${imageSequence}${path.extname(file.originalname)}`;
    // imageSequence++; // Increment the sequence for the next image
    cb(null, originalName);
  },
});

const upload = multer({ storage });

//  Add Blog starts Here 
app.post("/upload", upload.single('images'), async (req, res) => {
  const { blog_heading, blog_author, blog_slug, category, about, description, tag, status } = req.body;
  const images = req.file.filename;
  console.log(images)
  const FormFieldData = {
    blog_heading, blog_author, blog_slug, category, about, description, images, tag, status
  };
  console.log(FormFieldData);
  try {
    console.log("i am in upload try block");
    await axios.post(URL, FormFieldData).then((res) => console.log("this is response", res));
    res.send(images);
    console.log("below response")
  }
  catch (e) {
    console.log("this is a post error", e)
  }
})
// Add Blog Ends Here 




// Update Blog Here 
app.post("/update", upload.single('images'), async (req, res) => {
  const { id, blog_heading, blog_author, blog_slug, category, about, description, tag } = req.body;
  const images = req.file.filename;
  const FormFieldData = {
    blog_heading, blog_author, blog_slug, category, about, description, images, tag
  };
  console.log(FormFieldData);
  console.log("this is id: ", id);
  try {
    console.log("i am in update try block");
    await axios.put(`${URL}/${id}`, FormFieldData).then(() => console.log("this is response"));
    res.send(images);
    console.log("below response")
  }
  catch (e) {
    console.log("this is a post error")
  }

})

//  Pages starts here 
app.post("/addpages", upload.single('images'), async (req, res) => {
  const { heading, slug, tags, about, description, status } = req.body;
  const images = req.file.filename;
  const FormFieldData = {
    heading, slug, tags, about, description, images, status
  };

  try {
    console.log("i am in try mypages block");
    await axios.post(URL2, FormFieldData).then((res) => console.log("this is response", res));
    res.send(images);
    console.log("below response")
  }
  catch (e) {
    console.log("this is a post error")
  }

})
app.post("/updatepages", upload.single('images'), async (req, res) => {
  const { id, heading, slug, tags, about, description, status } = req.body;
  const images = req.file.filename;
  const FormFieldData = {
    heading, slug, tags, about, description, images, status
  };
  console.log("Updating values at index: ", id);
  // console.log(FormFieldData);
  try {
    console.log("i am in update try block");
    await axios.put(`${URL2}/${id}`, FormFieldData).then(() => console.log("this is response"));
    res.send(images);
    console.log("below response")
  }
  catch (e) {
    console.log("this is a post error of Update pages")
  }
})

//  Pages ends here 



// testimonials start here 

app.post("/view", upload.single('images'), async (req, res) => {
  const { name, profession, brief, socials } = req.body;
  const images = req.file.filename;
  const FormFieldData = {
    name, profession, brief, images, socials
  };
  console.log("FormFieldData : ", FormFieldData);
  try {
    console.log("i am in views route try block");
    await axios.post(`${URL3}`, FormFieldData).then(() => console.log("this is response"));
    res.send(images);
    console.log("below response")
  }
  catch (e) {
    console.log("this is a post error of Update pages")
  }
})


app.post("/viewupdate", upload.single('images'), async (req, res) => {
  const { id, name, profession, brief, socials } = req.body;
  const images = req.file.filename;
  const FormFieldData = {
    name, profession, brief, images, socials
  };
  console.log("FormFieldData : ", FormFieldData);
  try {
    console.log("i am in views route try block");
    await axios.put(`${URL3}/${id}`, FormFieldData).then(() => console.log("this is response"));
    res.send(images);
    console.log("below response")
  }
  catch (e) {
    console.log("this is a post error of Update pages")
  }
})

// testimonials Ends here 

app.listen(port, (err) => {
  if (!err) {

    console.log(`Serve is runing at ${port}  port`)
  }
})