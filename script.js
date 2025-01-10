document.addEventListener('DOMContentLoaded', function () {
    const historyList = document.getElementById('historyList');
    const habits = {
        bed: 'Changed Bed',
        bathtub: 'Washed Bathtub',
        toothbrush: 'Changed Toothbrush',
    };

    function addHabitEntry(habit) {
        const date = new Date().toLocaleString();
        const listItem = document.createElement('li');
        listItem.innerHTML = `<span>${habits[habit]}</span><span>${date}</span>`;
        historyList.appendChild(listItem);
    }

    document.getElementById('bedButton').addEventListener('click', function () {
        addHabitEntry('bed');
    });

    document.getElementById('bathtubButton').addEventListener('click', function () {
        addHabitEntry('bathtub');
    });

    document.getElementById('toothbrushButton').addEventListener('click', function () {
        addHabitEntry('toothbrush');
    });
});
