const express = require("express");
const app = express();
const fs = require("fs");
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/file", async (req, res) => {
  fs.writeFile("./temp.txt", "Hey there!", function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });

  fs.readFile("./lorem.txt", (error, data) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.status(200).json(data.toString("utf8"));
    }
  });
});

app.get("/cal", (req, res) => {
  var arithmetic = {
    result: 0,
    add: function (a) {
      this.result = this.result + a;
      return this;
    },
    substract: function (a) {
      this.result = this.result - a;
      return this;
    },
  };
  function calculator(value) {
    arithmetic.result = value;
    return arithmetic;
  }
  res.status(200).send(calculator(1).add(1).substract(0));
});

app.get("/callback", (req, res) => {
  function httpCall(x, y, callback) {
    if (typeof x == "number" && typeof y == "number") {
      callback("", x + y);
    } else {
      callback("Number exception");
    }
  }

  function cb(error, value) {
    if (error) {
      return res.status(400).send(error);
    }
    return res.status(200).send(value.toString());
  }

  httpCall(4, 5, cb);
});

// const p = (x, y) => {
//   return new Promise(function (resolve, reject) {
//     if (typeof x == "number" && typeof y == "number") {
//       resolve(x + y);
//     } else {
//       reject("Number exception");
//     }
//   });
// };

const p = async (x, y) => {
  if (typeof x == "number" && typeof y == "number") {
    return x + y;
  } else {
    throw "Number exception";
  }
};

app.get("/promise", (req, res) => {
  p(100, 5)
    .then((result) => res.status(200).send(result.toString()))
    .catch((error) => res.status(400).send(error));
});

app.get("/async", async (req, res) => {
  try {
    const result = await p(4, 5);
    res.status(200).send(result.toString());
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
