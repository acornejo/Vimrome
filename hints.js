var hint_num_str = '';
var hint_elems = [];
var hint_open_in_new_tab = false;

addCommand("hints", "Start hint mode",
        function (args) {
            if (args[0])
                hint_open_in_new_tab = true;
            else
                hint_open_in_new_tab = false;
            hint_num_str = '';
            addHints();
        });

function hintHandler(e){
    e.preventDefault();
    var key = get_key(e);
    if (key == '<Enter>') {
        if (hint_num_str == '')
            removeHints();
        else
            judgeHintNum(Number(hint_num_str));
    } else if (/[0-9]/.test(key) == false) {
        removeHints();
    } else {
        hint_num_str += key;
        var hintnum = Number(hint_num_str);
        if (hintnum * 10 > hint_elems.length + 1)
            judgeHintNum(hintnum);
        else {
            for (var i = 0; i < hint_elems.length; i++)
                setHighlight(hint_elems[i],false);
            setHighlightPrefix(hintnum);
        }
    }
}

function setHighlightPrefix(prefix)
{
    if (prefix > hint_elems.length || prefix != Number(prefix))
        return;
    setHighlight(hint_elems[prefix-1],true);
    for (var i=0; i<10; i++)
        setHighlightPrefix(prefix*10+i);
}

function setHighlight(elem, is_active) {
    if (elem.tagName.toLowerCase() == 'a')
        if (is_active)
            elem.setAttribute('highlight', 'hint_active');
        else
            elem.setAttribute('highlight', 'hint_inactive');
}

function judgeHintNum(hintnum) {
    var elem = hint_elems[hintnum - 1];
    if (elem != undefined) {
        for (var i = 0; i<hint_elems.length; i++)
            setHighlight(hint_elems[i],false);
        setHighlight(elem,true);
        followLink(elem, hint_open_in_new_tab);
        setTimeout('removeHints()',500);
    }
    else
        removeHints();
}

function addHints() {
    var zoom = currentZoom();
    var win_top = window.scrollY / zoom;
    var win_bottom = win_top + window.innerHeight;
    var win_left = window.scrollX / zoom;
    var win_right = win_left + window.innerWidth;
    var elems = document.body.querySelectorAll('a, input:not([type=hidden]), area, textarea, select, button, *[onclick]');
    var div = document.createElement('div');
    div.id = "hintContainer";
    hint_elems = [];
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        var pos = elem.getBoundingClientRect();
        var elem_top = win_top + pos.top;
        var elem_bottom = win_top + pos.bottom;
        var elem_left = win_left + pos.left;
        var elem_right = win_left + pos.left;
        if (pos.height != 0 && pos.width != 0 &&  elem_bottom >= win_top && elem_top <= win_bottom) {
            hint_elems.push(elem);
            var span = document.createElement('span');
            span.className="hintClass";
            span.style['left']=elem_left + "px";
            span.style['top']=elem_top + "px";
            span.innerHTML = hint_elems.length;
            div.appendChild(span);
            setHighlight(elem, false);
        }
    }
    document.body.appendChild(div);
    document.removeEventListener('keydown', keyHandler, false);
    document.addEventListener('keydown', hintHandler, false);
}

function removeHints() {
    for (var i = 0; i < hint_elems.length; i++)
        hint_elems[i].removeAttribute('highlight');
    hint_elems = [];
    hint_num_str = '';
    var div = document.getElementById("hintContainer");
    if (div != undefined)
        document.body.removeChild(div);
    document.removeEventListener('keydown', hintHandler, false);
    document.addEventListener('keydown', keyHandler, false);
}
