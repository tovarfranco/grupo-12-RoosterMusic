# Grupo 12
## DigitalHouse - Fullstack

This readme describes the usage of this project and all the requirements to run it.

#  Express Server

Here you will find the steps to run this NodeJS project.

### Installation 🔧

Follow this steps:

1. Download or clone this project (entire repository) to your local disk.
2. Move to this folder (Project/backend).
3. Open the command prompt (cmd, bash or VSC). For development you can open the folder in VSC with cmd or bash using: ```code .``` 
4. Install the dependencies running this command:
    ```npm install```
5. Intall the DB script ***roosterMusic.sql*** to create the DB and its data. MySQL version: **8.0.20**

### Run 🎮
6. To start the aplication run: ```npm start```  
You can use ```node bin/www``` or ```nodemon bin/www``` (automatic server restart for development) as well.
7. Go to the webrowser and enjoy (uses port **3000**):
    - http://localhost:3000/ (index page)
8. You can use the {user: admin@hotmail.com, password: admin123} to use the website as a valid user.
9. To stop the execution, use: ```Ctrl + C```

*Note: frontend project uses port 3001 as 3000 is used by this backend project. To run the frontend project you have to run only ```npm start``` on its corresponding folder (read frontend README.md for more information).*

### Production 🔗

* Website: https://roostermusic.net/ (backend project)
* Dashboard: https://dashboard.roostermusic.net/ (frontend project, read frontend README.md for more information)

*Note: these are the current websites. The domain could change or expire. Hosted in AWS.*

## Built with 🛠️

* [Express](https://www.npmjs.com/package/express) -  NodeJS Framework

## Author ✒️

* **Rooster Music** - *Creator* - [rooster-music-git](https://github.com/tovarfranco/grupo-12-RoosterMusic)