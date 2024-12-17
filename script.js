
const attackBtn = document.querySelector('.attack')
const startBtn = document.querySelector('.start')
const startAgainBtn = document.querySelector('.startAgain')
const avatarProgress = document.querySelector('.avatarProgress')
const monsterProgress = document.querySelector('.monsterProgress')
const image = document.querySelector('.monster')
const playerImg = document.querySelector('.playerImg')
const avatars = document.querySelectorAll('.avatar')
const GameOver = document.querySelector('.alertContainer')
const gameContainer = document.querySelector('.gameContainer')
const startContainer = document.querySelector('.startContainer')
const money = document.querySelector('h2')
const healer = document.querySelector('.healer')
const weapons = document.querySelectorAll('.weapon')





const monsterImage = [
    "https://img.freepik.com/premium-vector/cartoon-stone-monster-pixel-design_61878-700.jpg",
    "https://t3.ftcdn.net/jpg/02/19/37/08/360_F_219370887_OEa1g6YysaU97yb3PGmFQONAUiWsmKK1.jpg",
    "https://www.shutterstock.com/image-vector/vector-illustration-cartoon-monster-bull-260nw-1041223555.jpg",
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c70d347e-72dd-4c4b-8c51-991650d5abf8/dep9gr3-1ef0a927-f9b4-4d3b-a15a-c98551148e21.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2M3MGQzNDdlLTcyZGQtNGM0Yi04YzUxLTk5MTY1MGQ1YWJmOFwvZGVwOWdyMy0xZWYwYTkyNy1mOWI0LTRkM2ItYTE1YS1jOTg1NTExNDhlMjEuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.VNWC7T7VUig0LUsA82Jn1ilI_yRRJAmFLWgvUEtNoY4",
    "https://img.freepik.com/premium-vector/cartoon-tree-monster-pixel-design_61878-701.jpg",
    "https://img.freepik.com/premium-vector/cartoon-zombie-pixel-design_61878-721.jpg"
]


let avatarProgressChanges = 100;
let monsterProgressChanges = 100;
let monsterNumber = 11
let avatarNumber = 7
let AllMooney = 50
let healerCost = 100
let selectedWeapon = null;


avatars.forEach((avatar, index) => {
    avatar.onclick = () => {
        avatars.forEach((avatarItem) => {
            avatarItem.style.border = "2px solid black"
        });

        avatar.style.border = '5px solid green'

        // Priskiriam indexa
        if (index === 0) {
            selectedAvatar = 'girl';
        } else if (index === 1) {
            selectedAvatar = 'cat';
        } else if (index === 2) {
            selectedAvatar = 'fire';
        }
    }
})

startBtn.onclick = () => {
    startContainer.style.display = 'none';
    gameContainer.style.display = 'flex';

    if (selectedAvatar === 'girl') {
        playerImg.src = avatars[0].src
    } else if (selectedAvatar === 'cat') {
        playerImg.src = avatars[1].src
    } else if (selectedAvatar === 'fire') {
        playerImg.src = avatars[2].src
    }

}

attackBtn.onclick = () => {

    if (avatarProgressChanges === 0) {
        gameContainer.style.display = 'none';
        GameOver.style.display = 'flex';
    }

    let monsterDamage = Math.floor(Math.random() * monsterNumber)
    let avatarDamage = Math.floor(Math.random() * avatarNumber)

    if (selectedWeapon === 'bow') {
        // 50% chance to deal double damage
        if (Math.random() < 0.5) {
            monsterDamage *= 2;
            console.log("Bow effect: Double damage!");
        }
    } else if (selectedWeapon === 'sword') {
        // 30% chance to dodge the enemy attack
        if (Math.random() < 0.3) {
            avatarDamage = 0;
        }
    } else if (selectedWeapon === 'magicWand') {
        // 70% chance to heal player of 5 points
        if (Math.random() < 0.7) {
            if (avatarProgressChanges <= 96){
                avatarProgressChanges += 5;
                avatarProgress.style.width = avatarProgressChanges + "%"
            }
        }
    }

    avatarProgressChanges = Math.max(0, avatarProgressChanges - avatarDamage);
    avatarProgress.style.width = avatarProgressChanges + "%"

    monsterProgressChanges = Math.max(0, monsterProgressChanges - monsterDamage);
    monsterProgress.style.width = monsterProgressChanges + "%"

    console.log(monsterDamage)
    console.log(monsterProgress.style.width)
    console.log(monsterProgressChanges)

    AllMooney += monsterDamage
    money.innerText = `Money: ${AllMooney}`

    if (monsterProgressChanges === 0) {
        const randomImage = Math.floor(Math.random() * monsterImage.length);
        image.src = monsterImage[randomImage];
        monsterProgressChanges = 100;
        monsterProgress.style.width = monsterProgressChanges + "%"
    }

}

healer.onclick = () => {
    if (AllMooney >= healerCost) {
        AllMooney -= healerCost
        money.innerText = `Money: ${AllMooney}`
        avatarProgressChanges = 100;
        avatarProgress.style.width = avatarProgressChanges + "%"
    } else {
        alert("Not enough money")
    }
}

function rnd(num) {
    return Math.round(Math.random() * num)
}

weapons.forEach((weapon, index) => {
    weapon.onclick = () => {
        weapons.forEach((weaponItem) => {
            weaponItem.style.border = "2px solid black"});
        weapon.style.border = '4px solid orange'

        if (index === 0) {
            selectedWeapon = 'bow';
        } else if (index === 1) {
            selectedWeapon = 'sword';
        } else if (index === 2) {
            selectedWeapon = 'magicWand';
        }

    }
})

startAgainBtn.onclick = () => {
    GameOver.style.display = 'none';
    startContainer.style.display = 'flex';

    avatarProgressChanges = 100;
    avatarProgress.style.width = avatarProgressChanges + "%"

    monsterProgressChanges = 100;
    monsterProgress.style.width = monsterProgressChanges + "%"

    AllMooney = 50
    money.innerText = `Money: ${AllMooney}`


    weapons.forEach((weapon) => {
        weapon.style.border = "2px solid black"
    })

}

























