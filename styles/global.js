/* ==========================================
   MAESTRION THEME SYSTEM
========================================== */

const themes = {

    neon: {
        purple:"#8B5CF6",
        cyan:"#06B6D4",
        green:"#10B981",
        bg:"#070B14",
        card:"#0D1220",
        white:"#F8FAFC",
        muted:"#94A3B8",
        border:"rgba(255,255,255,.08)"
    },

    ocean: {
        purple:"#00C6FF",
        cyan:"#0072FF",
        green:"#22C55E",
        bg:"#06131f",
        card:"#0b1d2a",
        white:"#F8FAFC",
        muted:"#93C5FD",
        border:"rgba(255,255,255,.10)"
    },

    sunset: {
        purple:"#FF512F",
        cyan:"#DD2476",
        green:"#F97316",
        bg:"#14080b",
        card:"#1a0c12",
        white:"#F8FAFC",
        muted:"#F9A8D4",
        border:"rgba(255,255,255,.10)"
    }

};

function applyTheme(themeName){

    const theme = themes[themeName];

    if(!theme) return;

    const root =
    document.documentElement;

    root.style.setProperty(
        "--purple",
        theme.purple
    );

    root.style.setProperty(
        "--cyan",
        theme.cyan
    );

    root.style.setProperty(
        "--green",
        theme.green
    );

    root.style.setProperty(
        "--bg",
        theme.bg
    );

    root.style.setProperty(
        "--card",
        theme.card
    );

    root.style.setProperty(
        "--white",
        theme.white
    );

    root.style.setProperty(
        "--muted",
        theme.muted
    );

    root.style.setProperty(
        "--border",
        theme.border
    );

    localStorage.setItem(
        "maestrion-theme",
        themeName
    );
}

/* carregar tema salvo */

(function(){

    const savedTheme =
    localStorage.getItem(
        "maestrion-theme"
    );

    applyTheme(
        savedTheme || "neon"
    );

})();

/* ==========================================
   MENU MOBILE
========================================== */

document.addEventListener(
"DOMContentLoaded",
() => {

    const menuToggle =
    document.getElementById(
        "menuToggle"
    );

    const navMenu =
    document.getElementById(
        "navMenu"
    );

    const menuOverlay =
    document.getElementById(
        "menuOverlay"
    );

    if(
        menuToggle &&
        navMenu &&
        menuOverlay
    ){

        menuToggle.addEventListener(
        "click",
        () => {

            menuToggle.classList.toggle(
                "active"
            );

            navMenu.classList.toggle(
                "active"
            );

            menuOverlay.classList.toggle(
                "active"
            );

        });

        menuOverlay.addEventListener(
        "click",
        () => {

            menuToggle.classList.remove(
                "active"
            );

            navMenu.classList.remove(
                "active"
            );

            menuOverlay.classList.remove(
                "active"
            );

        });

    }

});

/* ==========================================
   HEADER SCROLL
========================================== */

window.addEventListener(
"scroll",
() => {

    const header =
    document.querySelector(
        "header"
    );

    if(!header) return;

    if(window.scrollY > 40){

        header.classList.add(
            "scrolled"
        );

    }else{

        header.classList.remove(
            "scrolled"
        );

    }

});
/* ==========================================
   ACESSIBILIDADE
========================================== */
let audioReaderHandler = null;
let audioReaderTimeout = null;

function enableAudioReader(){

    if(audioReaderHandler)
        return;

    audioReaderHandler = (e) => {

        const el = e.target;

        const validTags = [
            "P",
            "SPAN",
            "A",
            "BUTTON",
            "H1",
            "H2",
            "H3",
            "H4",
            "H5",
            "H6",
            "LI",
            "LABEL"
        ];

        if(
            !validTags.includes(
                el.tagName
            )
        ){
            return;
        }

        const text =
        el.innerText?.trim();

        if(!text)
            return;

        clearTimeout(
            audioReaderTimeout
        );

        audioReaderTimeout =
        setTimeout(() => {

            speechSynthesis.cancel();

            const speech =
            new SpeechSynthesisUtterance(
                text
            );

            speech.lang =
            "pt-BR";

            speechSynthesis.speak(
                speech
            );

        },500);

    };

    document.addEventListener(
        "mouseover",
        audioReaderHandler
    );

}

function disableAudioReader(){

    if(audioReaderHandler){

        document.removeEventListener(
            "mouseover",
            audioReaderHandler
        );

        audioReaderHandler =
        null;

    }

    speechSynthesis.cancel();

}
function applyAccessibility(
feature,
enabled
){

    switch(feature){

        case "large-text":

            document.body.classList.toggle(
                "large-text",
                enabled
            );

        break;

        case "high-contrast":

            document.body.classList.toggle(
                "high-contrast",
                enabled
            );

        break;
case "audio-reader":

    if(enabled){

        enableAudioReader();

    }else{

        disableAudioReader();

    }

break;
        case "screen-reader":

            if(
                enabled &&
                !document.querySelector(
                    "#vlibras-script"
                )
            ){

                const script =
                document.createElement(
                    "script"
                );

                script.id =
                "vlibras-script";

                script.src =
                "https://vlibras.gov.br/app/vlibras-plugin.js";

                script.onload =
                () => {

                    new window.VLibras.Widget(
                        "https://vlibras.gov.br/app"
                    );

                };

                document.body.appendChild(
                    script
                );

            }

        break;

    }

}

/* carregar acessibilidade */

document.addEventListener(
"DOMContentLoaded",
() => {

    applyAccessibility(
        "large-text",
        localStorage.getItem(
            "maestrion-large-text"
        ) === "true"
    );

    applyAccessibility(
        "high-contrast",
        localStorage.getItem(
            "maestrion-high-contrast"
        ) === "true"
    );

    applyAccessibility(
        "screen-reader",
        localStorage.getItem(
            "maestrion-screen-reader"
        ) === "true"
    );
applyAccessibility(
    "audio-reader",
    localStorage.getItem(
        "maestrion-audio-reader"
    ) === "true"
);
});
/* ==========================================
   SETTINGS PANEL
========================================== */

document.addEventListener(
"DOMContentLoaded",
() => {

    const settingsBtn =
    document.getElementById(
        "settingsBtn"
    );

    const settingsPanel =
    document.getElementById(
        "settingsPanel"
    );

    const closeSettings =
    document.getElementById(
        "closeSettings"
    );

    if(
        settingsBtn &&
        settingsPanel
    ){

        settingsBtn.addEventListener(
        "click",
        () => {

            settingsPanel.classList.toggle(
                "active"
            );

        });

    }

    if(closeSettings){

        closeSettings.addEventListener(
        "click",
        () => {

            settingsPanel.classList.remove(
                "active"
            );

        });

    }

});

/* ==========================================
   ALTERAÇÃO DE TEMAS
========================================== */

document.addEventListener(
"DOMContentLoaded",
() => {

    document
    .querySelectorAll(
        "[data-theme]"
    )
    .forEach(btn => {

        btn.addEventListener(
        "click",
        () => {

            applyTheme(
                btn.dataset.theme
            );

        });

    });

});

/* ==========================================
   TOGGLES
========================================== */

document.addEventListener(
"DOMContentLoaded",
() => {

    const largeText =
    document.getElementById(
        "largeTextToggle"
    );

    const contrast =
    document.getElementById(
        "contrastToggle"
    );

    const vlibras =
    document.getElementById(
        "vlibrasToggle"
    );
const audioReader =
document.getElementById(
    "audioReaderToggle"
);
    if(largeText){

        largeText.checked =
        localStorage.getItem(
            "maestrion-large-text"
        ) === "true";

        largeText.addEventListener(
        "change",
        () => {

            localStorage.setItem(
                "maestrion-large-text",
                largeText.checked
            );

            applyAccessibility(
                "large-text",
                largeText.checked
            );

        });

    }

    if(contrast){

        contrast.checked =
        localStorage.getItem(
            "maestrion-high-contrast"
        ) === "true";

        contrast.addEventListener(
        "change",
        () => {

            localStorage.setItem(
                "maestrion-high-contrast",
                contrast.checked
            );

            applyAccessibility(
                "high-contrast",
                contrast.checked
            );

        });

    }
if(audioReader){

    audioReader.checked =
    localStorage.getItem(
        "maestrion-audio-reader"
    ) === "true";

    audioReader.addEventListener(
    "change",
    () => {

        localStorage.setItem(
            "maestrion-audio-reader",
            audioReader.checked
        );

        applyAccessibility(
            "audio-reader",
            audioReader.checked
        );

    });

}
    if(vlibras){

        vlibras.checked =
        localStorage.getItem(
            "maestrion-screen-reader"
        ) === "true";

        vlibras.addEventListener(
        "change",
        () => {

            localStorage.setItem(
                "maestrion-screen-reader",
                vlibras.checked
            );

            location.reload();

        });

    }

});

/* ==========================================
   MÚSICA (HOME)
========================================== */


(() => {

    const music = document.getElementById("siteMusic");
    const fileInput = document.getElementById("musicFile");
    const playBtn = document.getElementById("playMusic");
    const nextBtn = document.getElementById("nextMusic");
    const volume = document.getElementById("volumeControl");

    if (!music) return;

    let playlist = JSON.parse(localStorage.getItem("maestrion-playlist")) || [];
    let currentIndex = parseInt(localStorage.getItem("maestrion-index")) || 0;

    const STORAGE = {
        state: "maestrion-music-state",
        time: "maestrion-music-time",
        volume: "maestrion-volume"
    };

    /* ==========================================
       VOLUME
    ========================================== */

    const savedVolume = localStorage.getItem(STORAGE.volume) || 50;
    music.volume = savedVolume / 100;

    if (volume) {
        volume.value = savedVolume;

        volume.addEventListener("input", () => {
            music.volume = volume.value / 100;
            localStorage.setItem(STORAGE.volume, volume.value);
        });
    }

    /* ==========================================
       SALVAR PROGRESSO
    ========================================== */

    setInterval(() => {
        if (!music.paused) {
            localStorage.setItem(STORAGE.time, music.currentTime);
        }
    }, 1000);

    /* ==========================================
       CARREGAR PLAYLIST
    ========================================== */

    function loadTrack(index) {

        if (!playlist.length) return;

        currentIndex = index;

        music.src = playlist[currentIndex];

        music.load();

        music.play().catch(() => {});

        localStorage.setItem("maestrion-index", currentIndex);
        localStorage.setItem(STORAGE.state, "playing");
    }

    /* ==========================================
       PRÓXIMA MÚSICA
    ========================================== */

    function nextTrack() {

        if (!playlist.length) return;

        currentIndex++;

        if (currentIndex >= playlist.length) {
            currentIndex = 0;
        }

        loadTrack(currentIndex);
    }

    /* ==========================================
       UPLOAD DE MÚSICAS
    ========================================== */

    if (fileInput) {

        fileInput.addEventListener("change", (e) => {

            const files = Array.from(e.target.files);

            files.forEach(file => {
                const url = URL.createObjectURL(file);
                playlist.push(url);
            });

            localStorage.setItem("maestrion-playlist", JSON.stringify(playlist));

            if (playlist.length === files.length) {
                loadTrack(0);
            }

        });

    }

    /* ==========================================
       PLAY / PAUSE
    ========================================== */

    if (playBtn) {

        playBtn.addEventListener("click", () => {

            if (!music.src && playlist.length) {
                loadTrack(currentIndex);
                return;
            }

            if (music.paused) {
                music.play();
                localStorage.setItem(STORAGE.state, "playing");
                playBtn.innerText = "⏸ Pausar";
            } else {
                music.pause();
                localStorage.setItem(STORAGE.state, "paused");
                playBtn.innerText = "▶ Reproduzir";
            }

        });

    }

    /* ==========================================
       BOTÃO NEXT
    ========================================== */

    if (nextBtn) {
        nextBtn.addEventListener("click", nextTrack);
    }

    /* ==========================================
       RESTAURAR ESTADO
    ========================================== */

    const savedState = localStorage.getItem(STORAGE.state);

    music.addEventListener("ended", nextTrack);

    if (playlist.length && savedState === "playing") {
        loadTrack(currentIndex);
    }

})();
/* ==========================================
   FUNDO (GRID / LIMPO)
========================================== */

(() => {

    const DEFAULT = "grid";

    function applyBackground(type) {
        document.body.setAttribute("data-background", type);
        localStorage.setItem("maestrion-background", type);
    }

    // aplicar ao carregar
    const saved = localStorage.getItem("maestrion-background") || DEFAULT;
    applyBackground(saved);

    const select = document.getElementById("backgroundSelect");

    if (select) {

        select.value = saved;

        select.addEventListener("change", () => {
            applyBackground(select.value);
        });

    }

})();