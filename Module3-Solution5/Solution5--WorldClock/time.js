const express = require("express");
const app = express();
const axios = require("axios");
const path = require("path");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Fetch time data for European cities
async function getTime(city) {
  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=623d8bd8a9044d87acc55246240209&q=${city}&aqi=yes`
    );
    const { name, country, localtime } = response.data.location;
    const timePart = localtime.split(" ")[1]; // Extract time

    return {
      name: name,
      country: country,
      localtime: timePart,
    };
  } catch (error) {
    console.error("Error:", error.message);
    return { error: error.message }; // Return error object
  }
}

const cities = [
  "Mumbai",
  "Paris",
  "London",
  "Rome",
  "Berlin",
  "Madrid",
  "Vienna",
  "Amsterdam",
  "Copenhagen",
  "Dublin",
  "Lisbon",
  "Prague",
  "Budapest",
  "Athens",
  "Stockholm",
  "Helsinki",
  "Oslo",
  "Warsaw",
  "Tokyo",
  "Seoul",
  "Shanghai",
  "Singapore",
  "Hong Kong",
  "Bangkok",
  "Jakarta",
  "Manila",
  "Ho Chi Minh City",
  "Dubai",
  "Abu Dhabi",
  "Istanbul",
  "Riyadh",
  "Jerusalem",
  "New York City",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Diego",
  "Dallas",
  "Austin",
  "Boston",
  "Washington, D.C.",
  "Seattle",
  "Mexico City",
  "Buenos Aires",
  "Rio de Janeiro",
  "Havana",
  "Toronto",
  "Montreal",
  "Vancouver",
  "Sydney",
  "Melbourne",
  "Brisbane",
  "Adelaide",
  "Auckland",
  "Wellington",
  "Barcelona",
  "Zurich",
  "Moscow",
  "Kuala Lumpur",
  "Bangalore",
  "Cape Town",
  "Johannesburg",
  "Brussels",
  "Cairo",
  "Chennai",
  "Munich",
  "Vienna",
  "Beijing",
  "Kathmandu",
  "Colombo"
];

app.get("/", async (req, res) => {
  try {
    const newData = await Promise.all(cities.map((city) => getTime(city)));

    res.render("time2", { key: newData });
  } catch (error) {
    console.error("Error rendering page:", error.message);
    res.status(500).send("An error occurred while fetching time data.");
  }
});

app.listen(9000, () => {
  console.log("Server started on http://localhost:9000");
});
