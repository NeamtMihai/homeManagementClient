document.addEventListener('DOMContentLoaded', function () {
    const popup = document.getElementById('popup');
    const popupList = document.getElementById('popupList');
    const popupTitle = document.getElementById('popupTitle');
    const closePopup = document.getElementById('closePopup');

    const habitHistory = {
        bed: [],
        bathtub: [],
        toothbrush: []
    };

    const habits = {
        bed: 'Changed Bed',
        bathtub: 'Washed Bathtub',
        toothbrush: 'Changed Toothbrush',
    };

    function addHabitEntry(habit) {
        const date = new Date().toLocaleString();
        habitHistory[habit].push(date);
    }

    function showPopup(habit) {
        popupTitle.textContent = `${habits[habit]} History`;
        popupList.innerHTML = habitHistory[habit].map(date => `<li>${date}</li>`).join('');
        popup.classList.remove('hidden');
    }

    document.getElementById('bedButton').addEventListener('click', function () {
        addHabitEntry('bed');
        showPopup('bed');
    });

    document.getElementById('bathtubButton').addEventListener('click', function () {
        addHabitEntry('bathtub');
        showPopup('bathtub');
    });

    document.getElementById('toothbrushButton').addEventListener('click', function () {
        addHabitEntry('toothbrush');
        showPopup('toothbrush');
    });

    closePopup.addEventListener('click', function () {
        popup.classList.add('hidden');
    });

    window.addEventListener('click', function (event) {
        if (event.target === popup) {
            popup.classList.add('hidden');
        }
    });
});
