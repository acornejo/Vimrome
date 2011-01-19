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

}

addCommand("copy_currenturl", "Copy current URL to clipboard",
        function (args) {
            url = location.href;

        }
        );

// TODO: Bypass copy restrictions through background page
