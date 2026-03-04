const fs = require("fs");

const jsonData = JSON.parse(fs.readFileSync("./pictos/allpictos.json", "utf8"));

const filteredKeys = Object.keys(jsonData).filter(key => {
  const value = jsonData[key];
  return !/\*+$/.test(value);
});

fs.writeFileSync(
  "./pictos/filtered_keys.txt",
  filteredKeys.sort().join("\n"),
  "utf8"
);

console.log(`Extracted ${filteredKeys.length} filtered keys to ./pictos/filtered_keys.txt`);
