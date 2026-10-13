const colors = [
    { name: "black", hex: "#000000" },
    { name: "white", hex: "#ffffff" },
    { name: "red", hex: "#ff0000" },
    { name: "gray", hex: "#808080" },
    { name: "green", hex: "#008000" },
    { name: "silver", hex: "#c0c0c0" },
    { name: "blue", hex: "#0000ff" },
    { name: "maroon", hex: "#800000" },
    { name: "yellow", hex: "#ffff00" },
    { name: "navy", hex: "#000080" },
    { name: "orange", hex: "#ffa500" },
    { name: "olive", hex: "#808000" },
    { name: "purple", hex: "#800080" },
    { name: "teal", hex: "#008080" },
    { name: "pink", hex: "#ffc0cb" },
    { name: "lime", hex: "#00ff00" },
    { name: "brown", hex: "#a52a2a" },
    { name: "aqua", hex: "#00ffff" },
    { name: "fuchsia", hex: "#ff00ff" },
];

function RandomCL() {
    let numberRD = Math.floor(Math.random() * colors.length);   // 0 to 18
    document.body.style.backgroundColor = colors[numberRD].hex;
}