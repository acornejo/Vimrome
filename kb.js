var exclude_urls = [/\/\/www\.google\.[^\/]+\/reader\//, /\/\/mail\.google\.com\/mail\//, /\/\/docs\.google\.com\//, /\/\/www\.facebook\.com\//, /\/\/www\.pandora\.com\//]
for (var i = 0; i < exclude_urls.length; i++) {
    if (exclude_urls[i].test(location.href))
        return;
}

document.addEventListener( 'keydown', keyHandler, false);

var command_list = [];
var shortcut_list = [];
var insert_shortcut_list = []
var pressedKeys = "";

function addCommand(name, d, f) {
    command_list[name]={desc: d, func: f}
}

function evalCommand(command,args) {
    if (!args) args=[];
    if (command in command_list)
        command_list[command].func(args);
    else
        if (command.length > 0)
            alert("Command "+command+" not found!");
}

function execCommandStr(str) {
    var args = str.split(' ');
    var command = args.shift();
    evalCommand(command,args);
}

function addShortcut(key, cmd, args) {
    if (!args) args=[];
    shortcut_list[key]={command: cmd, params: args};
}

function addInsertShortcut(key, cmd, args) {
    if (!args) args=[];
    insert_shortcut_list[key]={command: cmd, params: args};
}

function deleteShortcut(key) {
    delete shortcut_list[key];
}

function deleteInsertShortcut(key) {
    delete insert_shortcut_list[key];
}


function triggerShortcut(shortcut) {
    evalCommand(shortcut.command,shortcut.params);
}

addShortcut('j','vscroll_line',[1]);
addShortcut('C-d','vscroll_page',[1]);
addShortcut('k','vscroll_line',[-1]);
addShortcut('C-u','vscroll_page',[-1])
addShortcut('h','hscroll_char',[-1]);
addShortcut('l','hscroll_char',[1]);
addShortcut('G','scroll_bottom');
addShortcut('gg','scroll_top');
addShortcut('o','command_start',['open ']);
addShortcut('t','command_start',['tabopen ']);
addShortcut('r','tabreload');
addShortcut('d','tabclose');
addShortcut('u','tabunclose');
addShortcut('C-i','tabprev');
addShortcut('C-o','tabnext');
addShortcut('J','tabprev');
addShortcut('K','tabnext');
addShortcut('H','history_back');
addShortcut('L','history_forward');
addShortcut('[[','go_previous');
addShortcut(']]','go_next');
addShortcut('gi','go_input');
addShortcut('gu','gourlup');
addShortcut('<Esc>','go_cancel');
addShortcut('C-[','go_cancel');
addShortcut('zz','zoom_reset');
addShortcut('zi','zoom',[1]);
addShortcut('zo','zoom',[-1]);
addShortcut('f', 'hints',[false]);
addShortcut('F', 'hints',[true]);
addShortcut(':', 'command_start');
addInsertShortcut('<Esc>','go_cancel');
addInsertShortcut('C-[','go_cancel');
addInsertShortcut("C-a","edit_gostart");
addInsertShortcut("C-e","edit_goend");
addInsertShortcut("C-f","edit_forwardchar");
addInsertShortcut("C-b","edit_backwardchar");
addInsertShortcut("C-u","edit_deletebackward");
addInsertShortcut("C-k","edit_deleteforward");

function keyHandler(e) {
    var target = e.target;
    var tag_name = target.tagName.toLowerCase()

    if (target.nodeType != 1)
        return;
    
    var key = get_key(e);
    pressedKeys = pressedKeys + key;

    if (tag_name != "input" && tag_name != "textarea")
        slist = shortcut_list;
    else
        slist = insert_shortcut_list;

    if (pressedKeys in slist) {
        e.preventDefault();
        triggerShortcut(slist[pressedKeys]);
        pressedKeys = '';
        return;
    }

    var regex="^"+preg_quote(pressedKeys)+"[^-]";
    for (var shortcut in slist) {
        if (shortcut.match(regex)) {
            e.preventDefault();
            return;
        }
    }

    pressedKeys = '';
}

var keyId = {
    "U+0008" : "BackSpace",
    "U+0009" : "Tab",
    "U+0018" : "Cancel",
    "U+001B" : "Esc",
    "U+0020" : "Space",
    "U+0021" : "!",
    "U+0022" : "\"",
    "U+0023" : "#",
    "U+0024" : "$",
    "U+0026" : "&",
    "U+0027" : "'",
    "U+0028" : "(",
    "U+0029" : ")",
    "U+002A" : "*",
    "U+002B" : "+",
    "U+002C" : ",",
    "U+002D" : "-",
    "U+002E" : ".",
    "U+002F" : "/",
    "U+0030" : "0",
    "U+0031" : "1",
    "U+0032" : "2",
    "U+0033" : "3",
    "U+0034" : "4",
    "U+0035" : "5",
    "U+0036" : "6",
    "U+0037" : "7",
    "U+0038" : "8",
    "U+0039" : "9",
    "U+003A" : ":",
    "U+003B" : ";",
    "U+003C" : "<",
    "U+003D" : "=",
    "U+003E" : ">",
    "U+003F" : "?",
    "U+0040" : "@",
    "U+0041" : "a",
    "U+0042" : "b",
    "U+0043" : "c",
    "U+0044" : "d",
    "U+0045" : "e",
    "U+0046" : "f",
    "U+0047" : "g",
    "U+0048" : "h",
    "U+0049" : "i",
    "U+004A" : "j",
    "U+004B" : "k",
    "U+004C" : "l",
    "U+004D" : "m",
    "U+004E" : "n",
    "U+004F" : "o",
    "U+0050" : "p",
    "U+0051" : "q",
    "U+0052" : "r",
    "U+0053" : "s",
    "U+0054" : "t",
    "U+0055" : "u",
    "U+0056" : "v",
    "U+0057" : "w",
    "U+0058" : "x",
    "U+0059" : "y",
    "U+005A" : "z",
    "U+005B" : "[",
    //"U+005C" : "\\",
    "U+005D" : "]",
    "U+005E" : "^",
    "U+005F" : "_",
    "U+0060" : "`",
    "U+007B" : "{",
    "U+007C" : "|",
    "U+007D" : "}",
    "U+007F" : "Delete",
    "U+00A1" : "¡",
    "U+00DB" : "[",
    "U+00DD" : "]",
    "U+0300" : "CombGrave",
    "U+0300" : "CombAcute",
    "U+0302" : "CombCircum",
    "U+0303" : "CombTilde",
    "U+0304" : "CombMacron",
    "U+0306" : "CombBreve",
    "U+0307" : "CombDot",
    "U+0308" : "CombDiaer",
    "U+030A" : "CombRing",
    "U+030B" : "CombDblAcute",
    "U+030C" : "CombCaron",
    "U+0327" : "CombCedilla",
    "U+0328" : "CombOgonek",
    "U+0345" : "CombYpogeg",
    "U+20AC" : "€",
    "U+3099" : "CombVoice",
    "U+309A" : "CombSVoice"}

function get_key(e) {
    var key = keyId[e.keyIdentifier] || e.keyIdentifier,
        ctrl = e.ctrlKey ? 'C-' : '',
        meta = (e.metaKey || e.altKey) ? 'M-' : '',
        shift = e.shiftKey ? 'S-' : '';
    if (key.length > 2) key = '<'+key+'>';
    if (e.shiftKey) {
        if (/^[a-z]$/.test(key)) 
            return ctrl+meta+key.toUpperCase();
        else if (/^[0-9]$/.test(key)) {
            shiftKeys=[')','!','@','#','$','%','^','&','*','('];
            return shiftKeys[Number(key)];
        }
        else if (key.length > 2)
            return ctrl+meta+shift+key;
    }
    return ctrl+meta+key;
}
