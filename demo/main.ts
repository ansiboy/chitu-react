
var requirejsConfig = {
    "paths": {
        "css": "node_modules/maishu-requirejs-plugins/src/css",
        "text": "node_modules/maishu-requirejs-plugins/lib/text",
        "json": "node_modules/maishu-requirejs-plugins/src/json",

        "react": "node_modules/react/umd/react.development",
        "react-dom": "node_modules/react-dom/umd/react-dom.development",
        "maishu-chitu": "node_modules/maishu-chitu/dist/index.min",
        // "maishu-chitu-react": "node_modules/maishu-chitu-react/dist/index.min",
        "maishu-chitu-service": "node_modules/maishu-chitu-service/dist/index.min",
        "maishu-dilu": "node_modules/maishu-dilu/dist/index.min",
        "maishu-toolkit": "node_modules/maishu-toolkit/dist/index.min",
        "maishu-ui-toolkit": "node_modules/maishu-ui-toolkit/dist/index.min",
        "maishu-wuzhui": "node_modules/maishu-wuzhui/dist/index.min",
        "maishu-wuzhui-helper": "node_modules/maishu-wuzhui-helper/dist/index.min",
    }
}

requirejs.config(requirejsConfig);

requirejs(["maishu-chitu-react"], function (mod) {
    let app = new mod.Application();
    app.run();
})

