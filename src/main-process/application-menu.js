'use strict';
const { Menu, shell } = require('electron');

const macOSSpecificMenu = () => {
  if (process.platform === 'darwin') {
    return [
      {
        label: 'Sanduk',
        role: 'appMenu',
        submenu: [
          { role: 'about' },
          { type: 'separator' },
          { role: 'services' },
          { type: 'separator' },
          { role: 'hide' },
          { role: 'hideothers' },
          { role: 'unhide' },
          { type: 'separator' },
          { role: 'quit' }
        ]
      }
    ];
  } else {
    return {};
  }
};

function applicationMenu() {
  const template = [
    ...macOSSpecificMenu(),
    {
      label: 'Tools',
      submenu: [
        {
          label: 'UUID'
        },
        { type: 'separator' }
      ]
    },
    { role: 'editMenu' },
    {
      role: 'help',
      submenu: [
        {
          label: 'Project Code',
          click: () => {
            shell.openExternal(require('../../package.json').homepage);
          }
        }
      ]
    }
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

module.exports = applicationMenu;
