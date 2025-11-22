var startTime = 0;
var combo = 0;
let miss = false;
let hpnum = 400;
var maximum = 0;
var missnum = 0;

/* Start Game */
document.addEventListener('keyup', event => {
    if (event.code === 'Space' ) {
      start()
    }
})

document.getElementById('start').addEventListener("click", () => {
    start()
})


/* Track Input style */
window.addEventListener('keyup', e => {
    let track = e.key.toUpperCase();
    if (document.getElementById(`trackBtn${track}`)) {
        document.getElementById(`trackBtn${track}`).style.backgroundColor = 'rgba(155, 220, 248, 0.5)';
    }
});

window.addEventListener('keydown', e => {
    let track = e.key.toUpperCase();
    if (document.getElementById(`trackBtn${track}`)) {
        document.getElementById(`trackBtn${track}`).style.backgroundColor = 'rgba(155, 220, 248, 1)';
        isJudge(track);
    }
});


/* start function */ 
function start() {
    document.getElementById('start').style.display = 'none';

    /* audio */
    setTimeout(() => {
        var audio = new Audio('');
        audio.play();
    }, 1300);

    /* Clear */
    setTimeout(() => {
        document.getElementById("clear").style.display = "block"
        setTimeout(() => {
            document.getElementById("clear").style.opacity = "1"
        }, 10);
    }, 4000);

    /* Time check */
    startTime = Math.floor(new Date().getTime() / 100);
    setInterval(() => {
        let nowTime = Math.floor(new Date().getTime() / 100);
        for (let i = 0; i < song.note.length; i++) {
            if (startTime + song.note[i].time == nowTime && !song.note[i].noted) {
                song.note[i].noted = true;

                /* Note Creation */
                var test = document.createElement('div');
                test.classList.add('tile');
                test.classList.add(`t${i}`)
                document.getElementById(`track${song.note[i].track}`).appendChild(test);

                setTimeout(() => {
                    document.getElementsByClassName(`t${i}`)[0].style.display = "none";

                    /* Hud Event */
                    setTimeout(() => {
                        if (!miss) {
                            combo = 0;
                            missnum = missnum + 1;
                            hpnum = hpnum - 20;
                            document.getElementById('combo').innerHTML = `COMBO: ${combo}`;
                            document.getElementById('hpbar1').style.width = `${hpnum}px`;
                            document.getElementById(`track${track}`).style.backgroundColor = 'red';
                            setTimeout(() => {
                                document.getElementById(`track${track}`).style.backgroundColor = 'rgba(155, 220, 248, 0.5)';
                            }, 100);
                        }
                        document.getElementsByClassName(`t${i}`)[0]?.remove();
                    }, 100);
                }, 1000);
            }
        }
    }, 1);
}

function isJudge(track) {
    /* 구현 예정 */
}

/* GameOver Check */
setInterval(() => {
    if(hpnum == 0)
        window.location.href = "end.html"
}, 1)

document.getElementById('clear').addEventListener("click", () => {
    window.location.href = "index.html"
})
