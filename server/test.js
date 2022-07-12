const fs = require("fs");

const { v4: uuidv4 } = require("uuid");

const data = [];

const dates = [
  "Tuesday, January 4, 2022",
  "Sunday, May 1, 2022",
  "Wednesday, June 15, 2022",
  "Thursday, May 12, 2022",
];

for (let i = 0; i < dates.length; i++) {
  for (let j = 0; j < 5; j++) {
    const transaction = {
      id: uuidv4(),
      date: dates[i],

      status: j % 2 ? "pending" : "active",
      type: j % 2 ? "credit" : "debit",
    };
    data.push(transaction);
  }
}

fs.writeFile("./mock.json", JSON.stringify(data), (error) => {
  if (error) return console.log(error);
  console.log("done...");
});
