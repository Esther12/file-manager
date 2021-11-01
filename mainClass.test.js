const Storage = require("./mainClass");

test("new a storage class", () => {
  expect(new Storage()).toEqual({
    unitsSizeWith: "",
    blockSize: 0,
    unitsSizeInKB: 0,
    storage: [],
  });
});
const testCase = new Storage();
test("initial a  7 KB storage with 2 KB", () => {
  expect(testCase.initialStorage("7_KB", 2)).toBe(3);
});
test("initial a 7 MB storage with 2KB", () => {
  expect(testCase.initialStorage("7_MB", 2)).toBe(3584);
});
test("add a 4,000 bytes file", () => {
  expect(testCase.addAFile(1, 4000)).toHaveLength(2);
});
test("add an 40,000 bytes file", () => {
  expect(testCase.addAFile(2, 40000)).toHaveLength(20);
});
test("add an 400,000 bytes with exist id file", () => {
  expect(testCase.addAFile(2, 400000)).toContain("exist");
});
test("add an 400,000 bytes with exist id file", () => {
  expect(testCase.addAFile(3, 400000000)).toContain("Cannot find an available space");
});
test("get fileId 1 file", () => {
  expect(testCase.getAFile(1)).toHaveLength(2);
});
test("get fileId 2 file", () => {
  expect(testCase.getAFile(2)).toHaveLength(20);
});
test("get fileId 3 file", () => {
  expect(testCase.getAFile(3)).toHaveLength(0);
});
test("delete fileId 3 file", () => {
  expect(testCase.deleteAFile(3)).toBe("The file doesn't exist.");
});
test("delete fileId 2 file", () => {
  expect(testCase.deleteAFile(2)).toBe("Successfully delete the file.");
});
test("delete fileId 2 file", () => {
  expect(testCase.deleteAFile(2)).toBe("The file doesn't exist.");
});
test("delete fileId 1 file", () => {
  expect(testCase.deleteAFile(1)).toBe("Successfully delete the file.");
});
test("display storage details", () => {
  expect(testCase.displayStatus()).toContain("7_MB");
});
