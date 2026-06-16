const CHAR_SETS = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:',.<>?/"
};

const passwordDisplay = document.getElementById('password-display');
const lengthSlider = document.getElementById('length-slider');
const lengthVal = document.getElementById('length-val');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');

const checkboxes = {
    uppercase: document.getElementById('uppercase'),
    lowercase: document.getElementById('lowercase'),
    numbers: document.getElementById('numbers'),
    symbols: document.getElementById('symbols')
};

lengthSlider.addEventListener('input', (e) => {
    lengthVal.textContent = e.target.value;
});

function generateSecurePassword() {
    let pool = "";
    let password = "";

    Object.keys(checkboxes).forEach(key => {
        if (checkboxes[key].checked) {
            pool += CHAR_SETS[key];
            password += getRandomCharFromString(CHAR_SETS[key]);
        }
    });

    if (pool === "") {
        alert("Por favor, selecione pelo menos uma opção de caracteres!");
        return "";
    }

    const remainingLength = parseInt(lengthSlider.value) - password.length;

    for (let i = 0; i < remainingLength; i++) {
        password += getRandomCharFromString(pool);
    }

    return shuffleString(password);
}

function getRandomCharFromString(str) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    const randomIndex = array[0] % str.length; 
    return str.charAt(randomIndex);
}

function shuffleString(str) {
    let arr = str.split('');
    let n = arr.length;
    const randomValues = new Uint32Array(n);
    window.crypto.getRandomValues(randomValues);

    for (let i = n - 1; i > 0; i--) {
        let j = randomValues[i] % (i + 1);
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr.join('');
}

// Ativação do clique do botão de gerar instalado no HTML
generateBtn.addEventListener('click', () => {
    const securePassword = generateSecurePassword();
    passwordDisplay.value = securePassword;
});

copyBtn.addEventListener('click', () => {
    if (!passwordDisplay.value || passwordDisplay.value.includes("Clique")) return;
    
    navigator.clipboard.writeText(passwordDisplay.value)
        .then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = "Copiado!";
            copyBtn.style.backgroundColor = "#22c55e";
            
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.backgroundColor = "";
            }, 2000);
        });
});