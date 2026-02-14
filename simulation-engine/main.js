const fs = require('fs');
const path = require('path');
const { LorenzSystem } = require('./core/lorenz');
const { SVGBuilder } = require('./generators/svg-builder');

// Configuration
const OUTPUT_DIR = path.join(__dirname, '../assets');
const OUTPUT_FILE = 'lorenz-attractor.svg';

function main() {
    console.log("Starting Simulation Engine...");

    // 1. Initialize Physics Core
    const physics = new LorenzSystem();
    console.log("Simulating physics...");
    const trajectory = physics.simulate(15000); // Generate 15k points

    // 2. Initialize Visual Generator
    const builder = new SVGBuilder(800, 600);
    console.log("Projecting 3D to 2D...");
    
    // Project with specific artistic values
    builder.project(trajectory, 11, 0.1); 

    // 3. Build Artifact
    const svgContent = builder.build();

    // 4. Write Output
    if (!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }
    
    fs.writeFileSync(path.join(OUTPUT_DIR, OUTPUT_FILE), svgContent);
    console.log(`Artifact generated successfully at: ${path.join(OUTPUT_DIR, OUTPUT_FILE)}`);
}

main();
