MY WAY TO USE sequelize-auto:

sequelize-auto will create the model files, and their relationships in another file called "init-models.js"
I create a temp folder like e.g. "automodels" at the same level as app.js and then I delete it.

Basically I use that code/files as a template, then paste/change them in the "real" model folder.

1) Create the temp folder for the models: e.g. "automodels", at the same level as app.js

2) Run this script using command prompt:
node_modules\.bin\sequelize-auto sequelize-auto -h localhost -d roosterMusic -u RoosterMusic -x UTNfra -p 3306 -e mysql -o "./automodels"

3) See the documentation here if needed: https://github.com/sequelize/sequelize-auto
There you have the command to run on Windows + parameters.