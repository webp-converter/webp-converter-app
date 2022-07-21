const fs = require("fs");
const webp = require('webp-converter');

const imageFile = document.getElementById("image-file");
const info = document.getElementById("info");

imageFile.addEventListener("change", (e) => {
  const files = e.target.files;

  console.log("files: ", files);

  createBuildFolder();

  Array.from(files).map((item) => {
    const data = fileData(item);
    const result = webp.cwebp(data.importImage, data.exportImage, "-q 80", logging = "-v");

    result.then((response) => {
      info.innerText = response;
    });
  });
});

const fileData = (item) => {
  const type = item.type.split('/').pop();
  const name = item.name.replace(`.${type}`, "");
  const importImage = item.path;
  const exportImage = `./build/${name}.webp`;

  return {
    type: type,
    name: name,
    importImage: importImage,
    exportImage: exportImage
  }
}

const createBuildFolder = () => {
  if (!fs.existsSync("./build")) {
    fs.mkdirSync("./build");
  }
}