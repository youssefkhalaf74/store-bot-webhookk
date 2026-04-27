const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    const intentName = req.body.queryResult.intent.displayName;
    const parameters = req.body.queryResult.parameters;
    let responseText = "";

    // 1. منطق أسعار الألعاب
    if (intentName === 'Order_Games_Payment') {
        const game = parameters.game_name;
        const type = parameters.account_type;
        
        const gamePrices = {
            'FC 26': { 'Secondary': 550, 'Primary': 1050, 'Full Account': 2800 },
            'GTA V': { 'Secondary': 250, 'Primary': 450, 'Full Account': 1300 },
            'Elden Ring': { 'Secondary': 400, 'Primary': 780, 'Full Account': 2300 },
            'Spider-Man 2': { 'Secondary': 450, 'Primary': 900, 'Full Account': 2500 },
            'Black Myth Wukong': { 'Secondary': 400, 'Primary': 780, 'Full Account': 2100 },
            'Cyberpunk 2077': { 'Secondary': 350, 'Primary': 680, 'Full Account': 1900 },
            'Red Dead 2': { 'Secondary': 250, 'Primary': 450, 'Full Account': 1300 },
            'Call of Duty BO6': { 'Secondary': 550, 'Primary': 1050, 'Full Account': 2700 },
            'Hogwarts Legacy': { 'Secondary': 400, 'Primary': 780, 'Full Account': 2100 },
            'AC Shadows': { 'Secondary': 550, 'Primary': 1050, 'Full Account': 2700 },
            'Silent Hill 2': { 'Secondary': 450, 'Primary': 900, 'Full Account': 2300 },
            'Tekken 8': { 'Secondary': 450, 'Primary': 900, 'Full Account': 2500 },
            'Street Fighter 6': { 'Secondary': 400, 'Primary': 780, 'Full Account': 2100 },
            'Mortal Kombat 1': { 'Secondary': 400, 'Primary': 780, 'Full Account': 2100 },
            'Ghost of Tsushima': { 'Secondary': 350, 'Primary': 680, 'Full Account': 1900 },
            'Alan Wake 2': { 'Secondary': 350, 'Primary': 680, 'Full Account': 1900 },
            'Batman Collection': { 'Secondary': 250, 'Primary': 450, 'Full Account': 1300 },
            'The Last of Us 2': { 'Secondary': 300, 'Primary': 580, 'Full Account': 1600 }
        };

        if (gamePrices[game] && gamePrices[game][type]) {
            responseText = `The price for ${game} (${type}) is ${gamePrices[game][type]} EGP. 🎮 Would you like to proceed?`;
        } else {
            responseText = `I found ${game}, but please specify the account type (Primary, Secondary, or Full Account).`;
        }
    } 

    // 2. منطق أسعار البلس
    else if (intentName === 'Order_Plus_Payment') {
        const tier = parameters.plus_tier;
        const period = String(parameters.subscription_period);
        
        const plusPrices = {
            'Essential': { '1': 200, '3': 450, '12': 1600 },
            'Extra': { '1': 300, '3': 700, '12': 3000 },
            'Deluxe': { '1': 350, '3': 850, '12': 3600 }
        };

        if (plusPrices[tier] && plusPrices[tier][period]) {
            responseText = `The ${tier} subscription for ${period} month(s) costs ${plusPrices[tier][period]} EGP. 🚀 Ready to upgrade?`;
        } else {
            responseText = "Please specify the Plus tier (Essential, Extra, Deluxe) and the duration (1, 3, or 12 months).";
        }
    }

    // 3. منطق كروت الستور
    else if (intentName === 'Order_Cards_Payment') {
        const usd = String(parameters.usd_amount);
        const cardPrices = { '5': 280, '10': 550, '20': 1090, '25': 1360, '45': 2450, '50': 2720, '60': 3250, '75': 4050, '100': 5400 };

        if (cardPrices[usd]) {
            responseText = `The $${usd} Gift Card price is ${cardPrices[usd]} EGP. ✅`;
        } else {
            responseText = "We have cards from $5 to $100. Which one do you need?";
        }
    }

    res.json({ fulfillmentText: responseText });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
