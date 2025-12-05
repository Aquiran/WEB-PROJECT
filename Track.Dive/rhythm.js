var startTime = 0;
var combo = 0;
let miss = false;
let level = 2;
let drop = 10;
let clearConstant = 1000;
let setting = false;
let hpnum = 400;
let damage = 20;
var maximum = 0;
var missnum = 0;

/* Level Setting */
easy = document.getElementById('easy');
normal = document.getElementById('NORMAL');
hard = document.getElementById('HARD');
easy.addEventListener('click', () => {
    level = 2.2;
    clearConstant = 2000;
    damage = 10;
    setting = true;
    document.querySelector('.level').style.display = 'none';
});
normal.addEventListener('click', () => {
    level = 2;
    clearConstant = 1000;
    setting = true;
    document.querySelector('.level').style.display = 'none';
});
hard.addEventListener('click', () => {
    level = 2;
    clearConstant = 500;
    damage = 40;
    setting = true;
    document.documentElement.style.setProperty('--note-speed', '0.9s');
    document.querySelector('.level').style.display = 'none';
});



/* Start Game */
document.addEventListener('keyup', event => {
    if (event.code === 'Space' && setting == true) {
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
    /* audio play */
    var audio = new Audio('audio.mp3');
    audio.play();
    setTimeout(() => {
        audio.pause();
    }, 78000);

    /* Clear */
    setTimeout(() => {
        document.getElementById("clear").style.display = "block"
        setTimeout(() => {
            document.getElementById("clear").style.opacity = "1"
        }, 10);
    }, 78000);

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
                            hpnum = hpnum - damage;
                            document.getElementById('combo').innerHTML = `COMBO: ${combo}`;
                            document.getElementById('hpbar').style.width = `${hpnum}px`;
                            document.getElementById(`track${track}`).style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
                            setTimeout(() => {
                                document.getElementById(`track${track}`).style.backgroundColor = 'rgba(155, 220, 248, 0.3)';
                            }, 10);
                        }
                        document.getElementsByClassName(`t${i}`)[0]?.remove();
                    }, 100);
                }, drop * 100);
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
            if (nowTime + level * 2 >= startTime + song.note[i].time + drop && startTime + song.note[i].time + drop >= nowTime && !song.note[i].played) {
                miss = true;
                if (nowTime + level >= startTime + song.note[i].time + drop && startTime + song.note[i].time + drop >= nowTime) {
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
                    hpnum = hpnum - damage;
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