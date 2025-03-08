// Profile Menu Js 
const profileIcon = document.getElementById('profileIcon');
const profileMenu = document.getElementById('profileMenu');
profileIcon.addEventListener('click', () => {
    profileMenu.classList.toggle('hidden');
})