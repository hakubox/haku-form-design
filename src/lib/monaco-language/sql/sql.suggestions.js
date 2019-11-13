import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

// {
//     label: 'ifelse',
//     kind: monaco.languages.CompletionItemKind.Snippet,
//     insertText: [
//         'if (${1:condition}) {',
//         '\t$0',
//         '} else {',
//         '\t',
//         '}'
//     ].join('\n'),
//     insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
//     documentation: 'If-Else Statement'
// }

export let suggestions = [
    {
        label: 'ssf',
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: 'SELECT $1 FROM $0',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'SELECT $1 FROM $0'
    }, {
        label: 'orderby',
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: 'ORDER BY',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'ORDER BY'
    }, {
        label: 'groupby',
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: 'GROUP BY',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'GROUP BY'
    }
]