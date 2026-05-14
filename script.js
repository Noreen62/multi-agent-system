document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const chatMessages = document.getElementById('chat-messages');

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') sendMessage();
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        // Disable input while processing
        userInput.disabled = true;
        sendBtn.disabled = true;
        sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

        // Add user message
        window.MultiAgentSystem.addUserMessage(message);

        // Clear input
        userInput.value = '';

        // Process with Multi-Agent System
        window.MultiAgentSystem.processQuery(message)
            .finally(() => {
                // Re-enable input
                userInput.disabled = false;
                sendBtn.disabled = false;
                sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
            });
    }

    // Welcome message
    window.MultiAgentSystem.addAgentMessage(
        "🚀 Multi-Agent System ready! Ask me anything about business, tech, or analysis."
    );
});