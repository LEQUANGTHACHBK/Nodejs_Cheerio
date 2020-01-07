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
  for (i = 1; i < 100; i++) {
    request("http://ngamvn.net/anh-girl?page=" + i, function(
      error,
      respone,
      body
    ) {
      if (error) {
        console.log(error);
      } else {
        $ = cheerio.load(body);
        var ds = $(body).find("img.thumb");
        ds.each(function(i, e) {
    
          str = "http://ngamvn.net" + e["attribs"]["src"];
          const options = {
            url: str,
            dest: "C:/Users/lequa/OneDrive/Desktop/Ngam"
          };

          download
            .image(options)
            .then(({ filename, image }) => {
              console.log("Saved to", filename);
            })
            .catch(err => console.error(err));
        });
      }
    });
  }
});
