// =========== Require's ==============================
const path = require('path');                                                           // Manejo de rutas.

// =========== Modelo =================================
const Campaign = require('../../models/Campaign.model.js');

// =========== Controlador ============================
const apiCampaignController = {

    /*** Todas las campañas ***/
    index: async (req, res) => {

        /* Información de campañas */
        let campaignList = await Campaign.joinAllProduct();

        /* Modifico la información de Sequelize */
        campaignList.forEach(campaign => {
            campaign.dataValues.url = `${req.protocol}://${req.get('host')}${req.originalUrl}/${campaign.id_campaign}`;
        });

        /* Genero respuesta */
        let response = {
            meta: {
                status: 200,
                total: campaignList.length,
                url: `${req.protocol}://${req.get('host')}${req.originalUrl}`
            },
            data: campaignList
        };

        res.json(response);
    },

    /*** Detalle de una campaña ***/
    detail: async (req, res) => {                                                       // ACA se pone el callback que sacamos de ROUTES. Este será el encargado de generar la respuesta.
        let campaignFound = await Campaign.findByPk(req.params.id);                     // findByPk devuelve un objeto directamente, no un array.       

        if (campaignFound) {                                                            // Si no es nulo... (Sequelize devuelve nulo si no lo encuentra).
            /* Modifico la información de Sequelize */
            campaignFound.dataValues.url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
        } else {
            campaignFound = [];
        };

        res.json(campaignFound);
    }
}

// =========== Exporto Controlador ===========================
module.exports = apiCampaignController                                                  // Siempre exportarlo porque lo necesitaremos usar en el ROUTES para que sepa a qué controlador enviar la petición.