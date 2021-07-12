'use strict';

module.exports = async function sidebarComponent() {
  const html = `<div class="sidebar-menu">
      <a href="#" class="sidebar-link sanduk-tool"
         data-sanduk-tool-isActive="false"
         data-sanduk-tool-name="base64-encoder-decoder"
         id="base64-encoder-decoder-sidebar-link">Base64 Encoder Decoder
      </a>
      <a href="#" class="sidebar-link sanduk-tool"
         data-sanduk-tool-isActive="false"
         data-sanduk-tool-name="epoch"
         id="epoch-sidebar-link">Epoch
      </a>
      <a href="#" class="sidebar-link sanduk-tool"
         data-sanduk-tool-isActive="false"
         data-sanduk-tool-name="json-formatter"
         id="json-formatter-sidebar-link">JSON Formatter
      </a>
      <a href="#" class="sidebar-link sanduk-tool"
         data-sanduk-tool-isActive="false"
         data-sanduk-tool-name="jwt-decoder"
         id="jwt-decoder-sidebar-link">JWT Decoder
      </a>
      <a href="#" class="sidebar-link sanduk-tool"
         data-sanduk-tool-isActive="false"
         data-sanduk-tool-name="uuid"
         id="uuid-sidebar-link">UUID
      </a>
      <a href="#" class="sidebar-link sanduk-tool"
         data-sanduk-tool-isActive="false"
         data-sanduk-tool-name="xml-formatter"
         id="xml-formatter-sidebar-link">XML Formatter
      </a>
    </div>`;

  document.getElementById('sidebar').innerHTML = html;
};
