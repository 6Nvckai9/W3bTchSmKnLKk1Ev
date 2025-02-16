// AOS
AOS.init({
    duration: 1200,
});

const staffContainer = document.querySelector('.staffBox-item');
const scrollLeftButton = document.getElementById('scrollLeft');
const scrollRightButton = document.getElementById('scrollRight');

function toggleMenu() {
    const menu = document.getElementById("dropdown-menu");
    menu.classList.toggle("hidden");
}

// HAMBURGER MENU
const hamburger = document.getElementById("hamburger");
const dropdownMenu = document.getElementById("dropdown-menu");

hamburger.addEventListener("click", () => {
    dropdownMenu.classList.toggle("hidden");
});

// DONATION DATABASE
document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ DOM Loaded!");

    const tableBody = document.getElementById("donationTable");
    console.log("🔍 Table body :", tableBody);

    if (!tableBody) {
        console.error("❌ ERROR : Elemen 'donationTable' tidak ditemukan di DOM!");
        return;
    }

    fetch("../database/donations.json")
        .then(response => response.json())
        .then(data => {
            tableBody.innerHTML = "";
            data.forEach(donation => {
                const row = `
                    <tr class="border-b border-gray-700">
                        <td class="py-2 px-4">${donation.nama}</td>
                        <td class="py-2 px-4">${donation.note}</td>
                        <td class="py-2 px-4 text-yellow-500">${donation.jumlah}</td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => console.error("⚠️ Error fetching donation data:", error));
});

// STAFF DATABASE
document.addEventListener("DOMContentLoaded", function () {
    fetch("../database/staff.json")
        .then(response => response.json())
        .then(data => {
            const staffContainer = document.getElementById("staff");
            staffContainer.innerHTML = "";

            data.staff.forEach(category => {
                let categoryHTML = `
                    <div>
                        <div class="text-center my-10" data-aos="fade-up">
                            <h1 class="text-xl sm:text-2xl md:text-3xl font-bold">
                                <span class="text-yellow-500">${category.category}</span>
                            </h1>
                            <p class="text-sm">${category.description}</p>
                        </div>
                    <div class="flex flex-wrap justify-center gap-12">`;
                category.members.forEach(member => {
                    categoryHTML += `
                        <div class="flex flex-col items-center bg-black/50 p-5 rounded-2xl max-w-xs w-full sm:w-48 shadow-lg hover:shadow-xl transition-all duration-300" data-aos="fade-up">
                            <img src="${member.image}" alt="${member.name}" class="w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-3 border-2 border-yellow-500 shadow-md">
                            <p class="text-sm sm:text-base font-semibold">${member.name}</p>
                            <p class="text-sm sm:text-base font-light">${member.role}</p>
                        </div>
                    `;
                });

                categoryHTML += `</div></div>`;
                staffContainer.innerHTML += categoryHTML;
            });
        })
        .catch(error => console.error("Error fetching staff data:", error));
});

// LEADERBAORD DATABASE
document.addEventListener("DOMContentLoaded", async function () {
    const leaderboardList = document.getElementById("leaderboard-list");

    try {
        const response = await fetch("../database/leaderboard.json");
        const leaderboardData = await response.json();

        leaderboardList.innerHTML = leaderboardData.map(player => `
            <div class="flex items-center gap-4 bg-zinc-800 bg-opacity-90 rounded-xl p-5 w-64 sm:w-72 shadow-lg hover:shadow-xl transition-all border-2 border-yellow-400">
                <div class="w-12 h-12 sm:w-14 sm:h-14">
                    <img src="${player.image}" alt="${player.season}" class="w-full h-full object-cover rounded-full border-2 border-gray-500">
                </div>
                <div>
                    <p class="text-sm sm:text-base font-semibold text-white">${player.rank} ${player.season} | ${player.name}</p>
                </div>
            </div>
        `).join("");
    } catch (error) {
        console.error("Gagal mengambil data leaderboard:", error);
    }
});

// CHANGE IMAGE
document.addEventListener("DOMContentLoaded", function () {
    const images = [
        "./assets/img/yuki.png",
        "./assets/img/yuki2.png",
        "./assets/img/yuki3.png"
    ];
    let index = 0;
    const bgCurrent = document.getElementById("home-bg");
    const bgNext = document.getElementById("home-bg-next");

    function changeBackground() {
        index = (index + 1) % images.length;
        bgNext.style.backgroundImage = `url('${images[index]}')`;
        bgNext.classList.remove("opacity-0");
        bgNext.classList.add("opacity-100");

        setTimeout(() => {
            bgCurrent.style.backgroundImage = bgNext.style.backgroundImage;
            bgNext.classList.remove("opacity-100");
            bgNext.classList.add("opacity-0");
        }, 1000);
    }

    setInterval(changeBackground, 5000);
});
