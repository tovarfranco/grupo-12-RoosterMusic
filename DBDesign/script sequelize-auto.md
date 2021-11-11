MY WAY TO USE sequelize-auto:

sequelize-auto will create the model files, and their relationships in another file called "init-models.js"
I create a temp folder like e.g. "automodels" at the same level as app.js and then I delete it.

Basically I use that code/files as a template, then paste/change them in the "real" model folder.

1) Create the temp folder for the models: e.g. "automodels", at the same level as app.js

2) Run this script using command prompt: (it is not neccesary to run the server first)
node_modules\.bin\sequelize-auto sequelize-auto -h localhost -d roosterMusic -u RoosterMusic -x UTNfra -p 3306 -e mysql -o "./automodels"

3) See the documentation here if needed: https://github.com/sequelize/sequelize-auto
There you have the command to run on Windows + parameters.

4) This will create some models in "automodels" folder. We have to pick these models, EDIT them and then place on the correct "models" folder.

5) EDIT: change the name of the alias if neccesary. => Convension: SINGULAR alias, and models.js.

6) There is an extra file "init-model". There are the relationships. We have to pick the relations and paste it on the correct model. Then we can delete this file.

7) Check the relationships: make sure to connect with the correct reference/table (look at the name/alias, have to use the new ones if you changed them). => Convesion: references in PLURAL if A has many B. SINGULAR if B belongs to only one A.

8) Make sure to export them (model.exports).