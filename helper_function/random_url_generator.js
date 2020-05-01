var user_db = require("../model/url")
var help = {
    random_url: function(url, id) {
        return "https://s1url.herokuapp.com/" + id.toString().substring(8, id.length)
    },
    find_url: function(url, res) {
        user_db.find({ shortened_url: url }, (err, url_object) => {
            if (url_object[0]) {
                res.redirect(url_object[0].original_url + "")
            }
        })
    }
}
module.exports = help