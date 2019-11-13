/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { registerLanguage } from 'monaco-editor/esm/vs/basic-languages/_.contribution.js';

registerLanguage({
    id: 'sql',
    extensions: ['.sql'],
    aliases: ['SQL'],
    loader: () => import('./sql.js')
});

let sqlLanguage = require('./sql.js').language;

monaco.languages.registerCompletionItemProvider('sql', {
    provideCompletionItems(model, position) {
        let textUntilPosition = model.getValueInRange({
            startLineNumber: position.lineNumber,
            startColumn: 1,
            endLineNumber: position.lineNumber,
            endColumn: position.column
        });
        let match = textUntilPosition.match(/(\S+)$/);
        if (!match) return [];
        match = match[0].toUpperCase();
        let suggestions = [];
        sqlLanguage.keywords.forEach(item => {
            if (item.indexOf(match) !== -1) {
                suggestions.push({
                    label: item,
                    kind: monaco.languages.CompletionItemKind.Keyword,
                    insertText: item
                });
            }
        });
        sqlLanguage.operators.forEach(item => {
            if (item.indexOf(match) !== -1) {
                suggestions.push({
                    label: item,
                    kind: monaco.languages.CompletionItemKind.Operator,
                    insertText: item
                });
            }
        });
        sqlLanguage.builtinFunctions.forEach(item => {
            if (item.indexOf(match) !== -1) {
                suggestions.push({
                    label: item,
                    kind: monaco.languages.CompletionItemKind.Function,
                    insertText: item
                });
            }
        });
        return {
            suggestions: suggestions.concat(require('./sql.suggestions.js').suggestions),
        };
    }
});