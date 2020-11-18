var mocker = require('mocker-data-generator').default

module.exports = function (api, options) {

    api.loadSource(actions => {

        //console.log(options);
        
        //Create all collections which are defined
        Object.values(options.collections).forEach(collectionName => {
            actions.addCollection(collectionName)
        });

        //Create References
        Object.entries(options.refs).forEach(definition => {
            const [source, refs] = definition;

            //get previous generated collection
            const currentCollection = actions.getCollection(options.collections[source])

            //generate the reference for each defined field
            Object.entries(refs).forEach(refEntry => {
                const [field, refCollection] = refEntry
                currentCollection.addReference(field, refCollection)
            })
        });

        //generate the mock data
        var mock = mocker()
        Object.entries(options.schema).forEach(entry => {
            const [schemaName, schema] = entry
            mock.schema(schemaName, schema, options.amount[schemaName] || 10)
        })
        mock.buildSync()
   
        Object.entries(mock.DB).forEach(entry => {
            const [source, data] = entry

            const currentCollection = actions.getCollection(options.collections[source])
            data.forEach(element => currentCollection.addNode(element))
        })
        
    })
}