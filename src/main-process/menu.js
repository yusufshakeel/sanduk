const {Menu, shell} = require('electron');

const macOSSpecificMenu = () => {
    return process.platform === 'darwin' ? [
        {
            role: 'appMenu'
        }
    ] : {};
};

function appMenu(appWindow) {
    const template = [
        ...macOSSpecificMenu(),
        {
            label: 'Tools',
            submenu: [
                {
                    label: 'UUID'
                }
            ]
        },
        {role: 'editMenu'},
        {
            role: 'help',
            submenu: [
                {
                    label: 'Project Code',
                    click: () => {
                        shell.openExternal(require('../../package.json').homepage)
                    }
                }
            ]
        }
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

module.exports = appMenu;
