const Fs = require("fs");
const Path = require("path");
const Sass = require("node-sass");

const getComponents = () => {
  let allCompoents = [];
  const types = ["atoms", "molecules", "organisms"];

  types.forEach((type) => {
    const allFiles = Fs.readdirSync(`src/${type}`).map((file) => ({
      input: `./src/${type}/${file}`,
      output: `./src/lib/${type}/${file.slice(0, -4) + "css"}`,
    }));

    allCompoents = [...allCompoents, ...allFiles];
  });
  return allCompoents;
};

const compileCss = (path, fileName) => {
  const result = Sass.renderSync({
    data: Fs.readFileSync(Path.resolve(path)).toString(),
    outputStyle: "expanded",
    outFile: "global.css",
    includePaths: [Path.resolve("src")],
  });

  Fs.writeFileSync(Path.resolve(fileName), result.css.toString());
};

compileCss("./src/global.scss", "./src/lib/global.css");

getComponents().forEach((comp) => {
  compileCss(comp.input, comp.output);
});
