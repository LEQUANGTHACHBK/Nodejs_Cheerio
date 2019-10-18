var express = require("express");
var app = express();
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "./views");
///Request
var request = require("request");
var cheerio = require("cheerio");
const download = require("image-downloader");
app.listen(3000, () => {
  for (i = 1; i < 25; i++) {
    request("http://ngamvn.net/anh-girl?page=" + i, function(
      error,
      respone,
      body
    ) {
      if (error) {
        console.log(error);
        //   res.render("Home", { html: "Some Error has happened" });
      } else {
        //   console.log(body);
        //   res.render("Home", { html: body });
        $ = cheerio.load(body);
        var ds = $(body).find("img.thumb");
        console.log(ds)
        //   array_pict = [];
        ds.each(function(i, e) {
    
          str = "http://ngamvn.net" + e["attribs"]["src"];
          const options = {
            url: str,
            dest: "C:/Users/lequa/OneDrive/Desktop/a"
          };

          download
            .image(options)
            .then(({ filename, image }) => {
              console.log("Saved to", filename);
            })
            .catch(err => console.error(err));
          // array_pict.push(str);
        });
        //   console.log(array_pict);
        //   res.render("Home", { html: array_pict });
        //   console.log($(this).text());
        //   ds.each(function(i, e) {
        //     console.log(e["attribs"]["href"]);
        //   });
      }
    });
  }
});
