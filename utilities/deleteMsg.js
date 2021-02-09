const deleteMsg = async (msg) => {
    msg.delete()
    .then(msg => {} )
    .catch(error => console.log(error))
}

module.exports = deleteMsg