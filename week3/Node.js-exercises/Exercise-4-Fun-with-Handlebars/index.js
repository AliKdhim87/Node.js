const display = document.getElementById('display');
const btn = document.getElementById('btn');
const subjects = ["shark", "popcorn", "poison", "fork", "cherry", "toothbrush", "cannon"];
const punchlines = ["watch movie with", "spread some love", "put on cake", "clean toilets", "go to the moon", "achieve world piece", "help people learn programing"];

const randomCards = () => {
    const randomSubjects = subjects[Math.floor(Math.random() * subjects.length)];
    const randomPunch = punchlines[Math.floor(Math.random() * punchlines.length)];

    const myInfo = `<p>{{a}}</p> <p>{{b}}</p> <p>{{c}}</p>`;
    let tempate = Handlebars.compile(myInfo);
    const data = tempate({ a: randomSubjects, b: 'is great to', c: randomPunch });
    display.innerHTML += data
}

// random color
random_bg_color = () => {
    const x = Math.floor(Math.random() * 256);
    const y = Math.floor(Math.random() * 256);
    const z = Math.floor(Math.random() * 256);
    const bgColor = "rgb(" + x + "," + y + "," + z + ")";


    display.style.background = bgColor;
    btn.style.background = bgColor;
}
btn.addEventListener('click', () => {
    display.innerHTML = ''
    randomCards();
    random_bg_color();
});
randomCards();
random_bg_color();