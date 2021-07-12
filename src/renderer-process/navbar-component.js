'use strict';

module.exports = async function navbarComponent() {
  const html = `<div class="navbar-content">
      <button class="btn" type="button" onclick="halfmoon.toggleSidebar()">
        <i class="fas fa-bars" aria-hidden="true"></i>
        <span class="sr-only">Toggle sidebar</span> <!-- sr-only = show only on screen readers -->
      </button>
    </div>
    <div class="navbar-text ml-5">
      <img src="../../resources/app-icons/stable/png/32.png" style="height: 20px; width: 20px;" alt="sanduk logo">
      <span class="ml-5">sanduk</span>
    </div>`;

  document.getElementById('navbar').innerHTML = html;
};
