'use client';

import React, { useEffect, useRef, useState } from 'react';
import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { markdown } from '@codemirror/lang-markdown';
import MarkdownIt from 'markdown-it';

const HybridEditor = () => {
    const editorRef = useRef(null); // Reference to the DOM element for CodeMirror
    const editorViewRef = useRef(null); // Persist the EditorView instance
    const [htmlPreview, setHtmlPreview] = useState(''); // State for rendered HTML preview
    const mdParser = new MarkdownIt(); // Markdown parser instance

    // Initialize CodeMirror editor
    useEffect(() => {
        if (editorRef.current && !editorViewRef.current) {
            const state = EditorState.create({
                doc: '', // Initial content
                extensions: [
                    markdown(),
                    EditorView.updateListener.of((update) => {
                        if (update.docChanged) {
                            const text = update.state.doc.toString();
                            setHtmlPreview(mdParser.render(text)); // Update preview only
                        }
                    }),
                ],
            });

            editorViewRef.current = new EditorView({
                state,
                parent: editorRef.current,
            });
        }

        // Cleanup on unmount
        return () => {
            if (editorViewRef.current) {
                editorViewRef.current.destroy();
                editorViewRef.current = null;
            }
        };
    }, []);

    return (
        <div style={{ display: 'flex', gap: '20px' }}>
            {/* Editor */}
            <div
                ref={editorRef}
                style={{
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    padding: '10px',
                    width: '50%',
                    minHeight: '200px', // Ensure the editor has enough height
                }}
            ></div>

            {/* Preview */}
            <div
                style={{
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    padding: '10px',
                    width: '50%',
                    overflowY: 'auto',
                    minHeight: '200px', // Match the editor height
                }}
                dangerouslySetInnerHTML={{ __html: htmlPreview }}
            ></div>
        </div>
    );
};

export default HybridEditor;
