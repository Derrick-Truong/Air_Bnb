import './DropDown.css'
export default function toggleDropdown() {
    var dropdownContent = document.querySelector(".dropdown-content");
    dropdownContent.classList.toggle("show");


window.onclick = function (event) {
    if (!event.target.matches('.dropdown button')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

return (
    <>

        <div class="dropdown">
            <button onclick="toggleDropdown()">Toggle Dropdown</button>
            <div class="dropdown-content">
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
            </div>
        </div>


    </>
)
}
