import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

const LATEX_MAP: Record<string, string> = {
  "\\downarrow": "↓",
  "\\uparrow": "↑",
  "\\rightarrow": "→",
  "\\to": "→",
  "\\leftarrow": "←",
  "\\Rightarrow": "⇒",
  "\\Leftarrow": "⇐",
  "\\Leftrightarrow": "⇔",
  "\\approx": "≈",
  "\\neq": "≠",
  "\\leq": "≤",
  "\\le": "≤",
  "\\geq": "≥",
  "\\ge": "≥",
  "\\dots": "…",
  "\\pm": "±",
  "\\times": "×",
  "\\div": "÷",
  "\\alpha": "α",
  "\\beta": "β",
  "\\gamma": "γ",
  "\\delta": "δ",
  "\\epsilon": "ε",
  "\\zeta": "ζ",
  "\\eta": "η",
  "\\theta": "θ",
  "\\iota": "ι",
  "\\kappa": "κ",
  "\\lambda": "λ",
  "\\mu": "μ",
  "\\nu": "ν",
  "\\xi": "ξ",
  "\\omicron": "ο",
  "\\pi": "π",
  "\\rho": "ρ",
  "\\sigma": "σ",
  "\\tau": "τ",
  "\\upsilon": "υ",
  "\\phi": "φ",
  "\\chi": "χ",
  "\\psi": "ψ",
  "\\omega": "ω",
};

const latexRegex = new RegExp(
  `\\$*\\s*(${Object.keys(LATEX_MAP)
    .map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|')})\\s*\\$*`,
  'g'
);

export default function (pi: ExtensionAPI) {
  let enabled = true;

  pi.registerCommand("latex-toggle", {
    description: "Toggle LaTeX to Unicode conversion",
    handler: async (_args, ctx) => {
      enabled = !enabled;
      ctx.ui.notify(`LaTeX conversion: ${enabled ? "ON" : "OFF"}`, "info");
    },
  });

  pi.on("message_end", async (event, ctx) => {
    if (!enabled || event.message.role !== "assistant") return;

    const content = event.message.content.map((block) => {
      if (block.type === "text") {
        const text = block.text.replace(latexRegex, (_, command) => LATEX_MAP[command] || command);
        return { ...block, text };
      }
      return block;
    });

    return {
      message: {
        ...event.message,
        content,
      },
    };
  });
}
