const BYPASS = "1234jorden", ACCESS = "jorden99";
const hellos = ["hello", "bonjour", "hola", "ciao", "hallo", "नमस्ते", "こんにちは", "你好"];
const alarm = new Audio('https://soundboard.com');
alarm.loop = true;

// STARTUP SEQUENCE
window.onload = () => {
    setTimeout(() => {
        document.getElementById("iphoneBoot").style.opacity = "0";
        setTimeout(() => {
            document.getElementById("iphoneBoot").style.display = "none";
            startHello();
        }, 1000);
    }, 3000);
};

function startHello() {
    const screen = document.getElementById("helloScreen");
    const text = document.getElementById("helloText");
    screen.style.display = "flex";
    let i = 0;
    setInterval(() => {
        text.style.opacity = "0";
        setTimeout(() => {
            i = (i + 1) % hellos.length;
            text.innerText = hellos[i];
            text.style.opacity = "1";
        }, 400);
    }, 2000);
}

function enterPortal() {
    document.getElementById("helloScreen").style.display = "none";
    document.getElementById("eduScreen").style.display = "flex";
    setTimeout(() => {
        document.getElementById("eduScreen").style.display = "none";
        if (localStorage.getItem("banned") === "true") triggerBan();
        else document.getElementById("lockScreen").style.display = "flex";
    }, 3500);
}

// HUB LOGIC
function checkFinalCode() {
    if (document.getElementById("finalCode").value === ACCESS) {
        document.getElementById("lockScreen").style.display = "none";
        document.getElementById("main").style.display = "block";
        document.getElementById("dockContainer").style.display = "flex";
    } else { alert("Denied."); }
}

function triggerBan() {
    document.getElementById("banScreen").style.display = "flex";
    document.body.onclick = () => alarm.play();
}

function unban(e) {
    if (e.key === "Enter" && document.getElementById("backdoor").value === BYPASS) {
        localStorage.clear(); location.reload();
    }
}

function fakeRequest() {
    const email = document.getElementById("dummyEmail").value.toLowerCase();
    if (email.includes("@legacytraditionalschool.org") || email.includes(".edu")) {
        localStorage.setItem("banned", "true"); location.reload();
    } else { alert("Enrolling in ABCLearning..."); }
}

function openPage(id) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

function launchProxy() { document.getElementById("proxyFrame").src = "https://t97.net" + document.getElementById("proxyInput").value; }
function panic() { window.location.href = "https://classroom.google.com"; }
function toggleFS() { document.getElementById("gameCanvas").classList.toggle("fs"); }
function updateBrightness(v) { document.body.style.filter = `brightness(${v/100})`; }
function setTheme(m) { if(m==='light') document.body.classList.add('light-mode'); else document.body.classList.remove('light-mode'); }
function showPasscodeState() { document.getElementById("requestState").style.display="none"; document.getElementById("passcodeState").style.display="block"; }

// GAMES
let canvas=document.getElementById("gameCanvas"), ctx=canvas.getContext("2d"), gI, speed=100;
function playSnake(){
    clearInterval(gI); let s=[{x:160,y:160}],dx=20,dy=0,f={x:80,y:80};
    document.onkeydown=(e)=>{if(e.key.includes("Up")&&dy==0){dx=0;dy=-20}if(e.key.includes("Down")&&dy==0){dx=0;dy=20}if(e.key.includes("Left")&&dx==0){dx=-20;dy=0}if(e.key.includes("Right")&&dx==0){dx=20;dy=0}};
    gI=setInterval(()=>{
        let h={x:s[0].x+dx,y:s[0].y+dy}; s.unshift(h);
        if(h.x==f.x&&h.y==f.y) f={x:Math.floor(Math.random()*19)*20,y:Math.floor(Math.random()*19)*20}; else s.pop();
        if(h.x<0||h.x>=400||h.y<0||h.y>=400) clearInterval(gI);
        ctx.fillStyle="#000"; ctx.fillRect(0,0,400,400);
        ctx.fillStyle="#0f0"; s.forEach(p=>ctx.fillRect(p.x,p.y,18,18));
        ctx.fillStyle="#f00"; ctx.fillRect(f.x,f.y,18,18);
    }, speed);
}
