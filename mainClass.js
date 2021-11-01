/**
 * the global value create function
 * add, get , delete a file function
 */

class Block {
  constructor(id) {
    this.id = id; // will be the index of the storage
    this.status = ""; // "" / "occupied"
    this.fileId = ""; // file ID
    this.size = 0; // size of the file
  }
}
// create the storage structure
module.exports = class Storage {
  constructor() {
    this.unitsSizeWith = ""; // 1_MB
    this.blockSize = 0; // 1 KB
    this.unitsSizeInKB = 0; // storage size in KB
    this.storage = []; // list of blocks
  }
  initialStorage(storage, blockSize) {
    /**
     * initiate a storage. convert the size to KB,
     * add fill this.storage with Blocks
     */
    this.unitsSizeWith = storage;
    this.blockSize = blockSize;
    let unit = this.unitsSizeWith.split("_");
    switch (unit[1].toUpperCase()) {
      case "BYTES":
        this.unitsSizeInKB = Number(unit[0]) / 1024;
        break;
      case "MB":
        this.unitsSizeInKB = Number(unit[0]) * 1024;
        break;
      case "GB":
        this.unitsSizeInKB = Number(unit[0]) * 1024 * 1024;
        break;
      case "TB":
        this.unitsSizeInKB = Number(unit[0]) * 1024 * 1024 * 1024;
        break;
      case "PB":
        this.unitsSizeInKB = Number(unit[0]) * 1024 * 1024 * 1024 * 1024;
        break;
      default:
        this.unitsSizeInKB = Number(unit[0]);
        break;
    }
    // calculate the max block amounts, and push to storage
    const size = Math.floor(this.unitsSizeInKB / this.blockSize);
    for (let i = 0; i < size; i++) {
      let block = new Block(i);
      this.storage.push(block);
    }
    return size;
  }
  displayStatus() {
    // checking the total size, total block amount and display all the storages
    console.log(`
********************************
  Your Storage Info
  Total Size: ${this.unitsSizeWith}
  Total Blocks: ${this.storage.length}
********************************`);
    return [this.unitsSizeWith, this.storage.length];
  }
  addAFile(fileId, fileSize) {
    /**
     * To add a file
     * 1. get total blocks this file will take
     * 2. find all the available index of the storage with consist block amount > file
     * 3. save the file ID and size to the block(s)
     * return these blocks
     */
    const data = this.getAFile(fileId); // check if have the file id
    if (data.length < 1) {
      const neededBlocks = Math.ceil(Number(fileSize) / (this.blockSize * 1024)); //blocks this file will take
      let space = {};
      let key = 0; // the first index of a first available block
      let counter = 0;
      this.storage.filter((a, k) => {
        if (a.status === "") {
          if (counter < 1) {
            key = k;
          }
          space[key] = [key, counter];
          ++counter;
        } else {
          if (counter > 0) {
            space[key] = [key, counter];
          }
          counter = 0;
        }
      });
      const size = Object.values(space)
        .sort()
        .filter(x => x[1] >= neededBlocks); // sort the empty size equal or bigger than the neededSize in ASC
      if (size.length > 0) {
        // find the space
        let files = []; // returned array
        for (let i = Number(size[0][0]); i < Number(size[0][0]) + neededBlocks; i++) {
          let block = {
            fileId: "",
            id: i,
            status: "occupied",
            size: neededBlocks,
          };
          block.fileId = fileId;
          block.id = i;
          files.push(block);
          this.storage[i].fileId = fileId;
          this.storage[i].status = "occupied";
          this.storage[i].size = neededBlocks; // update the storage
        }
        return files; // return the file blocks
      } else {
        return "Cannot find an available space";
      }
    } else {
      return "The file already exist, change an ID.";
    }
  }
  getAFile(fileId) {
    // filter through storage get the same file id blocks
    const res = this.storage.filter(a => a.fileId == fileId);
    return res;
  }
  deleteAFile(fileId) {
    //get the first file id matched in the storage and init a block
    const data = this.getAFile(fileId);
    if (data.length > 0) {
      const found = this.storage.find(a => a.fileId === fileId);
      const integer = found.id + found.size;
      for (let i = found.id; i < integer; i++) {
        this.storage[i] = new Block(i);
      }
      return "Successfully delete the file.";
    } else {
      return "The file doesn't exist.";
    }
  }
};
