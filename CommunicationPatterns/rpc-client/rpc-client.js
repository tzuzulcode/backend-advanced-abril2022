const { createClient } = require("@node-rpc/client")
const { jsonSerializer } = require("@node-rpc/client/dist/serializers/jsonSerializer")
const { axiosXHR } = require("@node-rpc/client/dist/xhr/axios")

const api = createClient({
    endpoint: "http://localhost:4000/calculator",
    serializer: jsonSerializer,
    xhr: axiosXHR, //XMLHTTPRequest
    auth: () => "secret",
});

async function sub(){
    const result = await api.sub(10,5).call()
    console.log(result)
}

sub()