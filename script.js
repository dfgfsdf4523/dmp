const goToSpaceBtn = document.getElementById('go-to-space');
const items = document.querySelectorAll('.nav-item');
const infoModal = document.getElementById('info-modal');
const closeBtn = document.getElementById('close-btn');

goToSpaceBtn.addEventListener('click', () => {
    document.getElementById('info-page').classList.add('hidden');
    document.getElementById('space-container').classList.remove('hidden');
});

items.forEach(item => {
    item.addEventListener('click', () => {
        if (item.dataset.isQuiz) {
            startQuiz();
        } else {
            document.getElementById('modal-title').innerText = item.dataset.title;
            document.getElementById('modal-desc').innerHTML = item.dataset.info;
            infoModal.classList.remove('hidden-modal');
        }
    });
});

closeBtn.addEventListener('click', () => infoModal.classList.add('hidden-modal'));

// Обновленные вопросы
const questions = [
    { q: "В какой деревне родился Владимир Карпович?", a: ["Речица", "Верхний Теребежов", "Столин", "Давид-Городок"], c: 1 },
    { q: "Какую награду получил Владимир в марте 1986 года?", a: ["Орден Ленина", "Медаль «За отвагу»", "Золотая звезда", "Медаль «За заслуги»"], c: 1 },
    { q: "Сколько воинов-афганцев живет на Столинщине?", a: ["50", "120", "190", "250"], c: 2 },
    { q: "С какого года Владимир Карпович возглавляет Союз ветеранов?", a: ["1984", "1991", "2000", "1989"], c: 1 }
];

let curQ = 0;
let score = 0;

function startQuiz() {
    curQ = 0; score = 0;
    document.getElementById('quiz-modal').classList.remove('hidden');
    showQ();
}

function showQ() {
    const q = questions[curQ];
    document.getElementById('quiz-question').innerText = q.q;
    const optDiv = document.getElementById('quiz-options');
    optDiv.innerHTML = '';
    document.getElementById('quiz-next-btn').classList.add('hidden');

    q.a.forEach((ans, i) => {
        const b = document.createElement('button');
        b.innerText = ans;
        b.className = 'quiz-opt';
        b.onclick = () => {
            const all = document.querySelectorAll('.quiz-opt');
            all.forEach(btn => btn.disabled = true);
            if (i === q.c) {
                b.classList.add('correct');
                score++;
            } else {
                b.classList.add('wrong');
                all[q.c].classList.add('correct');
            }
            document.getElementById('quiz-next-btn').classList.remove('hidden');
        };
        optDiv.appendChild(b);
    });
}

document.getElementById('quiz-next-btn').onclick = () => {
    curQ++;
    if (curQ < questions.length) {
        showQ();
    } else {
        document.getElementById('quiz-question').innerText = "Квиз завершен!";
        document.getElementById('quiz-options').innerHTML = `<p style='grid-column: span 2; font-size: 1.2rem; color: #d4af37;'>Ваш результат: ${score} из ${questions.length}</p>`;
        document.getElementById('quiz-next-btn').classList.add('hidden');
    }
};

document.getElementById('quiz-close-btn').onclick = () => document.getElementById('quiz-modal').classList.add('hidden');
