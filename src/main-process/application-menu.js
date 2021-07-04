'use strict';
const { Menu, shell } = require('electron');

const macOSSpecificMenu = () => {
  if (process.platform === 'darwin') {
    return [
      {
        role: 'appMenu'
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
        }
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
