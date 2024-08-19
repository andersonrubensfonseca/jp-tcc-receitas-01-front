// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Função para avaliar receitas
    function handleRating(event) {
        const star = event.target;
        if (star.classList.contains('star')) {
            const ratingValue = star.dataset.value;
            const starsContainer = star.closest('.stars');
            if (starsContainer) {
                starsContainer.querySelectorAll('span').forEach((s, index) => {
                    s.innerHTML = index < ratingValue ? '&#9733;' : '&#9734;';
                });
                const ratingMessage = starsContainer.nextElementSibling; // Assuming the message is next to the stars
                if (ratingMessage) {
                    ratingMessage.textContent = `Você avaliou com ${ratingValue} estrela(s).`;
                }
            }
        }
    }

    // Adiciona o evento de clique para todas as estrelas de avaliação
    document.querySelectorAll('.stars').forEach(starsContainer => {
        starsContainer.addEventListener('click', handleRating);
    });

    // Função para mostrar/ocultar o menu dropdown
    document.querySelectorAll('.menu-item').forEach(menuItem => {
        menuItem.addEventListener('mouseover', function() {
            const dropdown = this.querySelector('.dropdown');
            if (dropdown) {
                dropdown.style.display = 'block';
            }
        });

        menuItem.addEventListener('mouseout', function() {
            const dropdown = this.querySelector('.dropdown');
            if (dropdown) {
                dropdown.style.display = 'none';
            }
        });
    });
});

// LOGIN
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginButton = document.querySelector('.continue-button button');

    // Função para validar o email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Função para validar o formulário
    function validateForm() {
        let isValid = true;

        // Limpa mensagens de erro
        document.querySelectorAll('.error-message').forEach(el => el.remove());

        // Valida o email
        if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Email inválido');
            isValid = false;
        }

        // Valida a senha
        if (passwordInput.value.length < 6) {
            showError(passwordInput, 'Senha deve ter pelo menos 6 caracteres');
            isValid = false;
        }

        return isValid;
    }

    // Função para mostrar mensagens de erro
    function showError(input, message) {
        const error = document.createElement('div');
        error.className = 'error-message text-danger';
        error.textContent = message;
        input.parentElement.appendChild(error);
    }

    // Adiciona evento de clique ao botão de login
    loginButton.addEventListener('click', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        if (validateForm()) {
            // Simula o envio do formulário
            alert('Login realizado com sucesso!');
            // Aqui você pode redirecionar ou enviar os dados para o servidor
            form.submit(); // Se você tiver uma ação real de envio
        }
    });
});

// CADASTRO
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const firstnameInput = document.getElementById('firstname');
    const lastnameInput = document.getElementById('lastname');
    const emailInput = document.getElementById('email');
    const numberInput = document.getElementById('number');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('Confirmpassword');
    const genderInputs = document.querySelectorAll('input[name="gender"]');
    const continueButton = document.querySelector('.continue-button button');

    // Função para validar o email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Função para validar o número de telefone
    function validatePhoneNumber(phone) {
        const re = /^\(\d{2}\) \d{4}-\d{4}$/;
        return re.test(phone);
    }

    // Função para validar o formulário
    function validateForm() {
        let isValid = true;

        // Limpa mensagens de erro
        document.querySelectorAll('.error-message').forEach(el => el.remove());

        // Valida o primeiro nome
        if (firstnameInput.value.trim() === '') {
            showError(firstnameInput, 'Primeiro nome é obrigatório');
            isValid = false;
        }

        // Valida o sobrenome
        if (lastnameInput.value.trim() === '') {
            showError(lastnameInput, 'Sobrenome é obrigatório');
            isValid = false;
        }

        // Valida o email
        if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Email inválido');
            isValid = false;
        }

        // Valida o número de telefone
        if (!validatePhoneNumber(numberInput.value)) {
            showError(numberInput, 'Número de celular inválido');
            isValid = false;
        }

        // Valida a senha
        if (passwordInput.value.length < 6) {
            showError(passwordInput, 'Senha deve ter pelo menos 6 caracteres');
            isValid = false;
        }

        // Valida a confirmação da senha
        if (passwordInput.value !== confirmPasswordInput.value) {
            showError(confirmPasswordInput, 'As senhas não coincidem');
            isValid = false;
        }

        // Verifica se algum gênero foi selecionado
        if (![...genderInputs].some(input => input.checked)) {
            showError(genderInputs[0], 'Selecione um gênero');
            isValid = false;
        }

        return isValid;
    }

    // Função para mostrar mensagens de erro
    function showError(input, message) {
        const error = document.createElement('div');
        error.className = 'error-message text-danger';
        error.textContent = message;
        input.parentElement.appendChild(error);
    }

    // Adiciona evento de clique ao botão de continuar
    continueButton.addEventListener('click', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        if (validateForm()) {
            // Simula o envio do formulário
            alert('Cadastro realizado com sucesso!');
            // Aqui você pode redirecionar ou enviar os dados para o servidor
            form.submit(); // Se você tiver uma ação real de envio
        }
    });
});
// ESQUECI A SENHA
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const submitButton = document.querySelector('.continue-button button');

    // Função para validar o email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Função para mostrar mensagens de erro
    function showError(input, message) {
        let error = input.nextElementSibling;
        if (!error || !error.classList.contains('error-message')) {
            error = document.createElement('div');
            error.className = 'error-message text-danger';
            input.parentElement.appendChild(error);
        }
        error.textContent = message;
    }

    // Função para limpar mensagens de erro
    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => el.remove());
    }

    // Valida o formulário
    function validateForm() {
        let isValid = true;
        clearErrors();

        // Valida o email
        if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Por favor, insira um e-mail válido.');
            isValid = false;
        }

        return isValid;
    }

    // Adiciona evento de clique ao botão de envio
    submitButton.addEventListener('click', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        if (validateForm()) {
            // Simula o envio do formulário
            alert('Solicitação de recuperação de senha enviada com sucesso!');
            // Aqui você pode redirecionar ou enviar os dados para o servidor
            form.submit(); // Se você tiver uma ação real de envio
        }
    });
});
