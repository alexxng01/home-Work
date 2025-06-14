let playbar = document.querySelector(".playbar");
let rightPanel = document.createElement("div");
rightPanel.className = "song-details-panel";
document.body.appendChild(rightPanel);

// Example data — you can make this dynamic
let fileName = "My Song";
let folderPath = "/music/ncc/";
let file = "song.mp3";

document.getElementById("full").addEventListener("click", () => {
  rightPanel.classList.add("active");
  rightPanel.innerHTML = `
    <button id="closeFullscreen">×</button>
    <div class="play" style="margin-bottom: 20px;">
      <svg id="playBtn" width="48" height="48" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill="#1fdf64" class="play-button" />
        <polygon points="40,30 70,50 40,70" fill="black" />
      </svg>
    </div>
    <img src="${folderPath}cover.jpeg" alt="cover">
    <h2>${fileName}</h2>
    <audio controls>
      <source src="${folderPath}${file}" type="audio/mpeg">
      Your browser does not support the audio tag.
    </audio>
  `;

  document.getElementById("closeFullscreen").addEventListener("click", () => {
    rightPanel.classList.remove("active");
  });
});







