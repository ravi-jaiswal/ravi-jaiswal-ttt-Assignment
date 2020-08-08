var express = require("express"),
  bodyParser = require("body-parser");
const fetch = require("node-fetch");
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
const PORT = process.env.PORT || 5000;
function foo(arr) {
  var a = [],
    b = [],
    prev;

  arr.sort();
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] !== prev) {
      a.push(arr[i]);
      b.push(1);
    } else {
      b[b.length - 1]++;
    }
    prev = arr[i];
  }

  return [a, b];
}
app.get("/", (req, res) => {
  res.send("succ");
});
app.post("/num", async (req, res) => {
  var num = req.body.num;
  var data = await getData();
  console.log(typeof data);
  var words = data
    .toLowerCase()
    .replace(/(\r\n|\n|\r|[.,?])/gm, "")
    .split(" ");
  var countArray = foo(words);
  console.log(countArray);
  var result = {};
  countArray[0].forEach((key, i) => (result[key] = countArray[1][i]));
  var arr = sortObject(result);
  function sortObject(obj) {
    var arr = [];
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        arr.push({
          key: prop,
          value: obj[prop],
        });
      }
    }
    arr.sort(function (a, b) {
      return b.value - a.value;
    });
    return arr;
  }
  var requiredWord = arr.slice(0, num);
  res.send(requiredWord);
});
async function getData() {
  var data;
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  return fetch("http://terriblytinytales.com/test.txt", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return result;
    })
    .catch((error) => console.log("error", error));
}
//App Listen
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
