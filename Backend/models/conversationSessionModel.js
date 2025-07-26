import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  title: {
    type: String,
    default: 'Untitled Conversation'
  },
  started_at: {
    type: Date,
    default: Date.now
  },
  last_activity_at: {
    type: Date,
    default: Date.now
  }
});

const ConversationSession = mongoose.model('ConversationSession', sessionSchema);
export default ConversationSession;
