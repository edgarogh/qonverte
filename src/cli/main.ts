#!/usr/bin/env node
import omeletteConfig from './omeletteConfig';
import parseArgs from './parseArgs';
import showFormats from './showFormats';
import showHelp from './showHelp';

// Shell autocompletion
omeletteConfig.init();

process.argv.splice(0, 2);

if (process.argv.length === 0) {
    showHelp();
    process.exit(1);
}

if (process.argv[0] === '-ls') {
    showFormats();
    process.exit(0);
}

const { input, output } = parseArgs(process.argv);

process.stdin
    .pipe(input())
    .pipe(output())
    .pipe(process.stdout);
