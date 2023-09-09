document.querySelectorAll(".ytd-macro-markers-list-renderer ytd-macro-markers-list-item-renderer").forEach((video, index, arr) => {
    //debugger;

    function formatTime(seconds) {
        const hours = parseInt(seconds / 3600);
        const minutes = parseInt((seconds % 3600) / 60);
        const remainingSeconds = parseInt(seconds % 60);

        let formattedTime = '';

        if (hours > 0) {
            formattedTime += `${hours}h `;
        }

        if (minutes > 0 || hours > 0) {
            formattedTime += `${minutes}m `;
        }

        if (remainingSeconds > 0 || (hours === 0 && minutes === 0)) {
            formattedTime += `${remainingSeconds}s`;
        }

        return formattedTime.trim();
    }

    var prevSectionTime = arr[index].querySelector("#endpoint #details #time").textContent;
    var nextSectionTime = arr[index + 1].querySelector("#endpoint #details #time").textContent;

    var chapters = [];

    var start = prevSectionTime.split(":");
    var end = nextSectionTime.split(":");

    let startTime, endTime;

    if (start.length === 3 && end.length === 3) {
        // Both sections contain time in hours, minutes and seconds
        startTime = parseInt(start[0]) * 3600 + parseInt(start[1]) * 60 + parseInt(start[2]);
        endTime = parseInt(end[0]) * 3600 + parseInt(end[1]) * 60 + parseInt(end[2]);
    } else {
        // One or both sections contain only minutes and seconds
        startTime = parseInt(start[0]) * 60 + parseInt(start[1]);
        endTime = parseInt(end[0]) * 60 + parseInt(end[1]);
    }

    const duration = endTime - startTime;

    const formattedDuration = formatTime(duration);

    chapters.push({ video, duration: formattedDuration });

    function afterAddElement() {
        let div = document.createElement("div");
        div.id = "duration";
        div.className = "style-scope ytd-macro-markers-list-item-renderer";
        div.style.cssText = 'margin-top: -18px; text-align: right; margin-right: 4px; color: var(--yt-spec-icon-disabled);';
        div.textContent = formattedDuration;
        arr[index].querySelector("#endpoint #details #time").after(div);
    }

    afterAddElement();

});
