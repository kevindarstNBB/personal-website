const faqData = [
  {
    question: "What services do you offer?",
    answer:
      "I focus on front-end development, design systems, and responsive web experiences.",
    keywords: ["services", "offer", "frontend", "design"],
  },
  {
    question: "Are you available for freelance work?",
    answer:
      "Yes. I take on a limited number of freelance projects each quarter.",
    keywords: ["freelance", "available", "hire", "project"],
  },
  {
    question: "How can I get in touch?",
    answer:
      "Email is the fastest way to reach me. You can also connect on LinkedIn.",
    keywords: ["contact", "email", "reach", "linkedin"],
  },
  {
    question: "Where are you based?",
    answer: "I'm based in Your City and open to remote collaborations.",
    keywords: ["location", "based", "remote", "city"],
  },
];

const chatForm = document.querySelector("[data-chat-form]");
const chatInput = document.querySelector("[data-chat-input]");
const chatOutput = document.querySelector("[data-chat-output]");

const normalize = (text) => text.toLowerCase().replace(/[^a-z0-9\s]/g, "");

const findBestMatch = (query) => {
  const normalizedQuery = normalize(query);

  const keywordMatch = faqData.find((item) =>
    item.keywords.some((keyword) => normalizedQuery.includes(keyword))
  );

  if (keywordMatch) {
    return keywordMatch;
  }

  const questionMatch = faqData.find((item) =>
    normalize(item.question).includes(normalizedQuery)
  );

  return (
    questionMatch || {
      answer:
        "Thanks for your question! I'm still learning. Try asking about services, availability, or how to get in touch.",
    }
  );
};

const appendMessage = (text, type) => {
  const message = document.createElement("p");
  message.classList.add("chat-message", `chat-message-${type}`);
  message.textContent = text;
  chatOutput.appendChild(message);
  chatOutput.scrollTop = chatOutput.scrollHeight;
};

if (chatForm && chatInput && chatOutput) {
  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const question = chatInput.value.trim();

    if (!question) {
      return;
    }

    appendMessage(question, "user");
    const response = findBestMatch(question);
    appendMessage(response.answer, "bot");

    chatInput.value = "";
    chatInput.focus();
  });
}
