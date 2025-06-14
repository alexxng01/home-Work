
console.log("~this is my song");

let currentSong = new Audio();
let songs;
let currFolder;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds} `;

}

async function getsongs(folder) {
    currFolder = folder;
    let a = await fetch(`${folder}/`)
   
    let response = await a.text();
   
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
   
    songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1])
        }

    }
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    songUL.innerHTML = ""
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li> <img   src="svg/music.svg" alt=" Music" >
                            <div class="info">
                                <div>${song.replaceAll("/", " ")}</div>
                                <div>Alex</div>
                            </div>
                            <div class="playnow">

                                <span>Play Now</span>
                                <img class="inverte"src="svg/play.svg" alt="" >
                            </div></li>`;

    }
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {

           
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    })
    return songs
}

const playMusic = (track, pause = false) => {
    // let audio = new Audio("/music/" + track)
    currentSong.src = `/${currFolder}/` + track
    if (!pause) {

        currentSong.play()
        play.src = "svg/paused.svg"
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00/00:00 "
}



async function displayAlbums() {
    
    let a = await fetch(`/music/`)
    let responce= await a.text();

    let div = document.createElement("div");
    div.innerHTML = responce;
   
    let anchors = div.getElementsByTagName("a");
  
     let array=Array.from(anchors)
     for (let index = 0; index < array.length; index++) {
        const e = array[index];
        
     
        if(e.href.includes(`/music/`)){
            let folder= e.href.split("/").slice(-1)[0]

           

            //get metadata of this folder
            let a = await fetch(`/music/${folder}/info.json`)
            let responce= await a.json();
            let cardContainer = document.querySelector(".cardContainer")
           
            cardContainer.innerHTML = cardContainer.innerHTML +`<div  data-folder="${folder}" class="card">
                        <div class="play">
                            <svg id="playBtn" width="28" height="28" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="48" fill="#1fdf64" class="play-button" />
                                <polygon points="40,30 70,50 40,70" fill="dark" />
                            </svg>
                        </div>
                        <img src="/music/${folder}/cover.jpeg" alt="">
                        <h2>${responce.title}</h2>
                        <p> ${responce.description}</p>

                    </div>`
        }

     }
     Array.from(document.getElementsByClassName("card")).forEach(e => {
     
        e.addEventListener("click", async item => {
           
            await getsongs(`music/${item.currentTarget.dataset.folder}`)
            playMusic(songs[0])
            
    
        })
    })



}
let allSongs = []; // Cache for song list
document.getElementById("searchMenu").addEventListener("click", async function () {
  try {
    const folderPath = `music/${folder}/`;
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
  renderSongs(filtered, `/music/${folder}`);
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
        
     
    `;
    container.appendChild(card);
  });
}

document.querySelector(".hamburger").addEventListener("click", () => {
  document.querySelector(".left").style.left = "0";
})
document.querySelector(".cross").addEventListener("click", () => {
  document.querySelector(".left").style.left = "-100%";
})


let right =document.querySelector(".right")
document.querySelector("#full").addEventListener("click", () => {
    if (right.style.width === "75vw",playbar.style.width === "69vw" ){
      right.style.width = "40vw";
      playbar.style.width = "30vw";
      
    } else {
      right.style.width = "75vw";
      playbar.style.width = "69vw";
      
    }
    console.log("clicked");
  });
//   document.querySelector("#full").addEventListener("click", () => {
//     if (playbar.style.width === "69vw" ){
//       playbar.style.width = "30vw";
      
//     } else {
//       playbar.style.width = "69vw";
      
//     }
//     console.log("clicked");
//   });

async function main() {
//get all the songs
    await getsongs("music/cs")
    
    playMusic(songs[0], true)


    //  display all the albu m in page 
    displayAlbums()


//atttact an event listener to play nex and previous
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "svg/paused.svg"


        }
        else {
            currentSong.pause()
            play.src = "svg/play.svg"
        }
    })
    let playNow = document.querySelector(".playnow img")

    playNow.addEventListener("click", () => {
        if (play.src = "svg/play.svg") {
            play.src = "svg/paused.svg"


        }
        else {
            play.src = "svg/play.svg"
        }
    })
    currentSong.addEventListener("timeupdate", () => {
        
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.
            currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })
    document.querySelector(".seekbar").addEventListener("click", e => {
        let persent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
        document.querySelector(".circle").style.left = persent + "%";
        currentSong.currentTime = ((currentSong.duration) * persent) / 100
    })
   

    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    })
    document.querySelector(".cross").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-100%";
    })

    let previous = document.getElementById("previous")

    previous.addEventListener("click", () => {


        let index = songs.indexOf(currentSong.src.split("/").pop().split("?")[0].toLowerCase())
        if ((index - 1) >= 0) {

            playMusic(songs[index - 1])

        }
       
    })


    next.addEventListener("click", () => {
        currentSong.pause();


        const index = songs.findIndex(song => song.toLowerCase() === currentSong.src.split("/").pop().split("?")[0].toLowerCase());

       

        if (index !== -1 && index + 1 < songs.length) {
            playMusic(songs[index + 1]);
        }
    });

    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        
        currentSong.volume = parseInt(e.target.value) / 100
    })


    // add event lister mute 
    document.querySelector(".volume>img").addEventListener("click", e=>{
        if(e.target.src.includes("svg/volume.svg")){
            e.target.src= e.target.src.replace("svg/volume.svg" ,"svg/mute.svg")
            currentSong.volume = 0
            document.querySelector(".range").getElementsByTagName("input")[0].value=0;
            console.log(e)
            

        }
        else{
            e.target.src =  e.target.src.replace("svg/mute.svg","svg/volume.svg")
            document.querySelector(".range").getElementsByTagName("input")[0].value=10;
            currentSong.volume = .10
        }

    })



}
main()
