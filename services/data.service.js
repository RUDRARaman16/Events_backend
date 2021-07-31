
const db = require('./db')

let UserDetails = {
  100: { userID: 100, username: "userone", password: "userone", events: [] },//another object
  101: { userID: 101, username: "usertwo", password: "usertwo", events: [] },
  102: { userID: 102, username: "userthree", password: "userthree", events: [] },
  103: { userID: 103, username: "userfour", password: "userfour", events: [] }
}
const register = (uname, userID, pswd) => {
  return db.User.findOne({ userID })
    .then(user => {
      console.log(user)
      if (user) {
        return {
          statusCode: 422,
          status: false,
          message: "User Exists please login"
        }
      }
      else {
        const newUser = new db.User({
          userID,
          username: uname,
          password: pswd,
          events: []
        })
        newUser.save()

        return {
          statusCode: 200,
          status: true,
          message: "Successfully Registered"
        }

      }
    })
  }
     

      const login = (req, userID, password) => {
        var userID = parseInt(userID)
        return db.User.findOne({ userID, password }) 
          .then(user => {
            if (user) {

              req.session.currentUID = userID
              console.log(req.session.currentUID)
              return {
                statusCode: 200,
                status: true,
                message: "succcessfull login",
                name: user.username
              }
            }
            else {
              return {
                statusCode: 422,
                status: false,
                message: " invalid credentials"
              }
            }
          })
      }
    

      const addEvent = (req, userID, edate, edes) => {
        
        return db.User.findOne({ userID })
          .then(user => {

            if (req.session.currentUID != userID) {
              return {
                statusCode: 422,
                status: false,
                message: "Sorry,Permission Denied"
              }
            }
            else {
              user.events.push({
                edate: edate,
                edes: edes
              })
              user.save()
              return {
                statusCode: 200,
                status: true,
                message: "Successfully Added"
              }
            }
          })
      }
     

      const viewEvent = (userID) => {
        return db.User.findOne({ userID })
          .then((user) => {
            if (user) {
              return {
                statusCode: 200,
                status: true,
                message: user.events
              }
            }
            else {
              return {
                statusCode: 422,
                status: false,
                message: "Failed to view"
              }
            }
          })
      }
    

      module.exports = {
        register,
        login,
        addEvent,
        viewEvent
      }