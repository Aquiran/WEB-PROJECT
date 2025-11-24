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
    console.log(track);
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

                    /* Hud Event (miss 발생) */
                    setTimeout(() => {
                        if (!miss) {
                            combo = 0;
                            missnum = missnum + 1;
                            hpnum = hpnum - 20;
                            document.getElementById('combo').innerHTML = `COMBO: ${combo}`;
                            document.getElementById('hpbar').style.width = `${hpnum}px`;
                            document.getElementById(`track${track}`).style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
                            setTimeout(() => {
                                document.getElementById(`track${track}`).style.backgroundColor = 'rgba(155, 220, 248, 0.3)';
                            }, 10);
                        }
                        document.getElementsByClassName(`t${i}`)[0]?.remove();
                    }, 100);
                }, 1000);
            }
        }
    }, 1);
}

function isJudge(track) {

    /* Note Judge */
    let nowTime = Math.floor(new Date().getTime() / 100);
    for (let i = 0; i < song.note.length; i++) {
        if (song.note[i].track === track) {

            /* key input과 note의 시간 비교를 통한 Judge */
            if (nowTime + 4 >= startTime + song.note[i].time + 10 && startTime + song.note[i].time + 10 >= nowTime && !song.note[i].played) {
                miss = true;
                if (nowTime + 2 >= startTime + song.note[i].time + 10 && startTime + song.note[i].time + 10 >= nowTime) {
                    combo += 1;
                    song.note[i].played = true;
                    document.getElementById('combo').innerHTML = `COMBO: ${combo}`;
                    document.getElementById(`track${track}`).style.backgroundImage = 'linear-gradient(to bottom, rgba(155, 220, 248, 0),rgba(155, 220, 248, 1))';
                    document.getElementsByClassName(`t${i}`)[0]?.remove();
                    setTimeout(() => {
                        document.getElementById(`track${track}`).style.backgroundImage = '';
                        setTimeout(() => {
                            miss = false;
                        }, 500);
                    }, 10);
                } 

                /* Hud Event (key input이 없을 때) */
                else {
                    combo = 0;
                    missnum += 1;
                    hpnum = hpnum - 20
                    document.getElementById('hpbar').style.width = `${hpnum}px`
                    document.getElementById('combo').innerHTML = `COMBO: ${combo}`;
                    document.getElementById(`track${track}`).style.backgroundColor = 'rgba(228, 96, 96, 0.7)';
                    document.getElementsByClassName(`t${i}`)[0].remove();
                    setTimeout(() => {
                        document.getElementById(`track${track}`).style.backgroundColor = 'rgba(155, 220, 248, 0.3)';
                    }, 100);
                }
            }
        }
    }
}

/* GameOver Check */
setInterval(() => {
    if(hpnum == 0)
        window.location.href = "end.html"
}, 1)


/* Max Combo Check */
setInterval(() => {
    if (combo > maximum) {
        maximum += 1;
        document.getElementById("max").innerHTML = `Max COMBO : ${maximum}`;
    }
}, 1);

/* Miss Count Check */
setInterval(() => {
    document.getElementById("misscombo").innerHTML = `MISS : ${missnum}`;
}, 1);



/* Clear Button */
document.getElementById('clear').addEventListener("click", () => {
    window.location.href = "index.html"
})
