// Convert HEX to HSL
function hexToHsl(hex) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // gray
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h *= 60;
    }

    return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
}

// Calculate Complementary and Triadic Colors
function calculateHarmonies([h, s, l]) {
    const complementary = [(h + 180) % 360, s, l];
    const triadic1 = [(h + 120) % 360, s, l];
    const triadic2 = [(h + 240) % 360, s, l];

    return { complementary, triadic1, triadic2 };
}

// Convert HSL array to CSS string
function hslToCss([h, s, l]) {
    return `hsl(${h}, ${s}%, ${l}%)`;
}

// Update the DOM
function updateColors() {
    const colorInput = document.getElementById('colorInput');
    const baseHex = document.getElementById('baseHex');
    const complementaryDisplay = document.getElementById('complementaryDisplay');
    const triadic1Display = document.getElementById('triadic1Display');
    const triadic2Display = document.getElementById('triadic2Display');

    const baseHsl = hexToHsl(colorInput.value);
    const harmonies = calculateHarmonies(baseHsl);

    baseHex.textContent = colorInput.value.toUpperCase();
    baseHex.style.backgroundColor = hslToCss(baseHsl);

    complementaryDisplay.textContent = '';
    complementaryDisplay.style.backgroundColor = hslToCss(harmonies.complementary);

    triadic1Display.textContent = '';
    triadic1Display.style.backgroundColor = hslToCss(harmonies.triadic1);

    triadic2Display.textContent = '';
    triadic2Display.style.backgroundColor = hslToCss(harmonies.triadic2);
}

// Initialize colors on page load
updateColors();
