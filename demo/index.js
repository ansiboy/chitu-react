let node_modules = '../node_modules'
requirejs.config({
    shim: {

    },
    paths: {
        "react": `${node_modules}/react/umd/react.development`,
        "react-dom": `${node_modules}/react-dom/umd/react-dom.development`,
        "maishu-chitu": `${node_modules}/maishu-chitu/dist/chitu`,

        "../../out/index": "../../dist/index"
    }
})

requirejs(['react', 'react-dom', 'maishu-chitu'], function (react, reactDOM) {
    requirejs(['../dist/index'], function (chitu) {
        let app = new chitu.Application()
        app.run()
    })

})