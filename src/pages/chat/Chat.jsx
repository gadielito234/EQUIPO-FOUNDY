import { useEffect, useState } from "react";
import { ArrowLeft, MessageCircle, MoreHorizontal, Paperclip, Phone, Plus, Search, Send, X } from "lucide-react";
import { supabase } from '../../services/supabase.js';

function Avatar({ person }) {
  return (
    <span
      className="relative grid aspect-square h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full text-sm font-bold text-white"
      style={{ backgroundColor: person.color }}
    >
      {person.name.charAt(0)}
      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#00634b]" />
    </span>
  );
}

function Chat({ usuarioData }) {
  const [activeConversation, setActiveConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");
  const [mobileView, setMobileView] = useState("inbox");
  const [newMessageOpen, setNewMessageOpen] = useState(false);
  const [recipientSearch, setRecipientSearch] = useState("");
  const currentDui = usuarioData?.dui;
  const filtered = conversations.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    let mounted = true;
    const loadPeople = async () => {
      if (!currentDui) return;
      const { data, error } = await supabase
        .from('Usuario')
        .select('dui, nombre, apellidos, usuario, tipo_usuario')
        .neq('dui', currentDui)
        .order('nombre');
      if (mounted && !error) {
        setConversations((data || []).map((person, index) => ({
          dui: person.dui,
          name: person.nombre && person.apellidos ? `${person.nombre} ${person.apellidos}` : person.usuario,
          role: person.tipo_usuario === 'Inversionista' ? 'Investor' : 'Entrepreneur',
          color: ['#0b817d', '#d17b4a', '#6f7db8'][index % 3],
          time: '',
          preview: 'Start a conversation.',
        })));
      }
    };
    loadPeople();
    return () => { mounted = false; };
  }, [currentDui]);

  useEffect(() => {
    let mounted = true;
    let channel;
    const loadMessages = async () => {
      if (!activeConversation?.id) {
        setMessages([]);
        return;
      }
      const { data, error } = await supabase
        .from('chat_messages')
        .select('id, sender_dui, body, created_at')
        .eq('conversation_id', activeConversation.id)
        .order('created_at');
      if (mounted && !error) {
        setMessages((data || []).map((message) => ({
          id: message.id,
          author: message.sender_dui === currentDui ? 'You' : activeConversation.name,
          text: message.body,
          type: message.sender_dui === currentDui ? 'sent' : 'received',
          time: new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        })));
      }
      channel = supabase.channel(`chat:${activeConversation.id}`).on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages', filter: `conversation_id=eq.${activeConversation.id}` }, (payload) => {
        const message = payload.new;
        setMessages((current) => current.some((item) => item.id === message.id) ? current : [...current, {
          id: message.id,
          author: message.sender_dui === currentDui ? 'You' : activeConversation.name,
          text: message.body,
          type: message.sender_dui === currentDui ? 'sent' : 'received',
          time: new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }]);
      }).subscribe();
    };
    loadMessages();
    return () => { mounted = false; if (channel) supabase.removeChannel(channel); };
  }, [activeConversation?.id, activeConversation?.name, currentDui]);

  const openConversation = async (conversation) => {
    if (!currentDui || !conversation?.dui) return;
    const { data: participantRow } = await supabase.from('chat_participants').select('conversation_id').eq('dui', currentDui);
    const conversationIds = (participantRow || []).map((row) => row.conversation_id);
    let conversationId = null;
    if (conversationIds.length) {
      const { data: shared } = await supabase.from('chat_participants').select('conversation_id').eq('dui', conversation.dui).in('conversation_id', conversationIds).limit(1).maybeSingle();
      conversationId = shared?.conversation_id || null;
    }
    if (!conversationId) {
      const { data: created } = await supabase.from('chat_conversations').insert({}).select('id').single();
      if (!created) return;
      conversationId = created.id;
      await supabase.from('chat_participants').insert([{ conversation_id: conversationId, dui: currentDui }, { conversation_id: conversationId, dui: conversation.dui }]);
    }
    setActiveConversation({ ...conversation, id: conversationId });
    setMobileView('chat');
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    if (!draft.trim() || !activeConversation?.id || !currentDui) return;
    const { error } = await supabase.from('chat_messages').insert({ conversation_id: activeConversation.id, sender_dui: currentDui, body: draft.trim() });
    if (error) {
      setNotice(`Message could not be sent: ${error.message}`);
      return;
    }
    setDraft("");
  };

  return (
    <div className="chat-shell flex min-h-screen flex-col bg-[#f7f3ee] text-[#424a4c]">
      <main className="flex min-h-0 w-full flex-1 flex-col px-0 py-0">
        {notice && (
          <div
            className="mb-3 flex items-center justify-between rounded-lg bg-[#006b73]/6 px-4 py-2.5 text-xs text-[#006b73]"
            role="status"
          >
            <span>{notice}</span>
            <button
              type="button"
              onClick={() => setNotice("")}
              aria-label="Dismiss notification"
            >
              <X size={15} />
            </button>
          </div>
        )}
        <div className="chat-window flex min-h-0 flex-1 overflow-hidden border-y border-[#dfe5df] bg-white">
          <section
            className={`${mobileView === "chat" ? "hidden" : "flex"} inbox-panel w-full shrink-0 flex-col border-r border-[#424a4c]/15 sm:flex sm:w-80 lg:w-96`}
            aria-label="Conversation list"
          >
            <header className="border-b border-[#424a4c]/10 px-4 pb-4 pt-5 sm:px-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#006b73]">
                    Community
                  </p>
                  <h1 className="text-2xl font-black tracking-tight">
                    Messages
                  </h1>
                </div>
                <button
                  type="button"
                  onClick={() => setNewMessageOpen(true)}
                  className="grid h-9 w-9 place-items-center rounded-full text-xl text-[#00634b] hover:bg-[#006b73]/9"
                  aria-label="New message"
                >
                  <Plus size={18} />
                </button>
              </div>
              <div className="relative mt-4">
                <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#424a4c]/45" />
                <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search conversations"
                className="w-full rounded-lg border-0 bg-[#424a4c]/6 py-2.5 pl-9 pr-3 text-xs outline-none focus:bg-white focus:ring-2 focus:ring-[#006b73]/20"
                />
              </div>
              <div className="mt-5 flex items-center gap-4 overflow-hidden" aria-label="Active contacts">
                {conversations.slice(0, 3).map((conversation) => (
                  <button
                    type="button"
                    key={conversation.name}
                    onClick={() => openConversation(conversation)}
                    className="flex shrink-0 flex-col items-center gap-1.5"
                  >
                    <span className="rounded-full border-2 border-[#00634b] p-0.5">
                      <Avatar person={conversation} />
                    </span>
                    <span className="max-w-16 truncate text-[10px] text-[#424a4c]/65">
                      {conversation.name.split(" ")[0]}
                    </span>
                  </button>
                ))}
              </div>
            </header>
            <div className="flex-1 overflow-y-auto">
              {filtered.length === 0 && (
                <p className="p-6 text-center text-xs text-[#424a4c]/50">
                  No conversations available.
                </p>
              )}
              {filtered.map((conversation) => (
                <button
                  type="button"
                  key={conversation.name}
                  onClick={() => openConversation(conversation)}
                  className={`flex w-full gap-3 border-b border-[#424a4c]/[0.07] px-4 py-4 text-left transition hover:bg-[#006b73]/[0.035] sm:px-5 ${activeConversation?.name === conversation.name ? "bg-[#006b73]/[0.07]" : ""}`}
                >
                  <Avatar person={conversation} />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <strong className="truncate text-xs">
                        {conversation.name}
                      </strong>
                      <small className="shrink-0 text-[10px] text-[#424a4c]/50">
                        {conversation.time}
                      </small>
                    </span>
                    <span className="mt-1 block truncate text-[11px] text-[#424a4c]/60">
                      {conversation.preview}
                    </span>
                    <span className="mt-1 block text-[10px] font-semibold text-[#00634b]">
                      {conversation.role}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </section>
          <section
            className={`${mobileView === "inbox" ? "hidden" : "flex"} chat-panel min-w-0 flex-1 flex-col sm:flex`}
            aria-label="Active conversation"
          >
            {activeConversation ? (
              <>
                <header className="flex h-18 shrink-0 items-center justify-between border-b border-[#424a4c]/10 px-4 sm:px-6">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => setMobileView("inbox")}
                      className="grid h-8 w-8 place-items-center rounded-full text-2xl text-[#424a4c] sm:hidden"
                      aria-label="Back to inbox"
                    >
                      <ArrowLeft size={16} />
                    </button>
                    <Avatar person={activeConversation} />
                    <div>
                      <h2 className="text-sm font-bold">
                        {activeConversation.name}
                      </h2>
                      <p className="text-[11px] text-[#00634b]">
                        Active now · {activeConversation.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => setNotice("Voice call is ready to start.")}
                      className="grid h-9 w-9 place-items-center rounded-full text-[#424a4c]/70 hover:bg-[#006b73]/9 hover:text-[#006b73]"
                      aria-label="Start voice call"
                    >
                        <Phone size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setNotice("More conversation options opened.")
                      }
                      className="grid h-9 w-9 place-items-center rounded-full text-[#424a4c]/70 hover:bg-[#006b73]/9 hover:text-[#006b73]"
                      aria-label="More options"
                    >
                      <MoreHorizontal size={17} />
                    </button>
                  </div>
                </header>
                <div className="chat-messages flex-1 space-y-6 overflow-y-auto bg-[#fbfcfb] px-4 py-7 sm:px-8">
                  <div className="text-center text-[10px] font-semibold text-[#424a4c]/40">
                    Today, 1:48 PM
                  </div>
                  {messages.map((message, index) => (
                    <div
                      key={`${message.time}-${index}`}
                      className={`flex ${message.type === "sent" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex max-w-[84%] flex-col ${message.type === "sent" ? "items-end" : "items-start"} sm:max-w-[62%]`}
                      >
                        <span className="mb-1 text-[10px] font-semibold text-[#424a4c]/50">
                          {message.author}
                        </span>
                        <div
                          className={`rounded-2xl px-4 py-3 text-xs leading-5 ${message.type === "sent" ? "rounded-br-sm bg-[#006b73] text-white" : "rounded-bl-sm bg-[#424a4c]/10"}`}
                        >
                          {message.text}
                        </div>
                        <span className="mt-1 text-[10px] text-[#424a4c]/40">
                          {message.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <form
                  onSubmit={sendMessage}
                  className="flex shrink-0 items-center gap-2 border-t border-[#424a4c]/10 bg-white p-3 sm:p-4"
                >
                  <button
                    type="button"
                    onClick={() => setNotice("Attach a file to your message.")}
                    className="grid h-9 w-9 place-items-center rounded-full text-lg text-[#424a4c]/70 hover:bg-[#006b73]/9 hover:text-[#006b73]"
                    aria-label="Attach file"
                  >
                    <Paperclip size={16} />
                  </button>
                  <input
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    placeholder="Type a message..."
                    className="min-w-0 flex-1 rounded-full border border-[#424a4c]/15 bg-[#424a4c]/4 px-4 py-3 text-xs outline-none focus:border-[#006b73] focus:bg-white focus:ring-2 focus:ring-[#006b73]/15"
                  />
                  <button
                    type="submit"
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#00634b] text-sm text-white hover:bg-[#004c3a]"
                    aria-label="Send message"
                  >
                    <Send size={16} />
                  </button>
                </form>
              </>
            ) : (
              <div className="chat-empty-state flex flex-1 flex-col items-center justify-center px-6 text-center">
                <div className="mb-6 grid h-24 w-24 place-items-center rounded-full border-2 border-[#424a4c]/70 bg-[#006b73]/3 text-4xl text-[#424a4c]">
                  <MessageCircle size={34} />
                </div>
                <h2 className="text-xl font-semibold text-[#424a4c]">
                  Your messages
                </h2>
                <p className="mt-2 max-w-xs text-sm leading-6 text-[#424a4c]/60">
                  Send private messages to a friend or group.
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setNotice(
                      "Select a conversation from your inbox to start messaging.",
                    )
                  }
                  className="mt-5 rounded-lg bg-[#006b73] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#00545b]"
                >
                  Send message
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
      {newMessageOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#424a4c]/35 p-4">
          <section
            className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="new-message-title"
          >
            <header className="flex items-center justify-between border-b border-[#424a4c]/15 px-5 py-4">
              <h2
                id="new-message-title"
                className="text-sm font-bold text-[#424a4c]"
              >
                New message
              </h2>
              <button
                type="button"
                onClick={() => setNewMessageOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full text-lg text-[#424a4c]/70 hover:bg-[#006b73]/9 hover:text-[#006b73]"
                aria-label="Close new message"
              >
                <X size={17} />
              </button>
            </header>
            <div className="flex items-center gap-3 border-b border-[#424a4c]/10 px-5 py-3">
              <label
                htmlFor="recipient"
                className="text-xs font-bold text-[#424a4c]"
              >
                To:
              </label>
              <input
                id="recipient"
                value={recipientSearch}
                onChange={(event) => setRecipientSearch(event.target.value)}
                autoFocus
                placeholder="Search people"
                className="min-w-0 flex-1 border-0 text-xs outline-none focus:ring-0"
              />
            </div>
            <div className="min-h-48 px-5 py-5">
              {recipientSearch && conversations.length > 0 ? (
                <button
                  type="button"
                  onClick={() => {
                    openConversation(conversations.find((conversation) => conversation.name.toLowerCase().includes(recipientSearch.toLowerCase())) || conversations[0]);
                    setNewMessageOpen(false);
                    setRecipientSearch("");
                  }}
                  className="flex w-full items-center gap-3 rounded-lg p-3 text-left hover:bg-[#006b73]/6"
                >
                  <Avatar person={conversations[0]} />
                  <span>
                    <strong className="block text-xs">
                      {conversations[0].name}
                    </strong>
                    <small className="text-[11px] text-[#424a4c]/60">
                      {conversations[0].role}
                    </small>
                  </span>
                </button>
              ) : (
                <p className="text-center text-xs text-[#424a4c]/50">
                  Search for someone to start a conversation.
                </p>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default Chat;
