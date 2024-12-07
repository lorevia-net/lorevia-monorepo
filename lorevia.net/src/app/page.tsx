'use client';
function HybridEditor() {
    return <div contentEditable onInput={(e) => console.log({ text: e.currentTarget.textContent })}>Hola</div>;
}

export default HybridEditor;

