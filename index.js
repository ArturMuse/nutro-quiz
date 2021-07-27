const quizForm = document.querySelector(".quiz__form")
const quizInputName = document.querySelector(".js-quiz-name")
const quizInputSubname = document.querySelector(".js-quiz-subname")
const quizInputTel = document.querySelector(".js-quiz-tel")
const quizInputEmail = document.querySelector(".js-quiz-email")
const quizInputPet = document.querySelector(".js-quiz-pet")
const quizInputCheckbox = document.querySelectorAll(".js-quiz-checkbox")
const quizBtnSubmit = document.querySelector(".js-quiz-sub")

quizBtnSubmit.addEventListener("click", (e) => {
    e.preventDefault()
    // console.log(quizInputName.value, quizInputSubname.value, quizInputTel.value, quizInputEmail.value, quizInputPet.checked, quizInputCheckbox)
    quizForm.style.display = "none"
})


// QUIZ
const config = {
    q: [
        "Рационы NUTRO™ изготовлены без добавления:",
        "Все рационы NUTRO™   разработаны в соответствии с философией FEED CLEAN™?В чем особенности этой филосовии?",
        "Какие специализированные рационы есть в линейке NUTRO  ™ Grain Free?(выберите несколько вариантов ответов):"
    ]
}



const quizItems = document.querySelectorAll(".js-quiz-box-item")
const quizBtn = document.querySelector(".js-quiz-btn")
const quizQuestion = document.querySelector(".js-quiz-q")
const quizNum = document.querySelector(".js-quiz-current")
const quizBody = document.querySelector(".js-quiz-body")
const quizResult = document.querySelector(".js-quiz-result")

let stage = 0
let btnStage = 0
let data = null

// ОТПЕЧАТОК



function initFingerprintJS() {
    // Initialize an agent at application startup.
    const fpPromise = FingerprintJS.load()

    // Get the visitor identifier when you need it.
    fpPromise
        .then(fp => fp.get())
        .then(result => {
            const visitorId = result.visitorId
            const data = { key: visitorId };
            console.log(data)
        })
}

const connect = async () => {
    const url = 'https://nutro.tw1.ru/api/request';
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        console.log('Успех:', JSON.stringify(json));
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

quizQuestion.innerHTML = `${config.q[0]}`

quizItems.forEach((el, index) => {
    if (index > 3) {
        el.classList.add("quiz__box-item-off")
    }
    el.addEventListener("click", () => {
        quizItems.forEach(i => i.classList.remove("quiz__box-item-sel"))
        el.classList.toggle("quiz__box-item-sel")
    })
})

quizBtn.addEventListener("click", () => {
    if (btnStage === 0) {
        quizBtn.innerHTML = "Дальше"
        quizItems.forEach(el => {
            if (el.classList.contains("quiz__box-item-sel")) {
                if (el.dataset.rule === "true") {
                    el.classList.add("quiz__box-item-y")
                } else {
                    el.classList.add("quiz__box-item-n")
                }
            }
        })
        btnStage = 1
        stage += 1
    } else {
        if (stage === 1) {
            quizNum.innerHTML = "2"
            quizQuestion.innerHTML = `${config.q[1]}`
            quizItems.forEach(i => i.classList.add("quiz__box-item-off"))
            for (let i = 4; i < 7; i++) {
                quizItems[i].classList.remove("quiz__box-item-off")
            }
        }
        if (stage === 2) {
            quizNum.innerHTML = "3"
            quizQuestion.innerHTML = `${config.q[2]}`
            quizItems.forEach(i => i.classList.add("quiz__box-item-off"))
            for (let i = 7; i < 10; i++) {
                quizItems[i].classList.remove("quiz__box-item-off")
            }
        }
        if (stage === 3) {
            quizItems.forEach(i => i.classList.add("quiz__box-item-off"))
            quizBody.style.display = "none"
            quizResult.classList.add("quiz__result-on")
            connect()
        }
        quizBtn.innerHTML = "Ответить"
        btnStage = 0
    }
    console.log(stage)
})