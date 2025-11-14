import React, { useState } from "react";
import "./AdvisoryFAB.css";
import { getDatabase, ref, set } from "firebase/database";
import FABicon3 from "../../assets/FABicon3.png";
const VALID_KEYWORDS = [

  // ---------------- CORE AGRICULTURE ----------------
  "agriculture", "farming", "farm", "farmer", "fields", "farmland",
  "crop", "crops", "cropping", "cropland", "crop rotation",
  "mixed cropping", "intercropping", "sowing", "planting",
  "cultivation", "germination", "transplanting", "weeding",
  "harvest", "harvesting", "yield", "productivity",

  // ---------------- WEATHER & HAZARDS ----------------
  "weather", "climate", "forecast", "meteo", "temperature",
  "heat", "heatwave", "cold wave", "coldwave", "fog",
  "humidity", "rain", "rainfall", "monsoon", "clouds",
  "sunlight", "solar radiation", "wind", "wind speed",
  "storm", "thunderstorm", "lightning", "hailstorm",
  "flood", "flash flood", "drought",
  "cyclone", "hurricane", "typhoon",
  "low pressure", "pressure system", "windstorm",
  "precipitation", "moisture", "evaporation",
  "drought stress", "heat stress", "cold stress",
  "dew", "fog", "visibility", "dust storm",

  // ---------------- SOIL ----------------
  "soil", "soil health", "soil fertility", "soil moisture",
  "soil type", "topsoil", "subsoil", "clay", "sandy soil",
  "loamy soil", "red soil", "black soil", "alluvial soil",
  "soil erosion", "soil structure", "soil pH",
  "soil testing", "soil nutrients", "soil amendment",
  "salinity", "alkalinity", "acidity", "soil carbon",

  // ---------------- FERTILIZERS ----------------
  "fertilizer", "fertilizers", "organic fertilizer",
  "chemical fertilizer", "compost", "manure", "cow dung",
  "biofertilizer", "vermicompost", "green manure",
  "NPK", "urea", "DAP", "SSP", "MOP",
  "nitrogen", "phosphorus", "potassium",
  "micronutrients", "zinc", "boron", "magnesium",
  "foliar spray", "fertigation",

  // ---------------- IRRIGATION ----------------
  "irrigation", "watering", "drip irrigation",
  "sprinkler irrigation", "micro irrigation",
  "canal water", "borewell", "tube well", "well",
  "water supply", "waterlogging", "drainage",
  "water conservation", "rainwater harvesting",

  // ---------------- PESTS & DISEASES ----------------
  "pest", "pests", "insects", "infestation",
  "larvae", "parasite", "insect attack",
  "locust", "aphids", "whitefly", "bollworm",
  "stem borer", "armyworm", "mite", "thrips",
  "fungus", "fungal", "mildew", "powdery mildew",
  "blight", "leaf spot", "rust", "wilt",
  "mosaic virus", "bacterial", "viral disease",
  "crop disease", "plant disease",

  // ---------------- SEEDS ----------------
  "seed", "seeds", "hybrid seed", "germination rate",
  "seed quality", "seed treatment", "certified seed",

  // ---------------- FIELD OPERATIONS ----------------
  "land preparation", "tillage", "ploughing",
  "deep ploughing", "levelling", "bunding",
  "mulching", "debudding", "pruning",
  "field management", "crop management",

  // ---------------- MACHINERY ----------------
  "tractor", "harvester", "combine",
  "plough", "tiller", "cultivator",
  "seed drill", "sprayer", "thresher",
  "rotavator", "farm machinery", "equipment",

  // ---------------- NUTRITION ----------------
  "nutrients", "deficiency", "fertigation",
  "mulching", "plant nutrition", "soil nutrition",
  "leaf yellowing", "chlorosis",

  // ---------------- SPECIFIC CROPS ----------------
  "wheat", "rice", "paddy", "maize", "corn",
  "sugarcane", "cotton", "millet", "jowar",
  "bajra", "barley", "soybean", "mustard",
  "groundnut", "potato", "tomato", "onion",
  "ginger", "garlic", "turmeric",
  "banana", "mango", "papaya", "guava",
  "horticulture", "vegetables", "fruits",

  // ---------------- PLANT PROTECTION ----------------
  "pesticide", "insecticide", "fungicide",
  "herbicide", "weed control", "crop protection",
  "spray", "sprayer", "plant protection",

  // ---------------- SUSTAINABLE FARMING ----------------
  "organic farming", "natural farming",
  "sustainable farming", "zero budget farming",
  "eco-friendly", "biodiversity",

  // ---------------- ADVISORY & RISK ----------------
  "alert", "warning", "advisory", "farm advisory",
  "guidance", "recommendation",
  "risk", "hazard", "disaster", "forecasting",

  // ---------------- ENVIRONMENT ----------------
  "greenhouse gas", "carbon emissions",
  "soil carbon", "biodiversity", "ecosystem",
  "pollution", "air quality",

  // ---------------- POST HARVEST ----------------
  "threshing", "drying", "storage", "warehouse",
  "mandi", "market", "market rate", "market price",

  // ---------------- LIVESTOCK ----------------
  "livestock", "dairy", "cattle", "buffalo",
  "poultry", "goat farming", "sheep", "fodder",

  // ---------------- AGRI TECH ----------------
  "sensor", "soil sensor", "temperature sensor",
  "humidity sensor", "IoT", "drone", "UAV",
  "automation", "precision farming", "smart farming",
  "agritech", "digital agriculture",

  // ---------------- WATER STRESS ----------------
  "water stress", "nutrient deficiency",
  "crop stress", "plant stress",

  // ---------------- DISASTER-SPECIFIC ----------------
  "cyclone alert", "cyclonic storm", "severe cyclone",
  "super cyclone", "gale winds", "storm surge",
  "landfall", "orange alert", "red alert",
  "IMD", "heavy rain alert", "very heavy rain",
  "extremely heavy rain", "lightning alert"

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
    const db = getDatabase();
    set(ref(db, "advisory/latest"), {
      message: text,
      timestamp: Date.now(),
    });

    if (onAdvisory) onAdvisory(text);

    setText("");
    setError("");
    setIsOpen(false);
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
