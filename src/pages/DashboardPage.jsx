import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Video,
  Plus,
  Search,
  BookOpen,
  Award,
  Sparkles,
  Users,
  Clock,
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { Sidebar } from '../components/navigation/Sidebar';
import { PageHeader } from '../components/navigation/PageHeader';
import { Card, CardHeader } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { SearchInput, InputField, SelectField } from '../components/common/InputField';
import { ConversationItem } from '../components/dashboard/ConversationItem';
import { Modal } from '../components/common/Modal';
import { useToast } from '../components/common/Toast';

const MOCK_CONVERSATIONS = [
  {
    id: 'session-patel-101',
    partnerName: 'Dr. Radhika Patel',
    partnerRole: 'hearing',
    lastGloss: 'CLASSROOM',
    lastMessage: 'Let us begin chapter 4 inclusive acoustics session.',
    timestamp: '10:45 AM',
    unreadCount: 2,
    topic: 'Physics 101 Lecture Bridge'
  },
  {
    id: 'session-ananya-202',
    partnerName: 'Ananya Sharma',
    partnerRole: 'signer',
    lastGloss: 'THANK YOU',
    lastMessage: 'Thank you for sharing the ISL vocabulary study notes!',
    timestamp: 'Yesterday',
    unreadCount: 0,
    topic: 'Peer Practice Session'
  },
  {
    id: 'session-priya-303',
    partnerName: 'Priya Desai (Tutor)',
    partnerRole: 'tutor',
    lastGloss: 'PRACTICE',
    lastMessage: 'Your facial grammar markers on YES/NO have improved 30%.',
    timestamp: 'Sep 01',
    unreadCount: 0,
    topic: 'Weekly Sign Evaluation'
  }
];

export function DashboardPage() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [conversations, setConversations] = useState(MOCK_CONVERSATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState(MOCK_CONVERSATIONS[0]);
  const [isNewSessionModalOpen, setIsNewSessionModalOpen] = useState(false);
  const [newSessionTopic, setNewSessionTopic] = useState('');
  const [newSessionPartner, setNewSessionPartner] = useState('Dr. Radhika Patel');

  const filteredConversations = conversations.filter(
    (c) =>
      c.partnerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastGloss.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStartNewSession = (e) => {
    e.preventDefault();
    const sessionId = `session-${Date.now()}`;
    setIsNewSessionModalOpen(false);
    addToast({
      title: 'Session created!',
      message: `Connecting live pipeline with ${newSessionPartner}...`,
      type: 'success'
    });
    navigate(`/session/${sessionId}`);
  };

  return (
    <div className="flex-1 flex flex-col md-flex-row">
      {/* Dashboard Left Sidebar */}
      <Sidebar className="hidden md-flex" />

      {/* Main Content Area */}
      <main className="flex-1 p-6 md-p-8 overflow-y-auto max-w-7xl">
        <PageHeader
          overline="COMMUNICATION INBOX & SESSIONS"
          title="Signer Communication Workspace"
          subtitle="Select a peer or teacher conversation to start a live two-way ISL recognition bridge."
          actions={
            <Button
              variant="coral"
              size="md"
              icon={<Plus size={16} />}
              onClick={() => setIsNewSessionModalOpen(true)}
            >
              Start New Live Bridge
            </Button>
          }
        />

        {/* Quick Metric Stat Cards */}
        <div className="grid grid-cols-1 md-grid-cols-3 gap-4 mb-8">
          <Card
            variant="dark"
            className="p-5 flex items-center justify-between"
            style={{
              backgroundColor: 'var(--color-forest-850)',
              border: '1px solid var(--border-mint)'
            }}
          >
            <div>
              <span className="overline text-xs text-mint">Active Pipeline</span>
              <div className="text-2xl font-serif font-bold text-primary mt-1">MediaPipe + GRU</div>
              <p className="text-xs text-muted mt-1">Client Landmark Mesh Ready</p>
            </div>
            <div className="text-3xl">🪄</div>
          </Card>

          <Card
            variant="dark"
            className="p-5 flex items-center justify-between"
            style={{
              backgroundColor: 'var(--color-forest-850)',
              border: '1px solid var(--border-coral)'
            }}
          >
            <div>
              <span className="overline text-xs text-coral">Vocabulary Scope</span>
              <div className="text-2xl font-serif font-bold text-primary mt-1">~20 ISL Signs</div>
              <p className="text-xs text-muted mt-1">English + Gujarati Spoken Output</p>
            </div>
            <div className="text-3xl">🤟</div>
          </Card>

          <Card
            variant="dark"
            className="p-5 flex items-center justify-between"
            style={{
              backgroundColor: 'var(--color-forest-850)',
              border: '1px solid var(--border-gold)'
            }}
          >
            <div>
              <span className="overline text-xs text-gold">Practice Mode</span>
              <div className="text-2xl font-serif font-bold text-primary mt-1">16 / 20 Mastered</div>
              <p className="text-xs text-muted mt-1">Daily Streak: 5 Days Active</p>
            </div>
            <div className="text-3xl">🎓</div>
          </Card>
        </div>

        {/* Inbox / Conversation List & Live Preview */}
        <div className="grid grid-cols-1 lg-grid-cols-3 gap-6">
          {/* Conversation List Column */}
          <div className="lg-col-span-2 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-serif text-xl font-semibold text-primary">Recent Classroom Channels</h3>
              <Badge variant="forest">{filteredConversations.length} Active</Badge>
            </div>

            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations, partners or glosses..."
            />

            <div className="flex flex-col gap-3">
              {filteredConversations.map((conv) => (
                <ConversationItem
                  key={conv.id}
                  conversation={conv}
                  isSelected={selectedConversation?.id === conv.id}
                  onSelect={(item) => setSelectedConversation(item)}
                  onStartSession={(id) => navigate(`/session/${id}`)}
                />
              ))}

              {filteredConversations.length === 0 && (
                <div className="text-center p-8 card-dark">
                  <p className="text-sm text-muted">No conversations matching "{searchQuery}"</p>
                </div>
              )}
            </div>
          </div>

          {/* Selected Conversation Detail & Quick Launch Box */}
          <div className="flex flex-col gap-4">
            <Card
              variant="dark"
              className="p-6 flex flex-col justify-between"
              style={{
                backgroundColor: 'var(--color-forest-850)',
                border: '1px solid var(--border-medium)',
                minHeight: '380px'
              }}
            >
              {selectedConversation ? (
                <>
                  <div>
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-subtle">
                      <span className="overline text-xs text-coral">Session Channel</span>
                      <Badge variant="mint">Live Ready</Badge>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-primary mb-1">
                      {selectedConversation.partnerName}
                    </h3>
                    <p className="text-xs text-coral font-medium mb-4">
                      {selectedConversation.topic}
                    </p>

                    <div className="p-4 rounded-xl bg-forest-900 border border-subtle mb-4">
                      <span className="text-xs text-muted block mb-1">Last Sign Translation:</span>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="gloss">GLOSS: [{selectedConversation.lastGloss}]</Badge>
                      </div>
                      <p className="text-sm text-secondary italic">
                        "{selectedConversation.lastMessage}"
                      </p>
                    </div>

                    <div className="text-xs text-muted flex flex-col gap-1.5">
                      <div className="flex justify-between">
                        <span>Partner Role:</span>
                        <span className="text-primary font-semibold capitalize">
                          {selectedConversation.partnerRole}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Audio Synthesis:</span>
                        <span className="text-mint font-semibold">Gujarati & English TTS</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pipeline Latency:</span>
                        <span className="text-gold font-mono">~120ms</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-subtle flex flex-col gap-2">
                    <Button
                      variant="coral"
                      size="md"
                      icon={<Video size={16} />}
                      onClick={() => navigate(`/session/${selectedConversation.id}`)}
                      className="w-full"
                    >
                      Enter Live Communication Room
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/learn')}
                      icon={<BookOpen size={14} />}
                      className="w-full"
                    >
                      Practice Classroom Vocabulary
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center p-8 text-muted">Select a conversation</div>
              )}
            </Card>
          </div>
        </div>

        {/* Modal: Start New Live Session */}
        <Modal
          isOpen={isNewSessionModalOpen}
          onClose={() => setIsNewSessionModalOpen(false)}
          title="Start Live Bridge Session"
          subtitle="Initialize a live webcam ISL recognition and bilingual voice channel."
        >
          <form onSubmit={handleStartNewSession} className="flex flex-col gap-4">
            <SelectField
              label="Select Classroom Partner"
              value={newSessionPartner}
              onChange={(e) => setNewSessionPartner(e.target.value)}
              options={[
                { value: 'Dr. Radhika Patel', label: 'Dr. Radhika Patel (Hearing Professor)' },
                { value: 'Ananya Sharma', label: 'Ananya Sharma (Deaf Peer Signer)' },
                { value: 'Priya Desai', label: 'Priya Desai (ISL Speech Tutor)' },
                { value: 'Open Classroom Channel', label: 'Open Classroom Channel (Broadcast Mode)' }
              ]}
              required
            />

            <InputField
              label="Session Title / Subject"
              placeholder="e.g. Physics Acoustics Study Group"
              value={newSessionTopic}
              onChange={(e) => setNewSessionTopic(e.target.value)}
              hint="Helps key context for the closed vocabulary model."
            />

            <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-subtle">
              <Button
                variant="ghost"
                size="md"
                onClick={() => setIsNewSessionModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="coral"
                size="md"
                icon={<Video size={16} />}
              >
                Launch Live Room
              </Button>
            </div>
          </form>
        </Modal>
      </main>
    </div>
  );
}
