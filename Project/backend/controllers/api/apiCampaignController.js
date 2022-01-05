// =========== Require's ==============================
const path = require('path');                                                           // Manejo de rutas.

// =========== Modelo =================================
const Campaign = require('../../models/Campaign.model.js');

// =========== Controlador ============================
const apiCampaignController = {

    /*** Todas las categorias ***/
    index: async (req, res) => {

        /* Información de categorias */
        let campaignList = await Campaign.joinAllProduct();

        /* Modifico la información de Sequelize */
        campaignList.forEach(campaign => {
            campaign.dataValues.url = `api/campaigns/${campaign.id_campaign}`;
        });

        /* Genero respuesta */
        let response = {
            meta: {
                status: 200,
                total: campaignList.length,
                url: '/api/campaigns'
            },
            data: campaignList
        };

        res.json(response);
    },

    /*** Detalle de una categoria ***/
    detail: async (req, res) => {                                                       // ACA se pone el callback que sacamos de ROUTES. Este será el encargado de generar la respuesta.
        let campaignFound = await Campaign.findByPk(req.params.id);                     // findByPk devuelve un objeto directamente, no un array.       

        /* Modifico la información de Sequelize */
        campaignFound.dataValues.url = `/api/campaigns/${campaignFound.id_campaign}`;

        res.json(campaignFound);
    }
}

// =========== Exporto Controlador ===========================
module.exports = apiCampaignController                                                  // Siempre exportarlo porque lo necesitaremos usar en el ROUTES para que sepa a qué controlador enviar la petición.