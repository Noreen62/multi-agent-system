// Multi-Agent System - Frontend Implementation
class MultiAgentSystem {
    constructor() {
        this.agents = {
            research: new ResearchAgent(),
            analysis: new AnalysisAgent(),
            response: new ResponseAgent()
        };
        this.communicationLog = [];
        this.currentTaskId = 0;
    }

    async processQuery(userQuery) {
        const taskId = ++this.currentTaskId;
        this.addSystemMessage(`Task ${taskId} started: "${userQuery}"`);

        try {
            // Step 1: Research Agent
            this.updateAgentStatus('research', 'active');
            const researchData = await this.agents.research.process(userQuery, taskId);
            this.addCommLog(`📊 Research Agent → Analysis Agent: ${researchData.summary}`);
            
            // Step 2: Analysis Agent
            this.updateAgentStatus('analysis', 'active');
            const analysisResult = await this.agents.analysis.process(researchData, taskId);
            this.addCommLog(`🔍 Analysis Agent → Response Agent: ${analysisResult.insights}`);
            
            // Step 3: Response Agent
            this.updateAgentStatus('response', 'active');
            const finalResponse = await this.agents.response.process(analysisResult, taskId);
            
            this.addAgentMessage(finalResponse);
            this.resetAgentStatus();
            
            return finalResponse;
        } catch (error) {
            this.addSystemMessage(`❌ Error in task ${taskId}: ${error.message}`);
            this.resetAgentStatus();
        }
    }

    addUserMessage(message) {
        const messagesDiv = document.getElementById('chat-messages');
        messagesDiv.innerHTML += `
            <div class="message user">${message}</div>
        `;
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    addAgentMessage(message) {
        const messagesDiv = document.getElementById('chat-messages');
        messagesDiv.innerHTML += `
            <div class="message agent">
                <strong>🤖 Multi-Agent System:</strong><br>${message}
            </div>
        `;
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    addSystemMessage(message) {
        const messagesDiv = document.getElementById('chat-messages');
        messagesDiv.innerHTML += `
            <div class="message system">${message}</div>
        `;
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    addCommLog(message) {
        this.communicationLog.push(`${new Date().toLocaleTimeString()}: ${message}`);
        const logDiv = document.getElementById('comm-log');
        logDiv.innerHTML += `
            <div class="log-entry">${message}</div>
        `;
        logDiv.scrollTop = logDiv.scrollHeight;
    }

    updateAgentStatus(agentName, status) {
        const agentDiv = document.querySelector(`.agent.${agentName}`);
        const statusDot = agentDiv.querySelector('.status');
        
        document.querySelectorAll('.agent').forEach(el => el.classList.remove('active'));
        agentDiv.classList.add('active');
        statusDot.classList.add('active');
    }

    resetAgentStatus() {
        document.querySelectorAll('.agent').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.status').forEach(dot => dot.classList.remove('active'));
    }
}

// Individual Agents
class ResearchAgent {
    async process(query, taskId) {
        // Simulate research (in real app, call external APIs)
        await this.simulateDelay(1000);
        return {
            summary: `Researched "${query}". Found 5 key sources with 1200+ data points.`,
            rawData: [
                "Trend 1: AI adoption up 45%",
                "Trend 2: Cloud spending $200B",
                "Trend 3: Automation ROI 300%"
            ]
        };
    }

    simulateDelay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

class AnalysisAgent {
    async process(researchData, taskId) {
        await this.simulateDelay(800);
        return {
            insights: "Analyzed data patterns. Key insight: AI + Cloud = 3x growth opportunity.",
            metrics: {
                growth: "45%",
                roi: "300%",
                marketSize: "$200B"
            }
        };
    }

    simulateDelay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

class ResponseAgent {
    async process(analysisResult, taskId) {
        await this.simulateDelay(500);
        return `
            ✅ **Final Analysis Complete!**
            
            **Key Findings:**
            - Growth Rate: ${analysisResult.metrics.growth}
            - Market Size: $${analysisResult.metrics.marketSize}
            - ROI Potential: ${analysisResult.metrics.roi}
            
            **Recommendation:** Invest in AI-Cloud integration for maximum returns.
            
            *Task ${taskId} completed successfully.*
        `;
    }

    simulateDelay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Global instance
window.MultiAgentSystem = new MultiAgentSystem();