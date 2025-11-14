import React, { useState } from "react";
import "./AdvisoryFAB.css";
import FABicon3 from "../../assets/FABicon3.png";
const VALID_KEYWORDS = [
  // Core Agriculture
  "agriculture", "farming", "farm", "farmer", "field",
  "crop", "crops", "cash crop", "mixed cropping", "crop rotation",
  "harvest", "yield", "sowing", "planting", "cultivation",
  "germination", "transplanting", "weeding",

  // Soil
  "soil", "soil health", "soil fertility", "soil moisture",
  "topsoil", "clay", "sandy soil", "loamy soil",
  "soil erosion", "soil pH", "soil testing",

  // Weather & Climate
  "weather", "rain", "rainfall", "sunlight", "humidity",
  "temperature", "heatwave", "cold wave", "fog",
  "drought", "flood", "hailstorm", "wind speed",
  "climate", "monsoon", "season",

  // Irrigation
  "irrigation", "drip irrigation", "sprinkler irrigation",
  "water supply", "watering", "canal", "borewell",
  "waterlogging", "water conservation",

  // Fertilizers
  "fertilizer", "fertilizers", "organic fertilizer",
  "chemical fertilizer", "compost", "manure",
  "nitrogen", "phosphorus", "potassium",
  "NPK", "urea", "DAP", "micronutrients",

  // Pests & Diseases
  "pest", "pests", "insects", "infestation",
  "locust", "aphids", "whitefly", "bollworm",
  "mite", "fungus", "fungal infection",
  "disease", "plant disease", "blight",
  "rust", "wilt", "mosaic virus",

  // Seeds
  "seed", "seeds", "hybrid seeds", "germination rate",
  "seed treatment", "seed quality",

  // Machinery & Equipment
  "tractor", "harvester", "plough", "tiller",
  "seed drill", "sprayer", "thresher", "rotavator",
  "farm machinery", "equipment",

  // Water & Nutrition
  "water", "irrigation water", "nutrients",
  "fertigation", "mulching",

  // Land & Field Management
  "land preparation", "tillage", "intercropping",
  "field management", "farm management",
  "soil conservation", "contour farming",

  // Crops (specific)
  "wheat", "rice", "paddy", "maize", "corn",
  "sugarcane", "cotton", "millet", "jowar",
  "bajra", "barley", "soybean", "mustard",
  "groundnut", "potato", "tomato", "onion",
  "vegetables", "fruits", "horticulture",

  // Plant Protection
  "pesticide", "fungicide", "herbicide",
  "insecticide", "weed control", "crop protection",

  // Sustainable Farming
  "organic farming", "sustainable farming",
  "natural farming", "zero budget farming",
  "composting", "vermicompost",

  // Advisory related
  "alert", "warning", "advisory", "forecast",
  "recommendation", "guidance", "farm advisory",

  // Environment
  "greenhouse gas", "carbon emissions",
  "soil carbon", "biodiversity",

  // Harvest & Post-Harvest
  "threshing", "drying", "storage",
  "warehouse", "mandi", "market price",

  // Livestock (optional but agriculture-related)
  "dairy", "milk", "cattle", "buffalo",
  "livestock", "poultry", "goat farming",

  // Sensors & Tech
  "sensor", "soil sensor", "IoT", "drone",
  "precision farming", "kisan", "agritech",

  // Water stress / plant conditions
  "water stress", "nutrient deficiency",
  "crop stress", "leaf yellowing"
];


export default function AdvisoryFAB({ onAdvisory }) {
  const [isOpen, setIsOpen] = useState(false);
  const [popupClosing, setPopupClosing] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const closePopup = () => {
    setPopupClosing(true);

    setTimeout(() => {
      setIsOpen(false);
      setPopupClosing(false);
    }, 250); // fadeDown duration
  };

  const handleSubmit = () => {
    const lower = text.toLowerCase();
    const isValid = VALID_KEYWORDS.some((kw) => lower.includes(kw));

    if (isValid) {
      if (onAdvisory) onAdvisory(text);

      setText("");
      setError("");
      closePopup();   // smooth fade-out
    } else {
      setError("❌ Message rejected — no valid agricultural keywords found.");
    }
  };

  return (
    <>
      {isOpen && (
        <div className={`advisory-popup ${popupClosing ? "fade-out" : ""}`}>
          <h3>Advisory Message</h3>

          <textarea
            className="advisory-textarea"
            placeholder="Write advisory to farmers..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {error && <p className="advisory-error">{error}</p>}

          <button className="send-btn" onClick={handleSubmit}>
            Send
          </button>
        </div>
      )}
<div className="fab-container">
  <button
    className="fab-button"
    onClick={() => {
      if (isOpen) closePopup();
      else setIsOpen(true);
    }}
  >
    {/* FAB Image */}
    <img
      src={FABicon3}
      alt="fab icon"
      className={`fab-icon fade-icon ${!isOpen ? "show" : "hide"}`}
    />

    {/* Close Icon */}
    <span className={`fab-close fade-icon ${isOpen ? "show" : "hide"}`}>
      ✖
    </span>
  </button>
</div>

    </>
  );
}
