const Users = require('../models/Users')

const orderGames = async (userId) =>{
    console.log('Devolviendo los juegos ordenados');
    
    let games = {
        'Not Status':[],
        'Not Started':[],
        'In Progress':[],
        Completed:[],
        Abandoned:[]
    }  

    const user = await Users.findById(userId).populate({path:'videogames', options: { sort: { 'status': 1 ,'position':1} }})

    user.videogames.forEach(el=>{
        games[el.status] = games[el.status].concat(el)
    })

    return games
}

module.exports = orderGames