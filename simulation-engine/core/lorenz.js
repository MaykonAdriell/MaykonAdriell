/**
 * Lorenz System Physics Core
 * Solves the differential equations for the Lorenz attractor.
 * upgraded to use Runge-Kutta 4th Order (RK4) integration for maximum fidelity.
 */

// Universal Constants for "Standard" Chaos
const SIGMA = 10;
const RHO = 28;
const BETA = 8/3;

class LorenzSystem {
    constructor(x = 0.1, y = 0, z = 0, dt = 0.005) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.dt = dt;
    }

    /**
     * Calculates the derivatives (dx/dt, dy/dt, dz/dt) at a given state.
     */
    getDerivatives(x, y, z) {
        return {
            dx: SIGMA * (y - x),
            dy: x * (RHO - z) - y,
            dz: x * y - BETA * z
        };
    }

    /**
     * Performs a single simulation step using Runge-Kutta 4th Order (RK4).
     * RK4 provides significantly higher accuracy than Euler method primarily by
     * sampling the slope at 4 different points within the time step.
     */
    step() {
        const { x, y, z, dt } = this;

        // k1: Derivatives at the starting point
        const k1 = this.getDerivatives(x, y, z);

        // k2: Derivatives at the midpoint, using k1 to step halfway
        const k2 = this.getDerivatives(
            x + k1.dx * dt * 0.5,
            y + k1.dy * dt * 0.5,
            z + k1.dz * dt * 0.5
        );

        // k3: Another midpoint estimate, using k2
        const k3 = this.getDerivatives(
            x + k2.dx * dt * 0.5,
            y + k2.dy * dt * 0.5,
            z + k2.dz * dt * 0.5
        );

        // k4: Derivatives at the end point, using k3
        const k4 = this.getDerivatives(
            x + k3.dx * dt,
            y + k3.dy * dt,
            z + k3.dz * dt
        );

        // Weighted average of the slopes
        this.x += (k1.dx + 2*k2.dx + 2*k3.dx + k4.dx) * (dt / 6);
        this.y += (k1.dy + 2*k2.dy + 2*k3.dy + k4.dy) * (dt / 6);
        this.z += (k1.dz + 2*k2.dz + 2*k3.dz + k4.dz) * (dt / 6);

        return { x: this.x, y: this.y, z: this.z };
    }

    /**
     * Simulates N steps and returns the trajectory.
     * With RK4, each step is more expensive but we can often use fewer steps 
     * or get much smoother curves for the same dt.
     */
    simulate(steps = 15000, skipTransient = 200) {
        const trajectory = [];
        
        // Skip transient state
        for (let i = 0; i < skipTransient; i++) this.step();

        // Record meaningful data
        for (let i = 0; i < steps; i++) {
            trajectory.push(this.step());
        }

        return trajectory;
    }
}

module.exports = { LorenzSystem };
