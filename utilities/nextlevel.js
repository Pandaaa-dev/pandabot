const nextLevel = (points, level) => {
    const requiredPoints = 500 * (Math.pow(2, level+1) - 1)
    if(requiredPoints > points){
        return false
    } else {
        return true 
    }
}


module.exports = nextLevel