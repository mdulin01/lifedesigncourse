import React, { useState, useEffect, useRef } from 'react';
import {
  Users, Plus, Hash, MessageSquare, Send, ArrowLeft, Search,
  UserPlus, LogOut as LeaveIcon, ChevronRight, Filter, X, Trash2, Edit3, Check,
  Link as LinkIcon, FileText, Bell,
} from 'lucide-react';
import { useUserProfile } from '../hooks/useUserProfile';
import { useTeams } from '../hooks/useTeams';
import { useMessages } from '../hooks/useMessages';
import { useUnread } from '../hooks/useUnread';

// ─── View constants ───
const VIEW = { TEAMS: 'teams', TEAM: 'team', CHANNEL: 'channel', MEMBERS: 'members' };

export default function MyTeam({ user }) {
  const { profile, allUsers, loadAllUsers } = useUserProfile(user);
  const { allTeams, myTeams, loading: teamsLoading, createTeam, joinTeam, leaveTeam, getChannels, createChannel } = useTeams(user);
  const { totalUnread, getUnread, getTeamUnread, markRead, notifyOthers } = useUnread(user);

  // Navigation state
  const [view, setView] = useState(VIEW.TEAMS);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [channels, setChannels] = useState([]);

  // UI state
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamDesc, setNewTeamDesc] = useState('');
  const [showCreateChannel, setShowCreateChannel] = useState(false);
  const [newChannelName, setNewChannelName] = useState('');
  const [filterSender, setFilterSender] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Load users on mount
  useEffect(() => { loadAllUsers(); }, [loadAllUsers]);

  // Load channels when team is selected
  useEffect(() => {
    if (!selectedTeam) return;
    getChannels(selectedTeam.id).then(setChannels);
  }, [selectedTeam, getChannels]);

  // ─── Handlers ───
  const handleCreateTeam = async () => {
    if (!newTeamName.trim()) return;
    const teamId = await createTeam(newTeamName.trim(), newTeamDesc.trim());
    if (teamId) {
      setNewTeamName('');
      setNewTeamDesc('');
      setShowCreateTeam(false);
    }
  };

  const handleJoinTeam = async (team) => {
    await joinTeam(team.id);
  };

  const handleLeaveTeam = async (team) => {
    await leaveTeam(team.id);
    if (selectedTeam?.id === team.id) {
      setSelectedTeam(null);
      setView(VIEW.TEAMS);
    }
  };

  const handleSelectTeam = (team) => {
    setSelectedTeam(team);
    setView(VIEW.TEAM);
  };

  const handleSelectChannel = (channel) => {
    setSelectedChannel(channel);
    setView(VIEW.CHANNEL);
    markRead(selectedTeam.id, channel.id);
  };

  const handleCreateChannel = async () => {
    if (!newChannelName.trim() || !selectedTeam) return;
    await createChannel(selectedTeam.id, newChannelName.trim());
    setNewChannelName('');
    setShowCreateChannel(false);
    // Refresh channels
    const updated = await getChannels(selectedTeam.id);
    setChannels(updated);
  };

  const goBack = () => {
    if (view === VIEW.CHANNEL) {
      setSelectedChannel(null);
      setFilterSender('');
      setSearchQuery('');
      setView(VIEW.TEAM);
    } else if (view === VIEW.TEAM || view === VIEW.MEMBERS) {
      setSelectedTeam(null);
      setChannels([]);
      setView(VIEW.TEAMS);
    }
  };

  const isMember = (team) => (team.memberIds || []).includes(user?.uid);

  // ─── Team members lookup ───
  const getTeamMembers = (team) => {
    if (!team?.memberIds) return [];
    return allUsers.filter(u => team.memberIds.includes(u.id));
  };

  // ─── Render views ───
  return (
    <div className="space-y-4 pb-20 md:pb-6">
      {view === VIEW.TEAMS && <TeamsView
        allTeams={allTeams}
        myTeams={myTeams}
        loading={teamsLoading}
        onSelect={handleSelectTeam}
        onJoin={handleJoinTeam}
        onLeave={handleLeaveTeam}
        isMember={isMember}
        showCreate={showCreateTeam}
        setShowCreate={setShowCreateTeam}
        newName={newTeamName}
        setNewName={setNewTeamName}
        newDesc={newTeamDesc}
        setNewDesc={setNewTeamDesc}
        onCreate={handleCreateTeam}
        getTeamUnread={getTeamUnread}
        allUsers={allUsers}
        onViewMembers={() => setView(VIEW.MEMBERS)}
        user={user}
      />}

      {view === VIEW.TEAM && selectedTeam && <TeamView
        team={selectedTeam}
        channels={channels}
        members={getTeamMembers(selectedTeam)}
        onBack={goBack}
        onSelectChannel={handleSelectChannel}
        getUnread={(chId) => getUnread(selectedTeam.id, chId)}
        showCreateChannel={showCreateChannel}
        setShowCreateChannel={setShowCreateChannel}
        newChannelName={newChannelName}
        setNewChannelName={setNewChannelName}
        onCreateChannel={handleCreateChannel}
        onLeave={() => handleLeaveTeam(selectedTeam)}
      />}

      {view === VIEW.CHANNEL && selectedTeam && selectedChannel && <ChannelView
        user={user}
        team={selectedTeam}
        channel={selectedChannel}
        onBack={goBack}
        markRead={markRead}
        notifyOthers={notifyOthers}
        filterSender={filterSender}
        setFilterSender={setFilterSender}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        members={getTeamMembers(selectedTeam)}
      />}

      {view === VIEW.MEMBERS && <MembersView
        allUsers={allUsers}
        onBack={goBack}
      />}
    </div>
  );
}

// ════════════════════════════════════════════
// TEAMS VIEW — list my teams + browse all
// ════════════════════════════════════════════
function TeamsView({
  allTeams, myTeams, loading, onSelect, onJoin, onLeave, isMember,
  showCreate, setShowCreate, newName, setNewName, newDesc, setNewDesc, onCreate,
  getTeamUnread, allUsers, onViewMembers, user,
}) {
  const otherTeams = allTeams.filter(t => !isMember(t));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">My Teams</h2>
          <p className="text-xs text-white/40 mt-0.5">{myTeams.length} team{myTeams.length !== 1 ? 's' : ''} joined</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onViewMembers}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white/50 hover:text-white hover:bg-white/5 border border-white/10 transition"
          >
            <Users className="w-3.5 h-3.5" /> Directory
          </button>
          <button
            onClick={() => setShowCreate(!showCreate)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/25 transition"
          >
            <Plus className="w-3.5 h-3.5" /> New Team
          </button>
        </div>
      </div>

      {/* Create team form */}
      {showCreate && (
        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 space-y-3">
          <input
            type="text"
            placeholder="Team name..."
            value={newName}
            onChange={e => setNewName(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50"
            onKeyDown={e => e.key === 'Enter' && onCreate()}
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={newDesc}
            onChange={e => setNewDesc(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50"
            onKeyDown={e => e.key === 'Enter' && onCreate()}
          />
          <div className="flex gap-2">
            <button onClick={onCreate} className="px-4 py-1.5 rounded-lg text-xs font-medium bg-emerald-500 text-white hover:bg-emerald-600 transition">
              Create
            </button>
            <button onClick={() => setShowCreate(false)} className="px-4 py-1.5 rounded-lg text-xs font-medium text-white/40 hover:text-white/60 transition">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* My teams */}
      {loading ? (
        <p className="text-xs text-white/30 text-center py-8">Loading teams...</p>
      ) : myTeams.length === 0 ? (
        <div className="text-center py-12 space-y-2">
          <Users className="w-10 h-10 text-white/10 mx-auto" />
          <p className="text-sm text-white/30">You haven't joined any teams yet.</p>
          <p className="text-xs text-white/20">Create one or join an existing team below.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {myTeams.map(team => {
            const unread = getTeamUnread(team.id);
            return (
              <button
                key={team.id}
                onClick={() => onSelect(team)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/30 hover:bg-emerald-500/[0.04] transition text-left"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-500/15 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{team.name}</p>
                  <p className="text-xs text-white/30">{(team.memberIds || []).length} member{(team.memberIds || []).length !== 1 ? 's' : ''}</p>
                </div>
                {unread > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold min-w-[20px] text-center">
                    {unread}
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-white/20 shrink-0" />
              </button>
            );
          })}
        </div>
      )}

      {/* Browse other teams */}
      {otherTeams.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-white/30 uppercase tracking-wider">Browse Teams</h3>
          {otherTeams.map(team => (
            <div
              key={team.id}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition"
            >
              <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                <Users className="w-4 h-4 text-white/30" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white/70 truncate">{team.name}</p>
                <p className="text-xs text-white/20">{(team.memberIds || []).length} member{(team.memberIds || []).length !== 1 ? 's' : ''}</p>
              </div>
              <button
                onClick={() => onJoin(team)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 transition"
              >
                <UserPlus className="w-3 h-3" /> Join
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════
// TEAM VIEW — channels list + members
// ════════════════════════════════════════════
function TeamView({ team, channels, members, onBack, onSelectChannel, getUnread, showCreateChannel, setShowCreateChannel, newChannelName, setNewChannelName, onCreateChannel, onLeave }) {
  // Sort channels: General first, then modules in order, then custom
  const sorted = [...channels].sort((a, b) => {
    if (a.name === 'General') return -1;
    if (b.name === 'General') return 1;
    if (a.type === 'module' && b.type === 'module') return (a.moduleId || 0) - (b.moduleId || 0);
    if (a.type === 'module') return -1;
    if (b.type === 'module') return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-1.5 text-white/40 hover:text-white transition">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-white">{team.name}</h2>
          {team.description && <p className="text-xs text-white/30">{team.description}</p>}
        </div>
        <button
          onClick={onLeave}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition"
          title="Leave team"
        >
          <LeaveIcon className="w-3 h-3" /> Leave
        </button>
      </div>

      {/* Members row */}
      <div className="flex items-center gap-2 px-1">
        <span className="text-[10px] text-white/25 uppercase tracking-wider">Members</span>
        <div className="flex -space-x-2">
          {members.slice(0, 8).map(m => (
            <div key={m.id} className="w-6 h-6 rounded-full bg-emerald-500/20 border-2 border-slate-950 flex items-center justify-center text-[9px] font-bold text-emerald-400" title={m.displayName}>
              {(m.displayName || m.email || '?')[0].toUpperCase()}
            </div>
          ))}
          {members.length > 8 && <span className="text-[10px] text-white/25 ml-2">+{members.length - 8}</span>}
        </div>
      </div>

      {/* Channels */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] text-white/25 uppercase tracking-wider font-bold">Channels</span>
          <button
            onClick={() => setShowCreateChannel(!showCreateChannel)}
            className="text-[10px] text-emerald-400/60 hover:text-emerald-400 transition"
          >
            + Add
          </button>
        </div>

        {showCreateChannel && (
          <div className="flex gap-2 px-1">
            <input
              type="text"
              placeholder="Channel name..."
              value={newChannelName}
              onChange={e => setNewChannelName(e.target.value)}
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50"
              onKeyDown={e => e.key === 'Enter' && onCreateChannel()}
            />
            <button onClick={onCreateChannel} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500 text-white hover:bg-emerald-600 transition">
              Add
            </button>
          </div>
        )}

        {sorted.map(ch => {
          const unread = getUnread(ch.id);
          return (
            <button
              key={ch.id}
              onClick={() => onSelectChannel(ch)}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-white/[0.04] transition text-left"
            >
              <Hash className="w-4 h-4 text-white/20 shrink-0" />
              <span className="flex-1 text-sm text-white/70 truncate">{ch.name}</span>
              {unread > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-emerald-500 text-white text-[9px] font-bold min-w-[18px] text-center">
                  {unread}
                </span>
              )}
            </button>
          );
        })}

        {channels.length === 0 && (
          <p className="text-xs text-white/20 text-center py-4">No channels yet</p>
        )}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════
// CHANNEL VIEW — message thread + input
// ════════════════════════════════════════════
function ChannelView({ user, team, channel, onBack, markRead, notifyOthers, filterSender, setFilterSender, searchQuery, setSearchQuery, showFilters, setShowFilters, members }) {
  const { messages, loading, sendMessage, deleteMessage, editMessage } = useMessages(user, team.id, channel.id);
  const [input, setInput] = useState('');
  const [msgType, setMsgType] = useState('text');
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  // Mark read on view
  useEffect(() => {
    markRead(team.id, channel.id);
  }, [team.id, channel.id, markRead]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const content = input.trim();
    const metadata = msgType === 'link' ? { url: content } : null;
    setInput('');
    setMsgType('text');
    await sendMessage(content, msgType, metadata);
    // Notify others
    notifyOthers(team.id, channel.id, team.memberIds || []);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const startEdit = (msg) => {
    setEditingId(msg.id);
    setEditContent(msg.content);
  };

  const saveEdit = async (msgId) => {
    if (editContent.trim()) {
      await editMessage(msgId, editContent.trim());
    }
    setEditingId(null);
    setEditContent('');
  };

  // Filter messages
  let filtered = messages;
  if (filterSender) {
    filtered = filtered.filter(m => m.userId === filterSender);
  }
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(m => m.content.toLowerCase().includes(q));
  }

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-1.5 text-white/40 hover:text-white transition">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <Hash className="w-4 h-4 text-emerald-400/60" />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-white truncate">{channel.name}</h3>
          <p className="text-[10px] text-white/25">{team.name}</p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`p-1.5 rounded-lg transition ${showFilters ? 'bg-emerald-500/15 text-emerald-400' : 'text-white/30 hover:text-white/50'}`}
        >
          <Filter className="w-4 h-4" />
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="flex flex-wrap gap-2 px-1">
          <div className="flex-1 min-w-[140px]">
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50"
            />
          </div>
          <select
            value={filterSender}
            onChange={e => setFilterSender(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white/70 focus:outline-none focus:border-emerald-500/50"
          >
            <option value="">All members</option>
            {members.map(m => (
              <option key={m.id} value={m.id}>{m.displayName || m.email}</option>
            ))}
          </select>
          {(filterSender || searchQuery) && (
            <button
              onClick={() => { setFilterSender(''); setSearchQuery(''); }}
              className="px-2 py-1 text-xs text-white/30 hover:text-white/50 transition"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Messages */}
      <div className="space-y-1 min-h-[200px] max-h-[60vh] overflow-y-auto rounded-xl bg-white/[0.01] border border-white/5 p-3">
        {loading ? (
          <p className="text-xs text-white/20 text-center py-8">Loading messages...</p>
        ) : filtered.length === 0 ? (
          <p className="text-xs text-white/20 text-center py-8">
            {messages.length === 0 ? 'No messages yet. Start the conversation!' : 'No messages match your filters.'}
          </p>
        ) : (
          filtered.map(msg => {
            const isOwn = msg.userId === user?.uid;
            const isEditing = editingId === msg.id;
            const time = msg.createdAt ? new Date(msg.createdAt).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '';

            return (
              <div key={msg.id} className={`group flex gap-2.5 py-2 px-2 rounded-lg hover:bg-white/[0.02] transition ${isOwn ? '' : ''}`}>
                <div className="w-7 h-7 rounded-full bg-emerald-500/15 flex items-center justify-center text-[10px] font-bold text-emerald-400 shrink-0 mt-0.5">
                  {(msg.senderName || '?')[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-medium text-emerald-300/80">{msg.senderName || 'User'}</span>
                    <span className="text-[10px] text-white/15">{time}</span>
                    {msg.editedAt && <span className="text-[9px] text-white/10">(edited)</span>}
                  </div>
                  {isEditing ? (
                    <div className="flex gap-1.5 mt-1">
                      <input
                        type="text"
                        value={editContent}
                        onChange={e => setEditContent(e.target.value)}
                        className="flex-1 bg-white/5 border border-white/15 rounded px-2 py-1 text-xs text-white focus:outline-none"
                        onKeyDown={e => { if (e.key === 'Enter') saveEdit(msg.id); if (e.key === 'Escape') setEditingId(null); }}
                        autoFocus
                      />
                      <button onClick={() => saveEdit(msg.id)} className="text-emerald-400 hover:text-emerald-300"><Check className="w-3.5 h-3.5" /></button>
                      <button onClick={() => setEditingId(null)} className="text-white/30 hover:text-white/50"><X className="w-3.5 h-3.5" /></button>
                    </div>
                  ) : (
                    <>
                      {msg.type === 'link' ? (
                        <a href={msg.content} target="_blank" rel="noopener noreferrer" className="text-sm text-emerald-400 hover:underline break-all">
                          <LinkIcon className="w-3 h-3 inline mr-1" />{msg.content}
                        </a>
                      ) : msg.type === 'snippet' ? (
                        <div className="mt-1 bg-white/[0.04] border border-white/10 rounded-lg p-2 text-xs text-white/60 font-mono whitespace-pre-wrap">
                          {msg.content}
                        </div>
                      ) : (
                        <p className="text-sm text-white/60 whitespace-pre-wrap break-words">{msg.content}</p>
                      )}
                    </>
                  )}
                </div>
                {/* Edit/delete for own messages */}
                {isOwn && !isEditing && (
                  <div className="opacity-0 group-hover:opacity-100 flex items-start gap-1 transition shrink-0">
                    <button onClick={() => startEdit(msg)} className="p-1 text-white/15 hover:text-white/40 transition">
                      <Edit3 className="w-3 h-3" />
                    </button>
                    <button onClick={() => deleteMessage(msg.id)} className="p-1 text-white/15 hover:text-red-400/60 transition">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2 items-end">
        {/* Type selector */}
        <div className="flex flex-col gap-1">
          <button
            onClick={() => setMsgType(msgType === 'link' ? 'text' : 'link')}
            className={`p-2 rounded-lg transition ${msgType === 'link' ? 'bg-emerald-500/15 text-emerald-400' : 'text-white/20 hover:text-white/40'}`}
            title="Share a link"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMsgType(msgType === 'snippet' ? 'text' : 'snippet')}
            className={`p-2 rounded-lg transition ${msgType === 'snippet' ? 'bg-emerald-500/15 text-emerald-400' : 'text-white/20 hover:text-white/40'}`}
            title="Share a snippet"
          >
            <FileText className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1">
          {msgType === 'snippet' ? (
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Paste a workbook snippet..."
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-emerald-500/40 resize-none font-mono"
              onKeyDown={e => { if (e.key === 'Enter' && e.metaKey) handleSend(); }}
            />
          ) : (
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={msgType === 'link' ? 'Paste a URL...' : 'Type a message...'}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-emerald-500/40"
              onKeyDown={handleKeyDown}
            />
          )}
        </div>

        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="p-2.5 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-30 disabled:hover:bg-emerald-500 transition shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════
// MEMBERS DIRECTORY
// ════════════════════════════════════════════
function MembersView({ allUsers, onBack }) {
  const [search, setSearch] = useState('');
  const filtered = allUsers.filter(u => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (u.displayName || '').toLowerCase().includes(q) || (u.email || '').toLowerCase().includes(q);
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-1.5 text-white/40 hover:text-white transition">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h2 className="text-lg font-bold text-white">Participants</h2>
          <p className="text-xs text-white/30">{allUsers.length} course member{allUsers.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search participants..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-emerald-500/40"
      />

      <div className="space-y-1">
        {filtered.map(u => (
          <div key={u.id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.03] transition">
            <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center text-xs font-bold text-emerald-400 shrink-0">
              {(u.displayName || u.email || '?')[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{u.displayName || 'User'}</p>
              <p className="text-[10px] text-white/25 truncate">{u.email}</p>
            </div>
            {u.joinedAt && (
              <span className="text-[10px] text-white/15">
                Joined {new Date(u.joinedAt).toLocaleDateString([], { month: 'short', year: 'numeric' })}
              </span>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-xs text-white/20 text-center py-6">No participants found</p>
        )}
      </div>
    </div>
  );
}
