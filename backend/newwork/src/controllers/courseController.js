const {CLIENT_SECRET,CLIENT_ID}=require('../config/serverconfig')
const axios= require('axios')

const fetchCourses = async (req, res) => {
  const { keyword } = req.query;

  if (!keyword) {
    return res.status(400).json({ error: "Keyword is required." });
  }

  try {
    // Udemy API URL
    const apiUrl = `https://www.udemy.com/api-2.0/courses/?search=${encodeURIComponent(
      keyword
    )}&page_size=5`;

    // Make a request to Udemy API
    const response = await axios.get(apiUrl, {
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Basic ${Buffer.from(
          `${CLIENT_ID}:${CLIENT_SECRET}`
        ).toString("base64")}`,
      },
    });
    console.log(response.data.results);
    
    res.json(response.data.results);
  } catch (error) {
    console.error("Error fetching courses:", error.message);
    res.status(500).json({ error: "Failed to fetch courses from Udemy API." });
  }
};

module.exports = { fetchCourses };