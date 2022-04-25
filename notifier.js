const notificationElement =
    `<div class="notification [[type]]">
        <div class="content">
            <p>[[message]]</p>
            <button type="button" name="Delete" class="del">
                <img draggable="false" src="${document.currentScript.src.slice(0, -("notifier.js".length))}img/cross.svg" alt="Delete">
            </button>
        </div>
        <div class="timer"></div>
    </div>`;

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
    let notification = notificationElement.replace("[[type]]", type).replace("[[message]]", message);
    notification = new DOMParser().parseFromString(notification, "text/html").querySelector("body>*");
    notifier.tray.insertAdjacentElement('afterBegin', notification);

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