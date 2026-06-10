# pi-latex-unicode-fix

A Pi extension that intercepts assistant messages and replaces LaTeX symbols (e.g., `\downarrow`) with their Unicode equivalents (e.g., `↓`). This ensures that models like Gemma, which use LaTeX for symbols, render correctly in the Pi TUI.

## Features

- **Automatic Conversion**: Automatically replaces common LaTeX math, arrow, and Greek symbols.
- **Toggle Command**: Use `/latex-toggle` to enable or disable conversion on the fly.
- **Low Overhead**: Uses a simple regex replacement during the `message_end` event.

## Installation

### Manual Installation
1. Clone this repository to `~/.pi/agent/extensions/`:
   ```bash
   git clone https://github.com/cosmicnag/pi-latex-unicode-fix.git ~/.pi/agent/extensions/pi-latex-unicode-fix
   ```
2. Restart Pi or run `/reload`.

### Via settings.json
Add the path to your `~/.pi/agent/settings.json`:
```json
{
  "extensions": [
    "/path/to/pi-latex-unicode-fix/src/index.ts"
  ]
}
```

## Usage

The extension is enabled by default. To toggle it:
- Type `/latex-toggle` in the Pi chat.

**Important**: This extension should only be turned ON when using Gemma or any other models known to output LaTeX for simple symbols. For models that output standard Unicode, keep it OFF to avoid unintended replacements.

## Supported Symbols

| Category | LaTeX Command | Unicode |
| :--- | :--- | :--- |
| **Arrows** | `\downarrow` | ↓ |
| | `\uparrow` | ↑ |
| | `\rightarrow`, `\to` | → |
| | `\leftarrow` | ← |
| | `\Rightarrow` | ⇒ |
| | `\Leftarrow` | ⇐ |
| | `\Leftrightarrow` | ⇔ |
| **Math** | `\approx` | ≈ |
| | `\neq` | ≠ |
| | `\leq`, `\le` | ≤ |
| | `\geq`, `\ge` | ≥ |
| | `\dots` | … |
| | `\pm` | ± |
| | `\times` | × |
| | `\div` | ÷ |
| **Greek** | `\alpha` $\dots$ `\omega` | α $\dots$ ω |

*(Full Greek alphabet supported: $\alpha, \beta, \gamma, \delta, \epsilon, \zeta, \eta, \theta, \iota, \kappa, \lambda, \mu, \nu, \xi, \omicron, \pi, \rho, \sigma, \tau, \upsilon, \phi, \chi, \psi, \omega$)*

## License

MIT
