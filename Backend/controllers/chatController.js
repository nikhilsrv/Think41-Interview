import mongoose from "mongoose";
import ConversationSession from "../models/conversationSessionModel.js";
import Message from  "../models/messageModel.js"
import Order from "../models/Order.js";
import { queryGrok } from "../grokClient.js";

const getAIResponse = async (prompt) => {
  return `You said: "${prompt}" — this is an AI response.`;
};


export const chat = async (req, res) => {
    const { userId, message, conversationId } = req.body;

    if (!userId || !message) {
        return res.status(400).json({ error: 'userId and message are required' });
    }
    
    const Session=await mongoose.startSession();

    Session.startTransaction()

    try {
        let session;

        // Use existing session or create a new one
        if (conversationId) {
            session = await ConversationSession.findById(conversationId);
            if (!session) {
                return res.status(404).json({ error: 'Conversation not found' });
            }
        } else {
            session = new ConversationSession({ user: userId });
            await session.save();
        }

        // Save user message
        const userMsg = new Message({
            session: session._id,
            sender: 'user',
            text: message
        });

        await userMsg.save({Session});

        // Get AI response (dummy here)
        const aiText = await getAIResponse(message);

        const aiMsg = new Message({
            session: session._id,
            sender: 'ai',
            text: aiText
        });


        await aiMsg.save({Session});

        // Update session activity timestamp
        session.last_activity_at = new Date();
        await session.save({Session});

        // Return full conversation
        const messages = await Message.find({ session: session._id }).sort({ timestamp: 1 });

        res.json({
            conversationId: session._id,
            messages
        });

        Session.commitTransaction()

    } catch (err) {
        console.error('Chat error:', err);
        Session.abortTransaction()
        res.status(500).json({ error: 'Internal server error' });
    }

}



export const query = async (req, res) => {
  const { userId, message, conversationId } = req.body;

  const systemPrompt = `
You are Grok, an intelligent assistant helping users fetch order data.
If the user question is vague or lacks filters (like status or date), ask a clarifying question.
If the query is clear, respond strictly in this JSON format:

{
  "action": "query",
  "filter": {
    "status": "...",
    "createdAt": { "$gte": "...", "$lte": "..." }
  }
}
`;

  try {
    const aiResponse = await queryGrok({
      systemPrompt,
      userMessage: message,
    });

    try {
      const parsed = JSON.parse(aiResponse);
      if (parsed.action === "query") {
        const orders = await Order.find(parsed.filter).limit(20);
        return res.json({ type: "results", data: orders });
      }
    } catch (e) {
      // Not JSON = clarification or natural text
      return res.json({ type: "clarification", message: aiResponse });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "LLM failure" });
  }
}

