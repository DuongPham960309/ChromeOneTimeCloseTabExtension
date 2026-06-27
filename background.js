const ALARM_NAME = "oneTimeCloseTab";

chrome.runtime.onMessage.addListener(async (request) => {
    if (request.type === "SET_ALARM") {
        const [hour, minute] = request.time.split(':').map(Number);
        const timestamp = getNextTargetTime(hour, minute);
        
        await Promise.all([
            chrome.storage.local.set({ targetTime: request.time }),
            chrome.alarms.create(ALARM_NAME, { when: timestamp })
        ]);

        return { status: "success" };
    }
    else if (request.type === "DELETE_ALARM") {
        await Promise.all([
            chrome.alarms.clear(ALARM_NAME),
            chrome.storage.local.remove(['targetTime'])
        ]);

        return { status: "deleted" };
    }
});

const getNextTargetTime = (hour, minute) => {
    const now = new Date();
    const targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0, 0);
    
    if (now.getTime() >= targetDate.getTime()) {
        targetDate.setDate(targetDate.getDate() + 1);
    }

    return targetDate.getTime();
};

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === ALARM_NAME) {
        closeYoutubeTabs();
    }
});

const closeYoutubeTabs = () => {
    chrome.tabs.query({ url: "*:\/\/*.youtube.com/*" }, (tabs) => {
        if (tabs && tabs.length > 0) {
            const tabIds = tabs.map(tab => tab.id).filter(id => id !== undefined);
            
            if (tabIds.length > 0) {
                chrome.tabs.remove(tabIds, () => {
                    chrome.storage.local.remove(['targetTime']);
                });

                return;
            }
        }
        
        chrome.storage.local.remove(['targetTime']);
    });
};