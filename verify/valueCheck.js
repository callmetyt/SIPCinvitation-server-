module.exports = function valueCheck(data, files) {
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      if (data[key] == "") {
        return true;
      }
    }
  }
  if (files.file == undefined) {
    return true;
  }
  return false;
};
