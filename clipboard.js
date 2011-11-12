// TODO: Bypass copy restrictions through background page
// this code is currently unused and untested

function copyToClip(str)
{
    var textarea = document.createElement("textarea");
    textarea.style.position = "absolute";
    textarea.style.left = "-100%";
    textarea.value = str;
    document.body.appendChild(textarea);
    textarea.select();
    var text = document.selection.createRange();
    text.execCommand("Copy");
    document.body.removeChild(textarea);
}

function pasteFromClip()
{
    var textarea = document.createElement("textarea");
    textarea.style.position = "absolute";
    textarea.style.left = "-100%";
    textarea.value = "";;
    document.body.appendChild(textarea);
    textarea.focus();
    var text = textarea.createTextRange();
    text.execCommand("Paste");
    var str = textarea.value;
    document.body.removeChild(textarea);
    return str;

}

addCommand("copyurl", "Copy current URL to clipboard",
        function (args) { copyToClip(location.href); });

addCommand("pasteurl", "Open URL stored in clipboard",
        function (args) {execCommand("open "+pasteFromClip());});

addCommand("pasteurlnewtab", "Open URL stored in clipboard in new tab",
        function (args) {execCommand("newtab "+pasteFromClip());});
