document.addEventListener('DOMContentLoaded', function () {
    const popup = document.getElementById('popup');
    const popupList = document.getElementById('popupList');
    const popupTitle = document.getElementById('popupTitle');
    const closePopup = document.getElementById('closePopup');
    const addCurrentDateButton = document.getElementById('addCurrentDateButton');
    const addCustomDateButton = document.getElementById('addCustomDateButton');
    const customDateInput = document.getElementById('customDateInput');

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

    let currentHabit = '';

    function showPopup(habit) {
        currentHabit = habit;
        popupTitle.textContent = `${habits[habit]} History`;
        popupList.innerHTML = habitHistory[habit].map(date => `<li>${date}</li>`).join('');
        popup.classList.remove('hidden');
    }

    function addHabitEntry(date) {
        habitHistory[currentHabit].push(date);
        showPopup(currentHabit); // Update the popup with the new entry
    }

    function addCurrentDate() {
        const date = new Date().toLocaleString();
        addHabitEntry(date);
    }

    function toggleCustomDateInput() {
        customDateInput.classList.toggle('hidden');
    }

    function addCustomDate() {
        const customDate = customDateInput.value;
        if (customDate) {
            addHabitEntry(new Date(customDate).toLocaleDateString());
            customDateInput.value = '';
            customDateInput.classList.add('hidden');
        }
    }

    document.getElementById('bedButton').addEventListener('click', function () {
        showPopup('bed');
    });

    document.getElementById('bathtubButton').addEventListener('click', function () {
        showPopup('bathtub');
    });

    document.getElementById('toothbrushButton').addEventListener('click', function () {
        showPopup('toothbrush');
    });

    addCurrentDateButton.addEventListener('click', addCurrentDate);
    addCustomDateButton.addEventListener('click', toggleCustomDateInput);
    customDateInput.addEventListener('change', addCustomDate);

    closePopup.addEventListener('click', function () {
        popup.classList.add('hidden');
    });

    window.addEventListener('click', function (event) {
        if (event.target === popup) {
            popup.classList.add('hidden');
        }
    });
});
