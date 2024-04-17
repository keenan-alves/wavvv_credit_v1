const fetch = require("node-fetch");

// Your Spotify API credentials
// make an env file before git commit
const CLIENT_ID = "";
const CLIENT_SECRET = "";
const AUTH_URL = "https://accounts.spotify.com/api/token";

// Obtain an access token
async function getAccessToken(clientId, clientSecret) {
  const response = await fetch(AUTH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  const data = await response.json();
  return data.access_token;
}

// Function to get artist streams and name
async function getArtistInfo(artistId, accessToken) {
  const response = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await response.json();
  const streams = data.followers.total; // Total number of followers
  const artistName = data.name; // Artist name
  return { artistName, streams };
}

async function main() {
  const artistId = "7GuUYiGZOzQwq4L6gAfy1T";
  const accessToken = await getAccessToken(CLIENT_ID, CLIENT_SECRET);
  const { artistName, streams } = await getArtistInfo(artistId, accessToken);
  console.log(`Artist: ${artistName}, Streams: ${streams}`);
}

main();
