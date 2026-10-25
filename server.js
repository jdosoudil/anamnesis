require("dotenv").config();

const express = require("express");
const path = require("path");
const fs = require("fs");
const OpenAI = require("openai");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend/build")));

app.get("/:lang(en|fr|it|cs|de)?", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build/index.html"));
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG_ID
});

const promptIds = {
  en: process.env.PROMPT_ID_EN,
  fr: process.env.PROMPT_ID_FR || process.env.PROMPT_EN_ID,
  it: process.env.PROMPT_ID_IT || process.env.PROMPT_EN_ID,
  cs: process.env.PROMPT_ID_CS || process.env.PROMPT_EN_ID,
  de: process.env.PROMPT_ID_DE || process.env.PROMPT_EN_ID
};

app.listen(8080, () => {
  console.log("Server is active on http://localhost:8080");
});

function getLangFromPath(req) {
  const lang = req.path.split("/")[1];
  return ["en", "fr", "it", "cs", "de"].includes(lang) ? lang : "en";
}

function mapFrontendMessagesToResponsesInput(messages) {
  if (!Array.isArray(messages)) {
    return [];
  }

  return messages
    .filter(m => m && typeof m.text === "string" && m.text.trim() !== "")
    .map(m => ({
      role: m.author === "Anamnesis" ? "assistant" : "user",
      content: m.text
    }));
}

async function saveToFile(req, res) {
  try {
    const FILENAME = "./messages.txt";
    const MESSAGE_HEADER =
      "\n\n======================================\n\n" +
      new Date().toISOString() +
      "\n\n";

    const messageSession = req.body.messageSession;

    if (!messageSession || typeof messageSession !== "string") {
      throw new Error("Message session is empty.");
    }

    const stream = fs.createWriteStream(FILENAME, { flags: "a" });
    stream.write(MESSAGE_HEADER + messageSession);
    stream.end();

    res.status(200).json({ message: "Success" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}

app.post("/en/save-to-file", saveToFile);
app.post("/fr/save-to-file", saveToFile);
app.post("/it/save-to-file", saveToFile);
app.post("/cs/save-to-file", saveToFile);
app.post("/de/save-to-file", saveToFile);

async function chat(req, res) {
  try {
    const lang = getLangFromPath(req);
    const promptId = promptIds[lang];

    if (!promptId) {
      return res.status(500).json({ message: `Prompt ID is not configured for language "${lang}".` });
    }

    const latestMessage = req.body.message;
    const incomingMessages = req.body.messages;

    let input;

    if (Array.isArray(incomingMessages) && incomingMessages.length > 0) {
      input = mapFrontendMessagesToResponsesInput(incomingMessages);
    } else if (typeof latestMessage === "string" && latestMessage.trim() !== "") {
      input = [
        {
          role: "user",
          content: latestMessage
        }
      ];
    } else {
      return res.status(400).json({ message: "Missing message." });
    }

    console.log("Before OpenAI call");
    console.log("Prompt ID:", promptId);
    console.log("Input:", JSON.stringify(input, null, 2));

    const response = await openai.responses.create({
        prompt: {
            id: promptId,
            version: "1"
        },
        input
    });

    console.log("After OpenAI call");
    console.dir(response, { depth: 6 });

    const responseText = response.output_text || "";

    res.status(200).json({
      message: responseText
    });
  } catch (e) {
    console.error("CHAT ERROR:", e);

    res.status(500).json({
      message: e?.message || "Unknown server error."
    });
  }
}

app.post("/en/chat", chat);
app.post("/fr/chat", chat);
app.post("/it/chat", chat);
app.post("/cs/chat", chat);
app.post("/de/chat", chat);