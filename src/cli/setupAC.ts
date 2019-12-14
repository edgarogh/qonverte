import omeletteConfig from './omeletteConfig';

try {
    // Only install completions if module is being globally installed
    const npmConfigArgv: any = JSON.parse(process.env.npm_config_argv)
    const npmInstalling: boolean = (npmConfigArgv.cooked || []).includes('i');
    
    if (npmInstalling && process.env.npm_config_global) {
        omeletteConfig.setupShellInitFile();
        console.error('Successfully installed autocompletion');
    } else {
        console.error('Skipped autocompletion install for non-global module');
    }
} catch (e) {
    console.error('(info / non-fatal) Couldn\'t install autocompletion', e);
}
