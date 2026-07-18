const fs = require("fs");
let hbs = require("handlebars");
const pageTemplate = fs.readFileSync("./page.hbs", "utf8");
const aPage = hbs.compile(pageTemplate);
hbs.registerHelper('eq', function (a, b) {
  return a === b;
});
const markdown = require("markdown").markdown;
const pages = require("./pages.json");
const he = require('he');

(async () => {
  try {
    pages.pages.forEach((p)=> {
      
    let content = fs.readFileSync(`./${p}.md`, "utf-8");
    const pageData = {
      name: `${p}`,
      pages: pages.pages,
      content: he.decode(markdown.toHTML(content)),
    };
    const pageOutput = aPage(pageData);
    fs.writeFileSync(`./docs/${p}.html`, pageOutput);

    });
  } catch (e) {
    console.log(`😭 Oh no – something went wrong:\n\n${e}`);
  }
})();
