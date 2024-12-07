'use client';

import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';

function HybridEditor() {
    const [value, setValue] = React.useState("console.log('hello world!');");
    const onChange = React.useCallback((val: string, viewUpdate: any) => {
        console.log('val:', val);
        setValue(val);
    }, []);
    return <div contentEditable={true}>Hola</div>;
}

export default HybridEditor;

