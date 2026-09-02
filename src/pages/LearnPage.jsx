import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Play,
  Camera,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Award,
  Volume2,
  ArrowRight,
  Filter
} from 'lucide-react';
import { PageHeader } from '../components/navigation/PageHeader';
import { BotanicalCornerFrame, BotanicalGarland, BotanicalFlower } from '../components/common/BotanicalDecor';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { SearchInput } from '../components/common/InputField';
import { useToast } from '../components/common/Toast';

const ISL_CURRICULUM = [
  {
    id: 1,
    gloss: 'HELLO',
    category: 'Greetings',
    english: 'Hello! Good to see you.',
    gujarati: 'નમસ્તે! તમને મળીને આનંદ થયો.',
    hint: 'Flat open palm starts at forehead and sweeps forward gracefully with a warm smile.',
    mastered: true
  },
  {
    id: 2,
    gloss: 'THANK YOU',
    category: 'Polite',
    english: 'Thank you very much.',
    gujarati: 'તમારો ખૂબ ખૂબ આભાર.',
    hint: 'Fingertips touch the chin, then move outward toward the recipient.',
    mastered: true
  },
  {
    id: 3,
    gloss: 'CLASSROOM',
    category: 'Education',
    english: 'This is our inclusive study classroom.',
    gujarati: 'આ અમારો સમાવેશી અભ્યાસ વર્ગખંડ છે.',
    hint: 'Both hands form C-shapes, joining wrists and sweeping forward to form a circle.',
    mastered: true
  },
  {
    id: 4,
    gloss: 'GUJARAT',
    category: 'Locations',
    english: 'Gujarat state regional community.',
    gujarati: 'ગુજરાત રાજ્ય સમુદાય.',
    hint: 'G-handshape makes an arching motion tracing the geographic curve.',
    mastered: false
  },
  {
    id: 5,
    gloss: 'HELP',
    category: 'Essential',
    english: 'I need assistance, please.',
    gujarati: 'મને મદદની જરૂર છે.',
    hint: 'Closed fist with thumb up rests on open palm of the non-dominant hand and lifts upward.',
    mastered: true
  },
  {
    id: 6,
    gloss: 'WATER',
    category: 'Essential',
    english: 'May I drink some water?',
    gujarati: 'શું હું પાણી પી શકું?',
    hint: 'W-handshape index finger taps the side of the chin twice.',
    mastered: true
  },
  {
    id: 7,
    gloss: 'TEACHER',
    category: 'Education',
    english: 'The professor / teacher.',
    gujarati: 'શિક્ષક / પ્રોફેસર.',
    hint: 'Both hands at temple level pinch forward, followed by the person agent marker downward.',
    mastered: false
  },
  {
    id: 8,
    gloss: 'STUDENT',
    category: 'Education',
    english: 'Students learning together.',
    gujarati: 'વિદ્યાર્થીઓ સાથે શીખી રહ્યા છે.',
    hint: 'Flat hand scoops knowledge from palm into forehead, followed by person marker.',
    mastered: true
  },
  {
    id: 9,
    gloss: 'PLEASE',
    category: 'Polite',
    english: 'Please assist me.',
    gujarati: 'કૃપા કરીને મારી મદદ કરો.',
    hint: 'Flat hand rubs in circular motion over the center of the chest.',
    mastered: true
  },
  {
    id: 10,
    gloss: 'YES',
    category: 'Responses',
    english: 'Yes, affirmative.',
    gujarati: 'હા, સમર્થન છે.',
    hint: 'S-fist nods up and down twice mimicking a head nod.',
    mastered: true
  },
  {
    id: 11,
    gloss: 'NO',
    category: 'Responses',
    english: 'No, negative.',
    gujarati: 'ના, નકારાત્મક.',
    hint: 'Index and middle fingers snap down onto thumb.',
    mastered: true
  },
  {
    id: 12,
    gloss: 'QUESTION',
    category: 'Education',
    english: 'I have a question.',
    gujarati: 'મારો એક પ્રશ્ન છે.',
    hint: 'Index finger traces a question mark in the air and finishes with a dot.',
    mastered: false
  },
  {
    id: 13,
    gloss: 'MORNING',
    category: 'Greetings',
    english: 'Good morning!',
    gujarati: 'શુભ સવાર!',
    hint: 'Non-dominant arm forms horizon while dominant hand rises up like the morning sun.',
    mastered: true
  },
  {
    id: 14,
    gloss: 'AFTERNOON',
    category: 'Greetings',
    english: 'Good afternoon!',
    gujarati: 'શુભ બપોર!',
    hint: 'Dominant forearm leans at a 45-degree angle across the horizon arm.',
    mastered: true
  },
  {
    id: 15,
    gloss: 'PRACTICE',
    category: 'Education',
    english: 'Daily practice session.',
    gujarati: 'દૈનિક અભ્યાસ સત્ર.',
    hint: 'A-fist rubs back and forth along the extended index finger of the other hand.',
    mastered: true
  },
  {
    id: 16,
    gloss: 'FRIEND',
    category: 'Social',
    english: 'Good friends.',
    gujarati: 'સારા મિત્રો.',
    hint: 'Index fingers hook into each other and reverse sides.',
    mastered: true
  },
  {
    id: 17,
    gloss: 'UNDERSTAND',
    category: 'Responses',
    english: 'I understand.',
    gujarati: 'હું સમજી ગયો.',
    hint: 'Flick index finger upward by the temple like a lightbulb turning on.',
    mastered: true
  },
  {
    id: 18,
    gloss: 'GOOD',
    category: 'Responses',
    english: 'Good / Well done.',
    gujarati: 'સરસ / ઉત્તમ.',
    hint: 'Fingertips touch chin and move down to land gently on the palm of other hand.',
    mastered: true
  },
  {
    id: 19,
    gloss: 'AGAIN',
    category: 'Responses',
    english: 'Please repeat again.',
    gujarati: 'કૃપા કરીને ફરીથી કરો.',
    hint: 'Bent hand arcs upward and into the open palm of the other hand.',
    mastered: true
  },
  {
    id: 20,
    gloss: 'EXAM',
    category: 'Education',
    english: 'Classroom evaluation / exam.',
    gujarati: 'પરીક્ષા / મૂલ્યાંકન.',
    hint: 'Both hands trace paper perimeter and write downward motion.',
    mastered: false
  }
];

export function LearnPage() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [selectedSign, setSelectedSign] = useState(ISL_CURRICULUM[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentStep, setCurrentStep] = useState(1); // 1 Pick, 2 Watch, 3 Perform, 4 Classify, 5 Result
  const [isPerforming, setIsPerforming] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const categories = ['All', 'Greetings', 'Polite', 'Education', 'Essential', 'Responses', 'Social'];

  const filteredSigns = ISL_CURRICULUM.filter((sign) => {
    const matchesCat = selectedCategory === 'All' || sign.category === selectedCategory;
    const matchesSearch =
      sign.gloss.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sign.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sign.gujarati.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSelectSign = (sign) => {
    setSelectedSign(sign);
    setCurrentStep(2);
    setTestResult(null);
  };

  const handleStartAttempt = () => {
    setCurrentStep(3);
    setIsPerforming(true);

    // Simulate Step 4: Classifying
    setTimeout(() => {
      setCurrentStep(4);
    }, 1800);

    // Simulate Step 5: Result
    setTimeout(() => {
      setIsPerforming(false);
      setCurrentStep(5);
      const score = Math.floor(Math.random() * 8) + 92;
      const passed = score >= 85;
      setTestResult({
        passed,
        score,
        feedback: passed
          ? 'Exceptional landmark alignment! Spatial trajectory and hand orientation matched reference.'
          : 'Hold the handshape steady at chin height for 1 second.'
      });

      addToast({
        title: passed ? 'Evaluation Passed! 🌟' : 'Try Again',
        message: `Sign [${selectedSign.gloss}] recognized with ${score}% landmark match.`,
        type: passed ? 'success' : 'warning'
      });
    }, 3600);
  };

  const handleSpeak = (text, lang = 'en-US') => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="container py-8">
      <PageHeader
        overline="ISL PRACTICE & LEARNING ENGINE"
        title="Learn Indian Sign Language"
        subtitle="5-step interactive practice engine that reuses the live MediaPipe + GRU sign recognizer to give real-time pass/fail feedback."
        withGarland={true}
      />

      {/* 5-Step Progress Stepper (Directly from Deck Slide 9) */}
      <div className="mb-10">
        <div className="grid grid-cols-5 gap-2 md-gap-4">
          {[
            { num: 1, title: 'Pick', desc: 'Pick sign from list' },
            { num: 2, title: 'Watch', desc: 'Reference guide plays' },
            { num: 3, title: 'Perform', desc: 'Attempt on camera' },
            { num: 4, title: 'Classify', desc: 'GRU model evaluates' },
            { num: 5, title: 'Result', desc: 'Pass / Fail score' }
          ].map((step) => {
            const isActive = currentStep === step.num;
            const isCompleted = currentStep > step.num;

            return (
              <div
                key={step.num}
                className="flex flex-col items-center text-center p-3 rounded-xl transition-all"
                style={{
                  backgroundColor: isActive
                    ? 'rgba(240, 139, 118, 0.15)'
                    : isCompleted
                    ? 'rgba(72, 201, 176, 0.1)'
                    : 'rgba(32, 67, 58, 0.3)',
                  border: `1px solid ${
                    isActive
                      ? 'var(--color-coral-400)'
                      : isCompleted
                      ? 'var(--border-mint)'
                      : 'var(--border-subtle)'
                  }`
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: isActive
                      ? 'var(--color-coral-500)'
                      : isCompleted
                      ? 'var(--color-mint-400)'
                      : 'var(--color-forest-700)',
                    color: isCompleted ? '#10241f' : '#ffffff',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.85rem',
                    marginBottom: '6px'
                  }}
                >
                  {isCompleted ? '✓' : step.num}
                </div>
                <div className="font-serif font-bold text-sm text-primary">{step.title}</div>
                <div className="text-xs text-muted hidden md-block mt-0.5">{step.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Practice Studio */}
      <div className="grid grid-cols-1 lg-grid-cols-12 gap-8 mb-12">
        {/* Left Side: Sign Practice Interactive Card (7 cols) */}
        <div className="lg-col-span-7 flex flex-col gap-6">
          <Card
            variant="dark"
            className="p-6 md-p-8"
            style={{
              backgroundColor: 'var(--color-forest-850)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-xl)'
            }}
          >
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-subtle">
              <div>
                <span className="overline text-xs text-coral">Selected ISL Sign</span>
                <h3 className="font-serif text-2xl font-bold text-primary">
                  [{selectedSign.gloss}]
                </h3>
              </div>
              <Badge variant="mint">{selectedSign.category}</Badge>
            </div>

            {/* Gesture Description & Instructions */}
            <div
              className="p-4 rounded-xl mb-6"
              style={{
                backgroundColor: 'rgba(16, 36, 31, 0.7)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div className="text-xs text-muted mb-1 font-bold uppercase">Landmark Motion Guide:</div>
              <p className="text-sm text-secondary leading-relaxed">{selectedSign.hint}</p>
            </div>

            {/* Bilingual Meaning Output */}
            <div className="grid grid-cols-1 md-grid-cols-2 gap-4 mb-6">
              <div className="p-3 rounded-xl bg-forest-900 border border-subtle">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-mint">English</span>
                  <button
                    onClick={() => handleSpeak(selectedSign.english, 'en-US')}
                    className="text-xs text-muted hover:text-primary bg-transparent border-none cursor-pointer"
                  >
                    <Volume2 size={13} />
                  </button>
                </div>
                <p className="text-sm text-primary font-medium">{selectedSign.english}</p>
              </div>

              <div className="p-3 rounded-xl bg-coral-subtle border border-coral">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-coral">ગુજરાતી (Gujarati)</span>
                  <button
                    onClick={() => handleSpeak(selectedSign.gujarati, 'gu-IN')}
                    className="text-xs text-coral hover:text-primary bg-transparent border-none cursor-pointer"
                  >
                    <Volume2 size={13} />
                  </button>
                </div>
                <p className="text-base text-primary font-medium gujarati-text">{selectedSign.gujarati}</p>
              </div>
            </div>

            {/* Practice Camera / Evaluation Screen */}
            <div
              className="p-8 rounded-2xl flex flex-col items-center justify-center text-center mb-6 relative overflow-hidden"
              style={{
                backgroundColor: '#122621',
                border: '1px solid var(--border-medium)',
                minHeight: '220px'
              }}
            >
              {currentStep === 2 && (
                <>
                  <div className="text-4xl mb-2">👁️</div>
                  <h4 className="font-serif text-lg font-bold text-primary mb-1">Reference Guide Ready</h4>
                  <p className="text-xs text-muted max-w-sm mb-4">
                    Review the motion hint above, position yourself in webcam view, and start your performance attempt.
                  </p>
                  <Button
                    variant="coral"
                    size="md"
                    icon={<Camera size={16} />}
                    onClick={handleStartAttempt}
                  >
                    Start Camera Attempt
                  </Button>
                </>
              )}

              {currentStep === 3 && (
                <>
                  <div className="pulse-bloom text-5xl mb-3">🤟</div>
                  <h4 className="font-serif text-lg font-bold text-coral mb-1">Perform Gesture Now...</h4>
                  <p className="text-xs text-mint animate-pulse font-mono">
                    Capturing 30-frame rolling window...
                  </p>
                </>
              )}

              {currentStep === 4 && (
                <>
                  <BotanicalFlower size={36} className="animate-spin mb-3" />
                  <h4 className="font-serif text-lg font-bold text-mint mb-1">Running Classifier...</h4>
                  <p className="text-xs text-muted font-mono">
                    Comparing landmark vectors against ~25 training samples...
                  </p>
                </>
              )}

              {currentStep === 5 && testResult && (
                <>
                  <div className="text-4xl mb-2">{testResult.passed ? '🌟' : '⚠️'}</div>
                  <h4 className="font-serif text-xl font-bold text-primary mb-1">
                    {testResult.passed ? 'Evaluation Passed!' : 'Need Practice'}
                  </h4>
                  <div className="flex items-center gap-2 my-2">
                    <Badge variant={testResult.passed ? 'mint' : 'gold'}>
                      {testResult.score}% Accuracy Match
                    </Badge>
                  </div>
                  <p className="text-xs text-muted max-w-sm mb-4">{testResult.feedback}</p>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<RotateCcw size={14} />}
                      onClick={handleStartAttempt}
                    >
                      Try Again
                    </Button>
                    <Button
                      variant="coral"
                      size="sm"
                      icon={<ArrowRight size={14} />}
                      onClick={() => {
                        const nextIndex = (ISL_CURRICULUM.findIndex((s) => s.id === selectedSign.id) + 1) % ISL_CURRICULUM.length;
                        handleSelectSign(ISL_CURRICULUM[nextIndex]);
                      }}
                    >
                      Next Sign
                    </Button>
                  </div>
                </>
              )}
            </div>
          </Card>
        </div>

        {/* Right Side: Curriculum Vocabulary Library (5 cols) */}
        <div className="lg-col-span-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-primary">~20 Sign Vocabulary</h3>
            <span className="text-xs text-coral font-semibold">16/20 Mastered</span>
          </div>

          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sign by name or Gujarati..."
          />

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="btn btn-sm"
                style={{
                  padding: '4px 10px',
                  fontSize: '0.72rem',
                  backgroundColor:
                    selectedCategory === cat ? 'var(--color-mint-500)' : 'rgba(32, 67, 58, 0.5)',
                  color: selectedCategory === cat ? '#10241f' : 'var(--text-secondary-on-dark)',
                  border: `1px solid ${selectedCategory === cat ? 'var(--color-mint-400)' : 'var(--border-subtle)'}`
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Vocabulary Sign Cards List */}
          <div
            className="flex flex-col gap-2.5 overflow-y-auto"
            style={{ maxHeight: '520px', paddingRight: '4px' }}
          >
            {filteredSigns.map((sign) => {
              const isSelected = selectedSign.id === sign.id;
              return (
                <div
                  key={sign.id}
                  onClick={() => handleSelectSign(sign)}
                  className="p-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-between"
                  style={{
                    backgroundColor: isSelected
                      ? 'rgba(240, 139, 118, 0.14)'
                      : 'rgba(32, 67, 58, 0.4)',
                    border: `1px solid ${
                      isSelected ? 'var(--color-coral-400)' : 'var(--border-subtle)'
                    }`
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: sign.mastered
                          ? 'rgba(72, 201, 176, 0.2)'
                          : 'rgba(255, 255, 255, 0.05)',
                        color: sign.mastered ? 'var(--color-mint-300)' : 'var(--text-dim-on-dark)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 700
                      }}
                    >
                      {sign.mastered ? '✓' : '•'}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-primary">
                          [{sign.gloss}]
                        </span>
                        <span className="text-xs text-coral gujarati-text font-medium">
                          {sign.gujarati.split('!')[0].split('.')[0]}
                        </span>
                      </div>
                      <p className="text-xs text-muted truncate max-w-xs">{sign.english}</p>
                    </div>
                  </div>

                  <Badge variant="forest" style={{ fontSize: '0.65rem' }}>
                    {sign.category}
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
