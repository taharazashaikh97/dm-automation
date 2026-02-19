// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Mobile Menu Toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('bg-slate-950/80', 'backdrop-blur-md', 'border-b', 'border-slate-800');
    } else {
        navbar.classList.remove('bg-slate-950/80', 'backdrop-blur-md', 'border-b', 'border-slate-800');
    }
});

// Hero Chat Simulation
const chatMessages = [
    { type: 'user', text: "Hi! I'm interested in your coaching program", delay: 1000 },
    { type: 'ai', text: "Hey there! 👋 I'd love to help you with that. Are you looking for 1-on-1 coaching or group sessions?", delay: 2000 },
    { type: 'user', text: "1-on-1 would be better. What's your availability?", delay: 3500 },
    { type: 'ai', text: "Perfect! I have slots open next Tuesday and Thursday. What time zone are you in? 📅", delay: 5000 },
    { type: 'user', text: "PST - Thursday works!", delay: 6500 },
    { type: 'ai', text: "Great! I've sent you a calendar link for Thursday 2pm PST. Looking forward to chatting! 🚀", delay: 8000 }
];

function simulateHeroChat() {
    const container = document.getElementById('chat-container');
    const indicator = document.getElementById('typing-indicator');
    const inputText = document.getElementById('input-text');
    
    container.innerHTML = '';
    
    chatMessages.forEach((msg, index) => {
        setTimeout(() => {
            if (msg.type === 'ai') {
                indicator.classList.remove('hidden');
                inputText.textContent = 'AutoDM is typing...';
                
                setTimeout(() => {
                    indicator.classList.add('hidden');
                    inputText.textContent = 'Type a message...';
                    addMessage(container, msg.text, 'ai');
                }, 1500);
            } else {
                addMessage(container, msg.text, 'user');
            }
        }, msg.delay);
    });

    // Loop the animation
    setTimeout(simulateHeroChat, 12000);
}

function addMessage(container, text, type) {
    const div = document.createElement('div');
    div.className = `flex ${type === 'user' ? 'justify-end' : 'justify-start'} message-enter`;
    
    const bubble = document.createElement('div');
    bubble.className = `max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
        type === 'user' 
            ? 'bg-indigo-600 text-white rounded-br-md' 
            : 'bg-slate-800 text-slate-200 rounded-bl-md border border-slate-700'
    }`;
    bubble.textContent = text;
    
    div.appendChild(bubble);
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

// Initialize hero chat
simulateHeroChat();

// Stats Marquee
const stats = [
    { label: "Messages Automated", value: "2.4M+" },
    { label: "Response Time", value: "<2s" },
    { label: "Customer Satisfaction", value: "98%" },
    { label: "Time Saved", value: "40k hrs" },
    { label: "Active Users", value: "2,000+" },
    { label: "Platforms", value: "15+" }
];

const marquee = document.getElementById('stats-marquee');
stats.forEach(stat => {
    const item = document.createElement('div');
    item.className = 'inline-flex items-center mx-8';
    item.innerHTML = `
        <span class="text-2xl font-bold text-white mr-2">${stat.value}</span>
        <span class="text-slate-400 text-sm uppercase tracking-wider">${stat.label}</span>
    `;
    marquee.appendChild(item);
});

// Clone for seamless loop
stats.forEach(stat => {
    const item = document.createElement('div');
    item.className = 'inline-flex items-center mx-8';
    item.innerHTML = `
        <span class="text-2xl font-bold text-white mr-2">${stat.value}</span>
        <span class="text-slate-400 text-sm uppercase tracking-wider">${stat.label}</span>
    `;
    marquee.appendChild(item);
});

// Demo Scenarios
const scenarios = {
    sales: [
        { sender: 'user', text: "Hey! I saw your post about the marketing course. Is it still available?" },
        { sender: 'ai', text: "Hi! Yes, the course is currently open for enrollment! 🎉 Are you looking to improve your social media strategy or overall digital marketing?" },
        { sender: 'user', text: "Social media mainly. I run a small business." },
        { sender: 'ai', text: "Perfect! The course has a dedicated module on social media for small businesses. What's your biggest challenge right now - content creation or audience growth?" },
        { sender: 'user', text: "Content creation takes too much time" },
        { sender: 'ai', text: "I totally understand! The course includes templates and AI workflows that can cut your content time by 70%. Would you like me to send you the curriculum and pricing?" },
        { sender: 'user', text: "Yes please!" },
        { sender: 'ai', text: "Sent! 📧 Check your DMs for the detailed breakdown. I also included a 20% early-bird discount that expires tonight. Any questions about the content?", action: 'sent' }
    ],
    support: [
        { sender: 'user', text: "My login isn't working, help!" },
        { sender: 'ai', text: "I'm sorry to hear that! Let me help you right away. Are you getting a specific error message?" },
        { sender: 'user', text: "It says 'invalid credentials' but I'm sure my password is right" },
        { sender: 'ai', text: "Got it. This usually happens after password updates. Can you try clearing your browser cache or using incognito mode?" },
        { sender: 'user', text: "Incognito worked! Thanks" },
        { sender: 'ai', text: "Awesome! 🎉 For future reference, you might want to fully log out and log back in on your regular browser. Is there anything else I can help with?" }
    ],
    booking: [
        { sender: 'user', text: "Can I book a consultation?" },
        { sender: 'ai', text: "Absolutely! I'd love to chat. What type of consultation are you looking for? Strategy, Technical Setup, or Content Review?" },
        { sender: 'user', text: "Strategy please" },
        { sender: 'ai', text: "Perfect! I have availability this Wednesday at 10am or Friday at 2pm (EST). Which works better for you?" },
        { sender: 'user', text: "Wednesday 10am" },
        { sender: 'ai', text: "Great choice! 🗓️ I've held that slot for you. Please confirm your email so I can send the calendar invite and Zoom link.", action: 'booking' }
    ]
};

let currentScenario = 'sales';
let demoSpeed = 1;
let demoInterval;

function playScenario(scenario) {
    currentScenario = scenario;
    document.getElementById('scenario-name').textContent = 
        scenario === 'sales' ? 'Sales Qualification' : 
        scenario === 'support' ? 'Customer Support' : 'Appointment Booking';
    restartDemo();
}

function restartDemo() {
    clearInterval(demoInterval);
    const container = document.getElementById('demo-chat');
    container.innerHTML = '';
    
    const messages = scenarios[currentScenario];
    let index = 0;
    
    function addDemoMessage() {
        if (index >= messages.length) return;
        
        const msg = messages[index];
        const div = document.createElement('div');
        div.className = `flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} message-enter`;
        
        const content = document.createElement('div');
        content.className = `max-w-[85%] px-4 py-3 rounded-xl text-sm ${
            msg.sender === 'user' 
                ? 'bg-indigo-600 text-white rounded-br-md' 
                : 'bg-slate-800 text-slate-200 rounded-bl-md border border-slate-700'
        }`;
        
        if (msg.sender === 'ai') {
            // Typewriter effect for AI
            content.innerHTML = '<span class="typing-text"></span>';
            div.appendChild(content);
            container.appendChild(div);
            
            const textSpan = content.querySelector('.typing-text');
            let charIndex = 0;
            const text = msg.text;
            
            const typeInterval = setInterval(() => {
                if (charIndex < text.length) {
                    textSpan.textContent += text[charIndex];
                    charIndex++;
                    container.scrollTop = container.scrollHeight;
                } else {
                    clearInterval(typeInterval);
                    if (msg.action) {
                        const badge = document.createElement('div');
                        badge.className = 'mt-2 inline-flex items-center gap-1 text-xs text-green-400';
                        badge.innerHTML = '<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg> Action completed';
                        content.appendChild(badge);
                    }
                }
            }, 20 / demoSpeed);
        } else {
            content.textContent = msg.text;
            div.appendChild(content);
            container.appendChild(div);
        }
        
        container.scrollTop = container.scrollHeight;
        index++;
        
        const delay = msg.sender === 'ai' ? (msg.text.length * 20 + 1000) / demoSpeed : 1500 / demoSpeed;
        demoInterval = setTimeout(addDemoMessage, delay);
    }
    
    addDemoMessage();
}

function toggleSpeed() {
    demoSpeed = demoSpeed === 1 ? 2 : 1;
    document.getElementById('speed-label').textContent = demoSpeed + 'x';
}

// Initialize demo
restartDemo();

// GSAP Animations
gsap.from("#hero-content > *", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power3.out"
});

gsap.from("#hero-visual", {
    x: 50,
    opacity: 0,
    duration: 1,
    delay: 0.5,
    ease: "power3.out"
});

// Scroll triggered animations
gsap.utils.toArray('.glass').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        delay: i * 0.1,
        ease: "power2.out"
    });
});

// Parallax effect on hero
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    gsap.to('#hero-visual', {
        x: mouseX * 20,
        y: mouseY * 20,
        duration: 1,
        ease: "power2.out"
    });
});
