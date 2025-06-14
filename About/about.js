let allSongs = []; // Cache for song list

document.getElementById("searchMenu").addEventListener("click", async function () {
  try {
    const folderPath = `http://127.0.0.1:5500/music/ncc/`;
    console.log(folderPath)
    const res = await fetch(folderPath);
    const html = await res.text();

    // Parse the HTML directory listing
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Get all music file links
    allSongs = Array.from(doc.querySelectorAll("a"))
      .map(link => link.getAttribute("href"))

      .filter(href => href.endsWith(".mp3") || href.endsWith(".wav"));

    // Show search input + button
    document.getElementById("searchBox").style.display = "flex";
    document.getElementById("searchIcon").style.display= "none";

  } catch (error) {
    console.error("Error fetching music folder:", error);
  }
});

// When the search button is clicked
document.getElementById("searchButton").addEventListener("click", function () {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = allSongs.filter(file => file.toLowerCase().includes(query));
  renderSongs(filtered, "/music/");
});

function renderSongs(songFiles, folderPath) {
  const container = document.querySelector(".cardContainer");
  container.innerHTML = "";

  if (songFiles.length === 0) {
    container.innerHTML = "<p style='color: white;'>No songs found.</p>";
    return;
  }

  songFiles.forEach(file => {
    const fileName = decodeURIComponent(file.split("/").pop());
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `

    
                        <div class="play">
                            <svg id="playBtn" width="28" height="28" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="48" fill="#1fdf64" class="play-button" />
                                <polygon points="40,30 70,50 40,70" fill="dark" />
                            </svg>
                        </div>
                        <img src="/music/ncc/cover.jpeg" alt="">
                        

                    
      <h2>${fileName}</h2>
      
        <source src="${folderPath}${file}" type="audio/mpeg">
        Your browser does not support the audio tag.
     
    `;
    container.appendChild(card);
  });
}

document.querySelector(".hamburgerer").addEventListener("click", () => {
  document.querySelector(".left").style.left = "0";
})
document.querySelector(".cross").addEventListener("click", () => {
  document.querySelector(".left").style.left = "-100%";
})










