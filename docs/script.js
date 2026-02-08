const output = document.getElementById('output');
const input = document.getElementById('command-input');

// ASCII Animation Frames
const rabbitFrames = [
    // Frame 0: Rabbit at start, Cactus appear
    `
           (\\___/)
           ( o o )                    🌵
    _______(  > <)_____________________________________
    `,
    // Frame 1: Rabbit approaches
    `
             (\\___/)
             ( o o )                  🌵
    _________(  > <)___________________________________
    `,
    // Frame 2: Rabbit Crouch (Prepare Jump)
    `
             (\\___/)
             ( ^ ^ )                  🌵
    _________(  > <)___________________________________
    `,
     // Frame 3: Rabbit Jump UP (Launch)
    `
             /| /|
             ( ^ ^ )
             (  > <)                  🌵
    ___________________________________________________
    `,
    // Frame 4: Rabbit Over Cactus (WIND EFFECT)
    `
                      /| /|   ~ ~ ~
                      ( o o )  ~ ~ ~  (WHOOSH)
                      (  > <)         🌵
    ___________________________________________________
    `,
    // Frame 5: Rabbit Descent
    `
                                      /| /|
                                      ( ^ ^ )
    __________________________🌵______(  > <)__________
    `,
    // Frame 6: Hole appears ahead
    `
                                        (\\___/)
                 _______                ( o o )
               /         \\       🌵     (  > <)
    __________/           \\_____________(  > <)________
              |           |
               \\_______/
    `,
    // Frame 7: Rabbit looks at hole
    `
                 _______                  (\\___/)
               /         \\       🌵       ( o o )
    __________/  _______  \\_______________(  > <)______
              | /       \\ |
               \\_______/
    `,
    // Frame 8: Rabbit Jumps In
    `
                 _______        (\\___/)
               / (\\___/) \\      ( ^ ^ )    🌵
    __________/  ( ^ ^ )  \\_____(  > <)________________
              | /(  > <)\\ |
               \\_______/
    `,
    // Frame 9: Falling
    `
                 _______  
               /         \\       🌵
    __________/  _______  \\____________________________
              | / (\\_/) \\ |
               \\__( o )__/
    `,
    // Frame 10: Deeper
    `
                 _______  
               /         \\       🌵
    __________/  _______  \\____________________________
              | /   .   \\ |
               \\_______/
    `
];

const commands = {
    help: {
        desc: 'List available commands',
        action: () => printOutput(`
AVAILABLE COMMANDS:
  help      : Show this help message
  projects  : List tactical systems
  contact   : Establish uplinks
  whoami    : Identify user
  clear     : Clear terminal
  matrix    : [CLASSIFIED]
`)
    },
    ask: {
        desc: 'Alias for help',
        action: () => commands.help.action()
    },
    projects: {
        desc: 'List tactical systems',
        action: () => printOutput(`
TACTICAL SYSTEMS:
  > Project 1: [Data_Science_GitFlow]
    - Status: Operational
    - Link: https://github.com/MaykonAdriell/Data_science_git-flow_proposal_-ex1-

  > Project 2: [EducAI-Gyn]
    - Status: Deployed
    - Link: https://github.com/Omniamind-org/educai-gyn

  > System Kernel: [MaykonAdriell]
    - Status: Self-Replicating
    - Link: https://github.com/MaykonAdriell
`)
    },
    contact: {
        desc: 'Establish uplinks',
        action: () => printOutput(`
UPLINKS ESTABLISHED:
  > GitHub:   @MaykonAdriell
  > LinkedIn: Maykon Adriell Dutra [Obfuscated Link]
    (https://www.linkedin.com/in/maykon-adriell-dutra-765504378)
  > Email:    maykonadriell.ef@gmail.com
`)
    },
    whoami: {
        desc: 'Identify user',
        action: () => printOutput(`
USER IDENTITY:
  Role: System Architect / Data Engineer
  Mission: Transmute chaos into observable systems.
  Status: Awake.
`)
    },
    clear: {
        desc: 'Clear terminal',
        action: () => output.innerHTML = ''
    },
    matrix: {
        desc: '???',
        action: () => playMatrixAnimation()
    }
};

function printOutput(text, style = '') {
    const div = document.createElement('div');
    div.className = 'command-output ' + style;
    div.innerText = text; // safety
    output.appendChild(div);
    window.scrollTo(0, document.body.scrollHeight);
}

function playMatrixAnimation() {
    input.disabled = true; // Lock input
    output.innerHTML = ''; // Clear screen for focus
    
    let frameIndex = 0;
    const animContainer = document.createElement('div');
    animContainer.className = 'command-output sys-msg';
    animContainer.style.whiteSpace = 'pre'; // Preserve spacing for ASCII
    animContainer.style.lineHeight = '1.2';
    animContainer.style.display = 'flex';
    animContainer.style.justifyContent = 'center';
    animContainer.style.alignItems = 'center';
    animContainer.style.height = '100%';
    output.appendChild(animContainer);

    const interval = setInterval(() => {
        if (frameIndex >= rabbitFrames.length) {
            clearInterval(interval);
            printOutput("\nDisconnecting...", 'error');
            setTimeout(() => {
                window.location.href = "https://github.com/MaykonAdriell";
            }, 1000);
            return;
        }
        animContainer.innerText = rabbitFrames[frameIndex];
        frameIndex++;
    }, 400); // 400ms per frame
}

function printWelcome() {
    printOutput(`
Initializing MaykonAdriell_Kernel v1.0...
Loading Modules... [OK]
Connecting to Neural Net... [OK]

"Wake up, Neo..."

> "Help will always be given to those who ask for it."
`, 'sys-msg');
}

input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const cmd = input.value.trim().toLowerCase();
        
        // Don't print previous command if we are clearing or animating
        if (cmd !== 'clear' && cmd !== 'matrix') {
             printOutput(`guest@maykon-adriell:~$ ${cmd}`);
        }

        if (commands[cmd]) {
            commands[cmd].action();
        } else if (cmd !== '') {
            printOutput(`Command not found: ${cmd}. Type 'help' for assistance.`, 'error');
        }
        
        input.value = '';
    }
});

window.onload = () => {
    printWelcome();
    input.focus();
    document.addEventListener('click', () => input.focus());
};
