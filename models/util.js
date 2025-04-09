(() => {
    const mongodb = require('mongodb')
    const MongoClient = mongodb.MongoClient
    const connection = require("./config/config")
    //-------------------------------------------------------------------------
    /**
     * Connection Strings
     */
    //-------------------------------------------------------------------------
    //----------------------------------------------------------------
    //let uri = 
    const getMongoClient = (local = true) => {
        let uri = `mongodb+srv://${connection.USERNAME}:${connection.PASSOWRD}@${connection.SERVER}/${connection.DATABASE}?retryWrites=true&w=majority&appName=CPSC2030`
        if (local) {
            uri = `mongodb://127.0.0.1:27017/${connection.DATABASE}`
        }
        console.log(`Connection String<<${uri}`)
        return new MongoClient(uri)
    }

    const findAll = async (collection,query) => {
        return collection.find(query).toArray()
            .catch(err => {
                console.log("Could not find ", query, err.message);
            })
    }
    const insertOne = async (collection, document) => {
        return await collection.insertOne(document)
            .then(res => console.log("Data inserted with ID", res.insertedId))
            .catch(err => {
                console.log("Could not add data ", err.message);
                //For now, ingore duplicate entry errors, otherwise re-throw the error for the next catch
                if (!(err.name === 'BulkWriteError' && err.code === 11000)) throw err;
            })
    }

    const logRequest = async (req, res) => {
        const client = util.getMongoClient(false)
        client.connect()
            .then(conn => {
                console.log('\t|inside connect()')
                console.log('\t|Connected successfully to MongoDB!',
                    conn.s.url.replace(/:([^:@]{1,})@/, ':****@'))
                /**
          * Create a collection in a MongoDB database
          * Like a database, a collection will be created if it does not exist
          * The collection will only be created once we insert a document
          */
                let collection = client.db().collection("Requests")
                let log = {
                    Timestamp: new Date(),
                    Method: req.method,
                    Path: req.url,
                    Query: req.query,
                    'Status Code': res.statusCode,
                }
                //console.log(log)
                util.insertOne(collection, log)
                
            })
            .catch(err => console.log(`\t|Could not connect to MongoDB Server\n\t|${err}`))
            .finally(() => {
                //client.close()
                //console.log('Disconnected')
            })
       
    }
    const util = {
        url: 'localhost',
        username: 'webuser',
        password: 'letmein',
        port: 22643,
        database: 'forum',
        collections: ['logs', 'posts', 'users', 'roles'],
        getMongoClient: getMongoClient,
        insertOne: insertOne,
        findAll, findAll,
        logRequest: logRequest,
        getMongoClient: getMongoClient
        
    }
    const moduleExport = util
    if (typeof __dirname != 'undefined')
        module.exports = moduleExport
})()