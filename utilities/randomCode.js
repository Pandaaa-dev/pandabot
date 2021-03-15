const randomCode = (num) => {
        var text = "";
        var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < num; i++){
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text
}

module.exports = randomCode