const fs = require("fs")
const path = require("path")
const uuid = require("uuid")

const getAllUsers = (req, res) => {
  fs.readFile("./user.json", "utf8", (err, data) => {
    if (err && err.code !== "ENOENT") {
      return res
        .status(500)
        .json({ message: "Error reading the user.json file" })
    }

    let usersFromFile = []

    if (data) {
      try {
        usersFromFile = JSON.parse(data)
        
      } catch (parseError) {
        return res
          .status(500)
          .json({ message: "Error parsing the user.json file" })
      }
    }

    res.status(200).json(usersFromFile)
  })
}

const getUserById = (req, res) => {
  const userId = req.params.userId

  fs.readFile("user.json", "utf8", (err, data) => {
    if (err && err.code !== "ENOENT") {
      return res
        .status(500)
        .json({ message: "Error reading the user.json file" })
    }

    let usersFromFile = []

    if (data) {
      try {
        usersFromFile = JSON.parse(data)
      } catch (parseError) {
        return res
          .status(500)
          .json({ message: "Error parsing the user.json file" })
      }
    }

    const user = usersFromFile.find((u) => u.id === userId)

    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({ message: "User not found" })
    }
  })
}

const createUser = (req, res) => {
  const { username, age, hobbies } = req.body

  if (!username || !age || !hobbies) {
    res.status(400).json({ message: "Missing required fields" })
  } else {
    const newUser = {
      id: uuid.v4(),
      username,
      age,
      hobbies,
    }

    fs.readFile("user.json", "utf8", (err, data) => {
      if (err && err.code !== "ENOENT") {
        return res
          .status(500)
          .json({ message: "Error reading the user.json file" })
      }

      let usersFromFile = []

      if (data) {
        try {
          usersFromFile = JSON.parse(data)
        } catch (parseError) {
          return res
            .status(500)
            .json({ message: "Error parsing the user.json file" })
        }
      }

      usersFromFile.push(newUser)

      fs.writeFile(
        "user.json",
        JSON.stringify(usersFromFile, null, 2),
        (writeErr) => {
          if (writeErr) {
            return res
              .status(500)
              .json({ message: "Error writing to the user.json file" })
          }

          res.status(201).json(newUser)
        }
      )
    })
  }
}

const updateUser = (req, res) => {
  const userId = req.params.userId
  const { username, age, hobbies } = req.body

  fs.readFile("user.json", "utf8", (err, data) => {
    if (err && err.code !== "ENOENT") {
      return res
        .status(500)
        .json({ message: "Error reading the user.json file" })
    }

    let usersFromFile = []

    if (data) {
      try {
        usersFromFile = JSON.parse(data)
      } catch (parseError) {
        return res
          .status(500)
          .json({ message: "Error parsing the user.json file" })
      }
    }

    const index = usersFromFile.findIndex((u) => u.id === userId)

    if (index === -1) {
      res.status(404).json({ message: "User not found" })
    } else {
      const updatedUser = {
        id: userId,
        username: username || usersFromFile[index].username,
        age: age || usersFromFile[index].age,
        hobbies: hobbies || usersFromFile[index].hobbies,
      }
      usersFromFile[index] = updatedUser

      fs.writeFile(
        "user.json",
        JSON.stringify(usersFromFile, null, 2),
        (writeErr) => {
          if (writeErr) {
            return res
              .status(500)
              .json({ message: "Error writing to the user.json file" })
          }

          res.status(200).json(updatedUser)
        }
      )
    }
  })
}

const deleteUser = (req, res) => {
  const userId = req.params.userId

  fs.readFile("user.json", "utf8", (err, data) => {
    if (err && err.code !== "ENOENT") {
      return res
        .status(500)
        .json({ message: "Error reading the user.json file" })
    }

    let usersFromFile = []

    if (data) {
      try {
        usersFromFile = JSON.parse(data)
      } catch (parseError) {
        return res
          .status(500)
          .json({ message: "Error parsing the user.json file" })
      }
    }

    const index = usersFromFile.findIndex((u) => u.id === userId)

    if (index === -1) {
      res.status(404).json({ message: "User not found" })
    } else {
      usersFromFile.splice(index, 1)

      fs.writeFile(
        "user.json",
        JSON.stringify(usersFromFile, null, 2),
        (writeErr) => {
          if (writeErr) {
            return res
              .status(500)
              .json({ message: "Error writing to the user.json file" })
          }

          res.status(204).send()
        }
      )
    }
  })
}
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
}
