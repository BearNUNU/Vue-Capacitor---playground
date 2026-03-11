import { MultiWebView } from 'capacitor-multi-webview';

window.testEcho = () => {
    const inputValue = document.getElementById("echoInput").value;
    MultiWebView.echo({ value: inputValue })
}
