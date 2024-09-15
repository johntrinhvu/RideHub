const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/calculate-multiplier', async (req, res) => {
    const { travelTime, distance, timeOfDay } = req.body;

    const openaiRequest = {
        model: 'gpt-4',
        messages: [
            { role: 'system', content: 'You are a pricing AI that calculates the best multiplier for ride-sharing pricing.' },
            {
                role: 'user',
                content: `The ride has a duration of ${travelTime} seconds, distance of ${distance} km, and the current time is ${timeOfDay}. Suggest a pricing multiplier based on this information.`
            },
        ]
    };

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', openaiRequest, {
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const multiplier = response.data.choices[0].message.content;

        res.json({ multiplier: parseFloat(multiplier) });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching multiplier from AI' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
