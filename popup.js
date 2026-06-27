const setupView = document.getElementById('setup-view');
const statusView = document.getElementById('status-view');
const timerInput = document.getElementById('timer-input');
const scheduledTimeSpan = document.getElementById('scheduled-time');

chrome.storage.local.get(['targetTime'], data => {
    if (data.targetTime) {
        setupView.classList.add('hidden');
        statusView.classList.remove('hidden');
        scheduledTimeSpan.innerText = data.targetTime;
    }
});

document.getElementById('save-btn').addEventListener('click', async () => {
    const timeVal = timerInput.value;

    if (!timeVal) {
        alert("Vui lòng chọn thời gian!");

        return;
    }

    await chrome.runtime.sendMessage({ type: "SET_ALARM", time: timeVal });
    window.close();
});

document.getElementById('delete-btn').addEventListener('click', async () => {
    await chrome.runtime.sendMessage({ type: "DELETE_ALARM" });
    window.close();
});

document.getElementById('exit-btn-1').onclick = () => window.close();
document.getElementById('exit-btn-2').onclick = () => window.close();