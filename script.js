document.addEventListener('DOMContentLoaded', async function () {
    const popup = document.getElementById('popup');
    const popupList = document.getElementById('popupList');
    const popupTitle = document.getElementById('popupTitle');
    const closePopup = document.getElementById('closePopup');
    const addCurrentDateButton = document.getElementById('addCurrentDateButton');
    const addCustomDateButton = document.getElementById('addCustomDateButton');
    const customDateInput = document.getElementById('customDateInput');
    const buttonContainer = document.querySelector('.button-container');

    const backEndUrl = "https://homemanagementserver-production.up.railway.app/habits";
    const userId = "User"; // or the correct user ID
    const apiKey = 'elvetia_tara_faina'


    let currentHabit = '';

    // Fetch habits from the API
    async function fetchHabits() {
        try {
            const response = await fetch(`${backEndUrl}/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'elvetia_tara_faina',
                    'Content-Type': 'application/json'
                }
            });
            const habits = await response.json();
            populateButtons(habits);
        } catch (error) {
            console.error('Error fetching habits:', error);
        }
    }

    // Populate buttons based on fetched habits
    function populateButtons(habits) {
        habits.forEach(habit => {
            const button = document.createElement('button');
            button.classList.add('habit-button');
            button.textContent = habit.name;
            button.addEventListener('click', () => showPopup(habit));
            buttonContainer.appendChild(button);
        });
    }

    // Show popup with habit history
    function showPopup(habit) {
        currentHabit = habit;
        popupTitle.textContent = `${habit.name} History`;
        const datesHtml = habit.lastDate.date.map((date, index) => {
            const dateString = new Date(date).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' });
            return `<li style="font-size: ${index === habit.lastDate.date.length - 1 ? '2em' : '1em'}">${dateString}</li>`;
        }).join('');

        // Calculate the date two weeks after the last date
        const lastDate = new Date(habit.lastDate.date[habit.lastDate.date.length - 1]);
        const twoWeeksLater = new Date(lastDate);
        twoWeeksLater.setDate(lastDate.getDate() + 14);
        const twoWeeksLaterString = twoWeeksLater.toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' });

        // Append the new date with a different color
        const additionalDateHtml = `<li style="font-size: 2em; color: purple;">❯${twoWeeksLaterString}❯</li>`;

        // Combine the original list with the new item
        popupList.innerHTML = datesHtml + additionalDateHtml;

        //   popupList.innerHTML = habit.lastDate.date.map(date => `<li>${new Date(date).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}</li>`).join('');
        popup.classList.remove('hidden');
    }

    // Add current date to the habit
    async function addCurrentDate() {
        const date = new Date().toISOString();
        await addHabitEntry(currentHabit.name, date);
        currentHabit.lastDate.date.push(date);
        showPopup(currentHabit); // Refresh the popup with the new entry
    }

    // Toggle custom date input visibility
    function toggleCustomDateInput() {
        customDateInput.classList.toggle('hidden');
    }

    // Add custom date to the habit
    async function addCustomDate() {
        const customDate = customDateInput.value;
        if (customDate) {
            await addHabitEntry(currentHabit.name, new Date(customDate).toISOString());
            customDateInput.value = '';
            customDateInput.classList.add('hidden');
            currentHabit.lastDate.date.push(customDate);
            showPopup(currentHabit); // Refresh the popup with the new entry
        }
    }

    // Add habit entry via POST API
    async function addHabitEntry(habitName, date) {
        try {
            const response = await fetch(`${backEndUrl}/${userId}/${habitName}`, {
                method: 'POST',
                headers: {
                    'Authorization': 'elvetia_tara_faina',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ date })
            });
            const result = await response.text();
            console.log(result);
        } catch (error) {
            console.error('Error adding habit entry:', error);
        }
    }

    closePopup.addEventListener('click', function () {
        popup.classList.add('hidden');
    });

    window.addEventListener('click', function (event) {
        if (event.target === popup) {
            popup.classList.add('hidden');
        }
    });

    addCurrentDateButton.addEventListener('click', addCurrentDate);
    addCustomDateButton.addEventListener('click', toggleCustomDateInput);
    customDateInput.addEventListener('change', addCustomDate);

    // Initial fetch of habits
    fetchHabits();
});
