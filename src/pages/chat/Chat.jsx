import { useState } from "react";
import EntrepreneurLayout from "../shared/EntrepreneurLayout.jsx";

const conversations = [
  {
    name: "Jorge Apicario",
    role: "Startup founder",
    preview: "The latest investment reports...",
    time: "1:45 PM",
    color: "#006b73",
  },
  {
    name: "Maria Elena",
    role: "Co-founder",
    preview: "We should schedule a call...",
    time: "Yesterday",
    color: "#00634b",
  },
  {
    name: "Tech Founders Hub",
    role: "Community",
    preview: "New updates are available.",
    time: "Mon",
    color: "#424a4c",
  },
  {
    name: "Foundy Support",
    role: "Support team",
    preview: "How can we help you?",
    time: "Sun",
    color: "#2d8a8a",
  },
];

const initialMessages = [
  {
    author: "Jorge Apicario",
    text: "Hi! I have just uploaded the latest investment reports for the Foundy project.",
    type: "received",
    time: "1:48 PM",
  },
  {
    author: "You",
    text: "The quarterly statistics are ready for review. I was just checking it, looking solid!",
    type: "sent",
    time: "1:50 PM",
  },
  {
    author: "Jorge Apicario",
    text: "Great. Let's schedule a call tomorrow to discuss the scaling plan?",
    type: "received",
    time: "1:52 PM",
  },
];

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

function Chat({ user = "Entrepreneur", onBackHome, onOpenProjects, onCerrarSesion, onOpenCreateProject, onOpenStatistics, onOpenSettings, onOpenFoundyCard }) {
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");
  const [mobileView, setMobileView] = useState("inbox");
  const [newMessageOpen, setNewMessageOpen] = useState(false);
  const [recipientSearch, setRecipientSearch] = useState("");
  const filtered = conversations.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  const sendMessage = (event) => {
    event.preventDefault();
    if (!draft.trim()) return;
    setMessages([
      ...messages,
      { author: "You", text: draft.trim(), type: "sent", time: "Now" },
    ]);
    setDraft("");
  };

  return (
    <EntrepreneurLayout active="chat" user={user} onBackHome={onBackHome} onOpenProjects={onOpenProjects} onOpenCreateProject={onOpenCreateProject} onOpenStatistics={onOpenStatistics} onOpenChat={() => {}} onOpenSettings={onOpenSettings} onOpenFoundyCard={onOpenFoundyCard} onCerrarSesion={onCerrarSesion} onNotice={setNotice}>
      <div className="chat-shell flex min-h-[calc(100vh-4rem)] flex-col bg-white text-[#424a4c]">
      <main className="mx-auto flex min-h-0 w-full max-w-[1380px] flex-1 flex-col px-3 py-3 sm:px-5 sm:py-5 lg:px-8">
        {notice && (
          <div
            className="mb-3 flex items-center justify-between rounded-lg bg-[#006b73]/[0.06] px-4 py-2.5 text-xs text-[#006b73]"
            role="status"
          >
            <span>{notice}</span>
            <button
              type="button"
              onClick={() => setNotice("")}
              aria-label="Dismiss notification"
            >
              ×
            </button>
          </div>
        )}
        <div className="chat-window flex min-h-0 flex-1 overflow-hidden rounded-xl border border-[#424a4c]/15 bg-white shadow-[0_12px_35px_rgba(20,65,65,0.07)]">
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
                  className="grid h-9 w-9 place-items-center rounded-full text-xl text-[#00634b] hover:bg-[#006b73]/[0.09]"
                  aria-label="New message"
                >
                  +
                </button>
              </div>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search conversations"
                className="mt-4 w-full rounded-lg border-0 bg-[#424a4c]/[0.06] px-3 py-2.5 text-xs outline-none focus:bg-white focus:ring-2 focus:ring-[#006b73]/20"
              />
              <div
                className="mt-5 flex items-center gap-4 overflow-hidden"
                aria-label="Active contacts"
              >
                {conversations.slice(0, 3).map((conversation) => (
                  <button
                    type="button"
                    key={conversation.name}
                    onClick={() => {
                      setActiveConversation(conversation);
                      setMobileView("chat");
                    }}
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
              {filtered.map((conversation) => (
                <button
                  type="button"
                  key={conversation.name}
                  onClick={() => {
                    setActiveConversation(conversation);
                    setMobileView("chat");
                  }}
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
            <button
              type="button"
              onClick={() => setNewMessageOpen(true)}
              className="m-4 rounded-lg bg-[#00634b] px-4 py-3 text-xs font-bold text-white hover:bg-[#004c3a]"
            >
              + New message
            </button>
          </section>
          <section
            className={`${mobileView === "inbox" ? "hidden" : "flex"} chat-panel min-w-0 flex-1 flex-col sm:flex`}
            aria-label="Active conversation"
          >
            {activeConversation ? (
              <>
                <header className="flex h-[4.5rem] shrink-0 items-center justify-between border-b border-[#424a4c]/10 px-4 sm:px-6">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => setMobileView("inbox")}
                      className="grid h-8 w-8 place-items-center rounded-full text-2xl text-[#424a4c] sm:hidden"
                      aria-label="Back to inbox"
                    >
                      ‹
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
                      className="grid h-9 w-9 place-items-center rounded-full text-[#424a4c]/70 hover:bg-[#006b73]/[0.09] hover:text-[#006b73]"
                      aria-label="Start voice call"
                    >
                      ⌕
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setNotice("More conversation options opened.")
                      }
                      className="grid h-9 w-9 place-items-center rounded-full text-[#424a4c]/70 hover:bg-[#006b73]/[0.09] hover:text-[#006b73]"
                      aria-label="More options"
                    >
                      •••
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
                    className="grid h-9 w-9 place-items-center rounded-full text-lg text-[#424a4c]/70 hover:bg-[#006b73]/[0.09] hover:text-[#006b73]"
                    aria-label="Attach file"
                  >
                    ⊕
                  </button>
                  <input
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    placeholder="Type a message..."
                    className="min-w-0 flex-1 rounded-full border border-[#424a4c]/15 bg-[#424a4c]/[0.04] px-4 py-3 text-xs outline-none focus:border-[#006b73] focus:bg-white focus:ring-2 focus:ring-[#006b73]/15"
                  />
                  <button
                    type="submit"
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#00634b] text-sm text-white hover:bg-[#004c3a]"
                    aria-label="Send message"
                  >
                    ➤
                  </button>
                </form>
              </>
            ) : (
              <div className="chat-empty-state flex flex-1 flex-col items-center justify-center px-6 text-center">
                <div className="mb-6 grid h-24 w-24 place-items-center rounded-full border-2 border-[#424a4c]/70 bg-[#006b73]/[0.03] text-4xl text-[#424a4c]">
                  ✈
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
                className="grid h-9 w-9 place-items-center rounded-full text-lg text-[#424a4c]/70 hover:bg-[#006b73]/[0.09] hover:text-[#006b73]"
                aria-label="Close new message"
              >
                ×
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
              {recipientSearch ? (
                <button
                  type="button"
                  onClick={() => {
                    setActiveConversation(conversations[0]);
                    setNewMessageOpen(false);
                    setMobileView("chat");
                    setRecipientSearch("");
                  }}
                  className="flex w-full items-center gap-3 rounded-lg p-3 text-left hover:bg-[#006b73]/[0.06]"
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
    </EntrepreneurLayout>
  );
}

export default Chat;
