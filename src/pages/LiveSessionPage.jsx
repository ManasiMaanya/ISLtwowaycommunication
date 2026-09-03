import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Video,
  Volume2,
  Sparkles,
  ArrowLeft,
  Send,
  RefreshCw,
  Eye,
  Sliders,
  CheckCircle2,
  Globe,
  Radio,
  Share2
} from 'lucide-react';
import { PageHeader } from '../components/navigation/PageHeader';
import { VideoPanel } from '../components/session/VideoPanel';
import { ISLIndicator } from '../components/session/ISLIndicator';
import { AITranslationCard } from '../components/session/AITranslationCard';
import { ChatBubble } from '../components/session/ChatBubble';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { InputField } from '../components/common/InputField';
import { useToast } from '../components/common/Toast';

const VOCABULARY_LIST = [
  { gloss: 'HELLO', en: 'Hello! Good to see you.', gu: 'નમસ્તે! તમને મળીને આનંદ થયો.' },
  { gloss: 'THANK YOU', en: 'Thank you very much.', gu: 'તમારો ખૂબ ખૂબ આભાર.' },
  { gloss: 'CLASSROOM', en: 'Is this the classroom?', gu: 'શું આ વર્ગખંડ છે?' },
  { gloss: 'GUJARAT', en: 'I am from Gujarat.', gu: 'હું ગુજરાતનો છું.' },
  { gloss: 'HELP', en: 'I need assistance, please.', gu: 'મને મદદની જરૂર છે.' },
  { gloss: 'WATER', en: 'May I drink some water?', gu: 'શું હું પાણી પી શકું?' },
  { gloss: 'TEACHER', en: 'The teacher explained the concept clearly.', gu: 'શિક્ષકે વિચાર સ્પષ્ટપણે સમજાવ્યો.' },
  { gloss: 'STUDENT', en: 'We are students studying together.', gu: 'અમે સાથે અભ્યાસ કરતા વિદ્યાર્થીઓ છીએ.' },
  { gloss: 'PLEASE', en: 'Please speak slowly.', gu: 'કૃપા કરીને ધીમેથી બોલો.' },
  { gloss: 'YES', en: 'Yes, I understand completely.', gu: 'હા, હું સંપૂર્ણપણે સમજી ગયો છું.' },
  { gloss: 'NO', en: 'No, I have a question.', gu: 'ના, મારો એક પ્રશ્ન છે.' },
  { gloss: 'QUESTION', en: 'I have a question about the assignment.', gu: 'મને સ્વાધ્યાય વિશે એક પ્રશ્ન છે.' },
];

export function LiveSessionPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [currentSign, setCurrentSign] = useState(VOCABULARY_LIST[0]);
  const [showLandmarks, setShowLandmarks] = useState(true);
  const [recognitionConfidence, setRecognitionConfidence] = useState(96);
  const [recognitionState, setRecognitionState] = useState('recognized'); // 'recognized' | 'detecting'
  const [textInputFallback, setTextInputFallback] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      senderName: 'Dr. Radhika Patel',
      senderRole: 'hearing',
      text: 'Good morning Aarav! We are discussing today’s acoustics demo.',
      timestamp: '10:42 AM'
    },
    {
      id: 2,
      senderName: 'Aarav Mehta',
      senderRole: 'signer',
      gloss: 'HELLO',
      text: 'Hello! Good to see you.',
      gujaratiText: 'નમસ્તે! તમને મળીને આનંદ થયો.',
      confidence: 96,
      timestamp: '10:43 AM'
    }
  ]);

  const handleSimulateGesture = (item) => {
    setRecognitionState('detecting');
    setRecognitionConfidence(78);

    setTimeout(() => {
      setCurrentSign(item);
      const conf = Math.floor(Math.random() * 8) + 92;
      setRecognitionConfidence(conf);
      setRecognitionState('recognized');

      // Auto add to chat stream
      const newMsg = {
        id: Date.now(),
        senderName: 'Aarav Mehta',
        senderRole: 'signer',
        gloss: item.gloss,
        text: item.en,
        gujaratiText: item.gu,
        confidence: conf,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages((prev) => [...prev, newMsg]);

      // Trigger Web Speech synthesis
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(item.en);
        utterance.rate = 0.95;
        window.speechSynthesis.speak(utterance);
      }

      addToast({
        title: `Sign Recognized: [${item.gloss}]`,
        message: `Translated to English & Gujarati with ${conf}% confidence.`,
        type: 'recognition'
      });
    }, 450);
  };

  const handleSendManualReply = (e) => {
    e.preventDefault();
    if (!textInputFallback.trim()) return;

    const newMsg = {
      id: Date.now(),
      senderName: 'Dr. Radhika Patel',
      senderRole: 'hearing',
      text: textInputFallback,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setTextInputFallback('');
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="container-wide py-6">
      {/* Session Top Bar */}
      <div className="flex flex-col md-flex-row md-items-center justify-between gap-4 pb-4 mb-6 border-b border-subtle">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            icon={<ArrowLeft size={16} />}
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </Button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-bold text-primary">
                Live Bridge Room: {id || 'Classroom-Demo'}
              </h1>
              <span className="pulse-mint inline-block w-2.5 h-2.5 rounded-full bg-mint-400" />
            </div>
            <p className="text-xs text-muted mt-0.5">
              Two-Way Communication: Aarav Mehta (Signer) ⟷ Dr. Radhika Patel (Hearing)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="mint">
            <Radio size={12} className="mr-1" />
            FastAPI Relay Online
          </Badge>
          <Badge variant="coral">Closed-Vocab (~20)</Badge>
          <Button
            variant="outline"
            size="sm"
            icon={<Share2 size={14} />}
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              addToast({ title: 'Link copied!', message: 'Session link copied to clipboard.', type: 'info' });
            }}
          >
            Invite Peer
          </Button>
        </div>
      </div>

      {/* Main Dual Grid: Left Video & Landmarks | Right Captions & Chat */}
      <div className="grid grid-cols-1 lg-grid-cols-12 gap-6">
        {/* Left Column (7 cols): Video Panel & Sign Recognition Controls */}
        <div className="lg-col-span-7 flex flex-col gap-5">
          {/* Main Signer Video with MediaPipe Landmarks */}
          <VideoPanel
            title="Signer Camera (Aarav Mehta)"
            isSigner={true}
            showLandmarks={showLandmarks}
            onToggleLandmarks={() => setShowLandmarks(!showLandmarks)}
            currentGloss={currentSign.gloss}
            confidence={recognitionConfidence}
          />

          {/* Real-time ISL Gesture Status & Confidence Indicator */}
          <ISLIndicator
            state={recognitionState}
            currentGloss={currentSign.gloss}
            confidence={recognitionConfidence}
            fps={30}
          />

          {/* On-Screen Phrase Cheat-Sheet & Fast Simulator Selector */}
          <Card
            variant="dark"
            className="p-5"
            style={{ backgroundColor: 'var(--color-forest-850)', border: '1px solid var(--border-subtle)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-coral" />
                <span className="overline text-xs text-coral font-bold">
                  On-Screen Sign Cheat-Sheet & Simulator (~20 Signs)
                </span>
              </div>
              <span className="text-xs text-muted">Click sign to simulate camera performance</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {VOCABULARY_LIST.map((item) => (
                <button
                  key={item.gloss}
                  onClick={() => handleSimulateGesture(item)}
                  className="btn btn-sm"
                  style={{
                    backgroundColor:
                      currentSign.gloss === item.gloss ? 'var(--color-coral-500)' : 'rgba(32, 67, 58, 0.6)',
                    color: currentSign.gloss === item.gloss ? '#ffffff' : 'var(--text-secondary-on-dark)',
                    border: `1px solid ${currentSign.gloss === item.gloss ? 'var(--color-coral-400)' : 'var(--border-subtle)'}`,
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.78rem',
                    padding: '5px 12px'
                  }}
                  title={`Trigger sign: ${item.en}`}
                >
                  <span className="font-mono font-bold">[{item.gloss}]</span>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column (5 cols): AI Translation Card & Live Chat Transcript */}
        <div className="lg-col-span-5 flex flex-col gap-5">
          {/* Real-Time Bilingual Caption & TTS Bridge */}
          <AITranslationCard
            gloss={currentSign.gloss}
            englishText={currentSign.en}
            gujaratiText={currentSign.gu}
            confidence={recognitionConfidence}
          />

          {/* Live Chat Stream & Manual Text Fallback */}
          <Card
            variant="dark"
            className="flex-1 flex flex-col justify-between overflow-hidden"
            style={{
              backgroundColor: 'var(--color-forest-850)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-xl)',
              minHeight: '380px',
              padding: 0
            }}
          >
            {/* Chat Stream Header */}
            <div
              className="flex items-center justify-between px-5 py-3.5 border-b border-subtle"
              style={{ backgroundColor: 'rgba(18, 38, 33, 0.7)' }}
            >
              <div className="flex items-center gap-2">
                <span className="overline text-xs text-mint">Session Transcript</span>
              </div>
              <Badge variant="forest">{chatMessages.length} Messages</Badge>
            </div>

            {/* Chat Message Stream */}
            <div
              className="p-5 flex-1 overflow-y-auto"
              style={{ maxHeight: '320px', display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              {chatMessages.map((msg) => (
                <ChatBubble
                  key={msg.id}
                  message={msg}
                  onSpeak={speakText}
                />
              ))}
            </div>

            {/* Hearing User Manual Text Fallback Input Bar */}
            <form
              onSubmit={handleSendManualReply}
              className="p-3 border-t border-subtle flex items-center gap-2"
              style={{ backgroundColor: 'rgba(18, 38, 33, 0.9)' }}
            >
              <input
                type="text"
                value={textInputFallback}
                onChange={(e) => setTextInputFallback(e.target.value)}
                placeholder="Type reply to signer (or manual fallback)..."
                className="form-input"
                style={{ padding: '8px 14px', fontSize: '0.88rem' }}
              />
              <Button
                type="submit"
                variant="coral"
                size="sm"
                icon={<Send size={15} />}
                disabled={!textInputFallback.trim()}
              >
                Send
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
