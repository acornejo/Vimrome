function sendChrome(action,msg) {
    if (!msg)
        msg={}
    msg.action=action;
    chrome.extension.connect().postMessage(msg);
}
function preg_quote (str) {
    return (str+'').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!<>\|\:])/g, '\\$1');
}

function followLink(elem,opentab) {
    var tag_name = elem.tagName.toLowerCase();
    var type = elem.type ? elem.type.toLowerCase() : "";
    opentab = opentab ? true : false;
    if (tag_name == 'a' && elem.href != '') {
        if (opentab)
            sendChrome("new_tab", {url: elem.href});
        else
            sendChrome("open_url", {url: elem.href});
    } else if (tag_name == 'input' && (type == "submit" || type == "button" || type == "reset")) {
        elem.click();
    } else if (tag_name == 'input' && (type == "radio" || type == "checkbox")) {
        // TODO: toggle checkbox
        elem.checked = !elem.checked;
    } else if (tag_name == 'input' || tag_name == 'textarea') {
        elem.focus();
        elem.setSelectionRange(elem.value.length, elem.value.length);
    }
}

function matchElem(regex,elem) {
    if (regex.test(elem.textContent) || regex.test(elem.title) || regex.test(elem.alt))
        return true;
    for (var k=0, klen=elem.childNodes.length; child=elem.childNodes[k], k<klen; k++)
        if (regex.test(child.textContent) || regex.test(child.title) || regex.test(child.alt))
            return true;
    return false;
}
