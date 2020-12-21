const deleteMsg = async (msg) => {
    msg.delete()
    .then(msg => console.log('msg deleted') )
    .catch(error => console.log(error))
}

module.exports = deleteMsg