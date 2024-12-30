const admin = require('firebase-admin')
const db = admin.firestore();
const { Telegraf } = require('telegraf'); // Librería para enviar mensajes a Telegram.
// const axios = require('axios');


const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);



exports.handleIdealistaWebhook = async (req, res) => {
    try {
//         const data = req.body; // Datos enviados por Idealista.
        
//         // Obtén filtros desde la base de datos.
//         const filtersSnapshot = await db.collection('filters').get();
//         const filters = filtersSnapshot.docs.map(doc => doc.data());

//         // Filtra anuncios según tus parámetros.
//         const filteredAds = data.ads.filter(ad => {
//             return filters.some(filter => 
//                 ad.price >= filter.minPrice &&
//                 ad.price <= filter.maxPrice &&
//                 ad.location.includes(filter.location)
//             );
//         });

//         // Enviar los anuncios filtrados al bot de Telegram.
//         for (const ad of filteredAds) {
//             const message = `
// 📍 *${ad.title}*  
// 💶 Precio: ${ad.price} €  
// 📏 Tamaño: ${ad.size} m²  
// 📍 Ubicación: ${ad.location}  
// 🔗 [Ver anuncio](${ad.url})
//             `;

//             await bot.telegram.sendMessage(process.env.TELEGRAM_CHAT_ID, message, { parse_mode: 'Markdown' });
//         }
        await bot.telegram.sendMessage(process.env.TELEGRAM_CHAT_ID, 'prueba', { parse_mode: 'Markdown' });

        res.status(200).send('Anuncios procesados');
    } catch (error) {
        console.error('Error al procesar el webhook:', error);
        res.status(500).send('Error interno');
    }
};