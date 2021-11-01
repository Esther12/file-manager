/**
 * Interface of this file manager system
 */

// dependency for inquirer npm package
var inquirer = require("inquirer"); // for the node terminal interface
const Storage = require("./mainClass");
var user;
function customStorage() {
  /**
   * Customize the storage
   */
  inquirer
    .prompt([
      {
        type: "list",
        name: "size",
        message: `*******   Select the unit of your storage size   *******
`,
        choices: ["bytes", "KB", "MB", "GB", "TB", "PB"],
      },
      {
        type: "number",
        name: "storage_space",
        message: "Enter the total storage size (Need to be bigger than 1KB):",
      },
      {
        type: "number",
        name: "storage_unit_size",
        message: "Enter the total unit size in KBs: ",
      },
    ])
    .then(function (res) {
      user.initialStorage(res.storage_space + "_" + res.size, res.storage_unit_size);
      menu();
    });
}

function main() {
  /** the main function */
  inquirer
    .prompt([
      {
        type: "list",
        name: "start",
        message: `*******   Welcome to the system   *******
`,
        choices: ["Quick start with random size(1 MB, 1KB)", "Create my own"],
      },
    ])
    .then(function (res) {
      user = new Storage();
      if (res.start == "Quick start with random size(1 MB, 1KB)") {
        user.initialStorage("1_MB", "1");
        menu();
      } else {
        customStorage();
      }
    });
}

function menu() {
  /** the menu */
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: `*******   Menu   *******
`,
        choices: ["Add one file", "Delete one file", "Get one file info", "Check the storage status", "Exist"],
      },
    ])
    .then(function (res) {
      switch (res.choice) {
        case "Add one file":
          addAFile();
          break;
        case "Delete one file":
          deleteAFile();
          break;
        case "Get one file info":
          getAFile();
          break;
        case "Check the storage status":
          user.displayStatus();
          menu();
          break;
        default:
          console.log(`
Bye Bye!
********************************
********************************
`);
          break;
      }
    });
}
function addAFile() {
  /**add file  */
  inquirer
    .prompt([
      {
        name: "id",
        message: "Insert one file id: ",
      },
      {
        name: "size",
        message: "Insert the file size(in bytes): ",
      },
    ])
    .then(function (res) {
      const data = user.addAFile(res.id, res.size);
      console.log(data); // result
      menu();
    });
}
function deleteAFile() {
  inquirer
    .prompt([
      {
        name: "id",
        message: "Insert the file id: ",
      },
    ])
    .then(function (res) {
      const data = user.deleteAFile(res.id);
      console.log(data); // notice
      menu();
    });
}
function getAFile() {
  inquirer
    .prompt([
      {
        name: "id",
        message: "Insert one file id: ",
      },
    ])
    .then(function (res) {
      const file = user.getAFile(res.id);
      console.log(file); // result
      menu();
    });
}
main();
