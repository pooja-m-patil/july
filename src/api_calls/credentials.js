const DBAUTH={
    Authorization: 'Basic NzIyZmE3YjgtMGM0MS00ZDU5LWFjOGMtMWMwMmQyNWVhZWY1LWJsdWVtaXg6YjdkZGQyOGJmNzU1ODk1Nzg4NjA3NDU3YmRmMjgyZGJmNzJkY2EzMTg3YzA1ZDIwMTZjYjAzNGU5MDI1MDFhNw==',
    'Content-Type': 'application/json'
}

const IBMAUTH={
    Authorization: 'Basic YS10Z2FjZzgtcDNoZXlmMWMxZzpvRm1jZ1RlaUNCd0BRNCp2aig=',
    'Content-Type': 'application/json'
}

module.exports = {
    DBAUTH:DBAUTH,
    IBMAUTH:IBMAUTH,
    DBURL:'https://722fa7b8-0c41-4d59-ac8c-1c02d25eaef5-bluemix.cloudant.com/',
    IBMURL:'https://tgacg8.internetofthings.ibmcloud.com/api/v0002/device/types/',
}