
const path = require("path");

exports.default = {
    port: 8424,
    virtualPaths: {
        "maishu-chitu-react.js": path.join(__dirname, "../dist/index.js")
    }
}