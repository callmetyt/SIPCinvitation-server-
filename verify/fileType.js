module.exports = function fileTypeVerify(filename) {
  let fileType = filename.substr(filename.lastIndexOf(".") + 1);
  let whiteList = ["jpg", "jpeg", "png"];
  return !whiteList.includes(fileType);
};
