const notificationElement =
    `<div class="notification [[type]]">
        <div class="content">
            <p>[[message]]</p>
            <div style="flex-grow:1"></div>
            <button type="button" name="Delete" class="del">
                <img draggable="false" src="${document.currentScript.src.slice(0, -("notifier.js".length))}img/cross.svg" alt="Delete">
            </button>
        </div>
        <div class="timer"></div>
    </div>`;

function buildActions(id, actions) {
    if(actions.length == 0) return "";

    let actionButtons = document.createElement("div");
    actionButtons.classList.add("notificationActions");
    for(let action of actions) {
        let button = document.createElement("button");
        button.classList.add(action.type);
        button.innerText = action.name;
        button.name = action.name;
        button.addEventListener("click", () => {
            console.log("fired!");
            action.action();
            notifier.deleteNotification(id);
        }, {once: true});
        actionButtons.appendChild(button);
    }

    return actionButtons;
}

// Setup the notifier
const notifier = {};
notifier.tray = document.querySelector('#notifier-tray');
notifier.idGen = (function* () {
    let id = 0;
    while(true) yield id++;
})();
notifier.notifications = {};
notifier.notify = (message, type, actions) => {
    if(type === undefined) type = 'info';
    type = ['info', 'success', 'warning', 'error'].includes(type) ? type : 'info';

    let id = notifier.idGen.next().value;
    let notification = notificationElement
        .replace("[[type]]", type)
        .replace("[[message]]", message);
    notification = new DOMParser().parseFromString(notification, "text/html").querySelector("body>*");
    if((actions ?? []).length > 0) notification.querySelector(".del").insertAdjacentElement("beforeBegin", buildActions(id, actions))
    notifier.tray.insertAdjacentElement('beforeEnd', notification);

    setTimeout(() => notification.classList.add('show'), 20);

    notification.querySelector(".timer").addEventListener("animationend", notifier.deleteNotification.bind(notifier, id));
    notification.querySelector(".del").addEventListener("click", notifier.deleteNotification.bind(notifier, id));
    notification.addEventListener("mouseover", (e) => {
        let timer = notification.querySelector(".timer");
        timer.style.animationPlayState = "paused";
        notification.addEventListener("mouseout", () => {
            timer.style.animationPlayState = "running";
        }, {once: true});
    });

    notification.setAttribute("notif-id", id);
    notifier.notifications[id] = notification;
    return notification;
};
notifier.style = (variable, style) => {
    if(style === undefined) return getComputedStyle(notifier.tray).getPropertyValue(`--${variable}`);
    else notifier.tray.style.setProperty(`--${variable}`, style);
}
notifier.deleteNotification = (id) => {
    let notification = notifier.notifications[id];
    delete notifier.notifications[id];
    notification?.classList?.remove('show');
    setTimeout(() => notification?.remove(), 220);
}

globalThis.notifier = notifier;