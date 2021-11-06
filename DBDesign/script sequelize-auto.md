MY WAY TO USE sequelize-auto:

sequelize-auto will create the model files, and their relationships in another file called "init-models.js"
I create a temp folder like e.g. "automodels" at the same level as app.js and then I delete it.

Basically I use that code/files as a template, then paste/change them in the "real" model folder.

1) Create the temp folder for the models: e.g. "automodels", at the same level as app.js

2) Run this script using command prompt: (it is not neccesary to run the server first)
node_modules\.bin\sequelize-auto sequelize-auto -h localhost -d roosterMusic -u RoosterMusic -x UTNfra -p 3306 -e mysql -o "./automodels"

3) See the documentation here if needed: https://github.com/sequelize/sequelize-auto
There you have the command to run on Windows + parameters.

4) Change the name of the alias if neccesary. => Convension: SINGULAR alias, and models.js.

5) Export it

6) Check the dependencies: make sure to connect with the correct reference (look at the name, have to use the new ones if you changed them). => Convesion: references in PLURAL if A has many B. SINGULAR if B belongs to only one A.