function initFingerprintJS() {
    // Initialize an agent at application startup.
    const fpPromise = FingerprintJS.load()

    // Get the visitor identifier when you need it.
    fpPromise
        .then(fp => fp.get())
        .then(result => {
            // This is the visitor identifier:
            const visitorId = result.visitorId
            console.log(visitorId)
        })
}

const quizInputName = document.querySelector(".js-quiz-name")
const quizInputSubname = document.querySelector(".js-quiz-subname")
const quizInputTel = document.querySelector(".js-quiz-tel")
const quizInputEmail = document.querySelector(".js-quiz-email")
const quizInputPet = document.querySelector(".js-quiz-pet")
const quizInputCheckbox = document.querySelectorAll(".js-quiz-checkbox")
const quizBtnSubmit = document.querySelector(".js-quiz-sub")

quizBtnSubmit.addEventListener("click", (e) => {
    e.preventDefault()
    console.log(quizInputName.value, quizInputSubname.value, quizInputTel.value, quizInputEmail.value, quizInputPet.checked, quizInputCheckbox)


})