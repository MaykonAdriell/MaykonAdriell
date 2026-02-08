const output = document.getElementById('output');
const input = document.getElementById('command-input');

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
  matrix    : ???
`)
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
  > LinkedIn: [Redacted]
  > Email:    [Redacted]
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
        action: () => {
            printOutput("Follow the white rabbit...");
            setTimeout(() => {
                window.location.href = "https://github.com/MaykonAdriell";
            }, 2000);
        }
    }
};

function printOutput(text, style = '') {
    const div = document.createElement('div');
    div.className = 'command-output ' + style;
    div.innerText = text; // safety
    output.appendChild(div);
    window.scrollTo(0, document.body.scrollHeight);
}

function printWelcome() {
    printOutput(`
Initializing MaykonAdriell_Kernel v1.0...
Loading Modules... [OK]
Connecting to Neural Net... [OK]

"Wake up, Neo..."

Type 'help' for available commands.
`, 'sys-msg');
}

input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const cmd = input.value.trim().toLowerCase();
        printOutput(`guest@maykon-adriell:~$ ${cmd}`);
        
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
    
    // Auto-focus input on click
    document.addEventListener('click', () => {
        input.focus();
    });
};
