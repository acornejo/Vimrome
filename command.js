function addBox(str) {
    var box = document.getElementById('vimrome-box');
    var input = document.getElementById('vimrome-input');
    if (!box) {
        box = document.createElement("div");
        box.id = "vimrome-box";
        input = document.createElement("input");
        input.id = "vimrome-input";
        box.appendChild(input);
        document.body.appendChild(box);
    }
    box.style.display = 'block';
    if (str)
        input.value=str;
    input.focus()
    addInsertShortcut("<Enter>","command_exec");
    addInsertShortcut("<Esc>", "command_stop");
    addInsertShortcut("C-[", "command_stop");
}

function removeBox() {
    var box = document.getElementById('vimrome-box');
    if (box)
        document.body.removeChild(box);
    deleteInsertShortcut("<Enter>")
    addInsertShortcut("<Esc>", "go_cancel");
    addInsertShortcut("C-[", "go_cancel");
}

function boxExecute() {
    var input = document.getElementById('vimrome-input');
    if (input)
        execCommandStr(input.value);
    else
        alert("input not found!");
    removeBox();
}

addCommand("command_start", "Start command mode", function (arg) {addBox(arg[0]);});
addCommand("command_stop", "Stop command mode", function (arg) {removeBox();})
addCommand("command_exec", "Execute command", function (arg) {boxExecute();})
