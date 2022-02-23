const loadBuddy = () => {
    fetch('https://randomuser.me/api/?results=5').then(res => res.json()).then(data => showBuddy(data));
}

const showBuddy = (data) => {
    const buddiesSection = document.getElementById('buddies');
    for (const buddy of data.results) {
        const p = document.createElement('p');
        const name = document.createElement('p');
        name.innerHTML = `<span style='font-weight:bold;'>Name:</span> ${buddy.name.title + ' ' + buddy.name.first + '  ' + buddy.name.last}`;
        p.innerHTML = `<span style='font-weight:bold;'>Email:</span> ${buddy.email}`;
        buddiesSection.appendChild(name);
        buddiesSection.appendChild(p);
    }
}
loadBuddy();