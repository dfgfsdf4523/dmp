const goToSpaceBtn = document.getElementById('go-to-space');
const items = document.querySelectorAll('.nav-item');
const infoModal = document.getElementById('info-modal');
const closeBtn = document.getElementById('close-btn');

// Навигация
goToSpaceBtn.addEventListener('click', () => {
    document.getElementById('info-page').classList.add('hidden');
    document.getElementById('space-container').classList.remove('hidden');
});

// Клики по объектам
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

// Логика Квиза
const questions = [
    { q: "Сколько столинцев не вернулись с Афганской войны?", a: ["21", "5", "13", "10"], c: 2 },
    { q: "Какую награду имел столинец Юрий Савич (дважды)?", a: ["Орден Ленина", "Медаль «За отвагу»", "Орден Красной Звезды", "Герой СССР"], c: 2 },
    { q: "Как назывался основной перевал, через который шли колонны?", a: ["Шибар", "Болан", "Саланг", "Хайбер"], c: 2 },
    { q: "В каком году началась Афганская война для СССР?", a: ["1983", "1975", "1989", "1979"], c: 3 }
];

let curQ = 0;
let score = 0;

function startQuiz() {
    curQ = 0;
    score = 0;
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