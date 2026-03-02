import express from "express"

const app = express()

app.use(express.static('/public'));

const robots = JSON.parse(FileSystem.readFileSync('/public/robots.json', 'utf8'));

const robofriendsApp = React.createElement();


