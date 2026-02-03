const fetch = require('node-fetch');
const crypto = require('crypto');

const generateUploadSignature = (libraryId, apiKey, videoId, expirationTime) => {
    const input = libraryId + apiKey + expirationTime + videoId;
    return crypto.createHash('sha256').update(input).digest('hex');
};

const createBunnyUploadSession = async (title) => {
    const libraryId = process.env.BUNNY_LIBRARY_ID;
    const apiKey = process.env.BUNNY_API_KEY;

    try {
        // 1. Create a video object in Bunny Stream
        const createRes = await fetch(`https://video.bunnycdn.com/library/${libraryId}/videos`, {
            method: 'POST',
            headers: {
                'AccessKey': apiKey,
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({ title })
        });

        if (!createRes.ok) {
            const errorData = await createRes.json();
            throw new Error(`Bunny API error: ${errorData.message || createRes.statusText}`);
        }

        const videoData = await createRes.json();
        const videoId = videoData.guid;

        // 2. Generate signature for direct upload
        // Set expiration to 1 hour from now
        const expirationTime = Math.floor(Date.now() / 1000) + 3600;
        const signature = generateUploadSignature(libraryId, apiKey, videoId, expirationTime);

        // The upload URL for Bunny Stream is usually this format
        const uploadUrl = `https://video.bunnycdn.com/library/${libraryId}/videos/${videoId}`;

        return {
            uploadUrl,
            videoId,
            libraryId,
            signature,
            expiration: expirationTime
        };
    } catch (err) {
        console.error('Bunny API Error:', err);
        throw new Error(`Failed to create Bunny upload session: ${err.message}`);
    }
};

module.exports = { createBunnyUploadSession };

