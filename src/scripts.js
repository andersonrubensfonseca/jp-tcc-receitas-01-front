// scripts.js

document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.stars span');
    const submitButtons = document.querySelectorAll('.submit-rating');
    const ratingMessages = document.querySelectorAll('#rating-message');

    stars.forEach(star => {
        star.addEventListener('mouseover', function() {
            const value = this.getAttribute('data-value');
            stars.forEach(star => {
                if (star.getAttribute('data-value') <= value) {
                    star.classList.add('hover');
                } else {
                    star.classList.remove('hover');
                }
            });
        });

        star.addEventListener('mouseout', function() {
            stars.forEach(star => star.classList.remove('hover'));
        });

        star.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            const parent = this.closest('.recipe');
            parent.setAttribute('data-rating', value);
            stars.forEach(star => {
                if (star.getAttribute('data-value') <= value) {
                    star.classList.add('selected');
                } else {
                    star.classList.remove('selected');
                }
            });
        });
    });

    submitButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const parent = button.closest('.recipe');
            const rating = parent.getAttribute('data-rating');
            const recipeId = parent.getAttribute('data-recipe-id');
            
            if (!rating) {
                ratingMessages[index].textContent = 'Por favor, selecione uma avaliação.';
                return;
            }

            fetch('/avaliar-receita', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ recipeId, rating })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    ratingMessages[index].textContent = 'Obrigado pela sua avaliação!';
                } else {
                    ratingMessages[index].textContent = 'Ocorreu um erro ao enviar sua avaliação.';
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                ratingMessages[index].textContent = 'Ocorreu um erro ao enviar sua avaliação.';
            });
        });
    });
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



// CADASTRO
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registration-form');
    const firstnameInput = document.getElementById('firstname');
    const lastnameInput = document.getElementById('lastname');
    const emailInput = document.getElementById('email');
    const numberInput = document.getElementById('number');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const genderInputs = document.querySelectorAll('input[name="gender"]');

    // Função para mostrar mensagens de erro
    function showError(input, message) {
        const errorDiv = document.getElementById(`${input.id}-error`);
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }

    // Função para limpar mensagens de erro
    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
            el.style.display = 'none';
        });
    }

    // Função para validar o formulário
    function validateForm() {
        let isValid = true;
        clearErrors(); // Limpa mensagens de erro anteriores

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
            showError(numberInput, 'Número de celular inválido. Use o formato (xx) xxxxx-xxxx.');
            isValid = false;
        }

        // Valida a senha
        if (passwordInput.value.length < 8 || !validatePassword(passwordInput.value)) {
            showError(passwordInput, 'Senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.');
            isValid = false;
        }

        // Valida a confirmação da senha
        if (passwordInput.value !== confirmPasswordInput.value) {
            showError(confirmPasswordInput, 'As senhas não coincidem');
            isValid = false;
        }

        // Valida o gênero
        const selectedGender = Array.from(genderInputs).some(input => input.checked);
        if (!selectedGender) {
            showError(document.querySelector('.gender-title'), 'Selecione um gênero.');
            isValid = false;
        }

        return isValid;
    }

    // Função para validar o email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Função para validar o número de telefone no formato brasileiro com DDD
    function validatePhoneNumber(phone) {
        const re = /^\(\d{2}\) \d{5}-\d{4}$/;
        return re.test(phone);
    }

    // Função para validar a senha
    function validatePassword(password) {
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return re.test(password);
    }

    // Adiciona evento de clique ao botão de continuar
    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        if (validateForm()) {
            // Coleta dados do formulário
            const formData = new FormData(form);
            const data = {
                firstname: formData.get('firstname'),
                lastname: formData.get('lastname'),
                email: formData.get('email'),
                number: formData.get('number'),
                password: formData.get('password'),
                confirmPassword: formData.get('confirm-password'),
                gender: formData.get('gender')
            };

            try {
                const response = await fetch('http://localhost:3000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const result = await response.json();

                if (response.ok) {
                    alert('Cadastro realizado com sucesso!');
                    window.location.href = './login.html'; // Redireciona para a página de login após o cadastro
                } else {
                    alert(result.message || 'Erro ao cadastrar.');
                }
            } catch (error) {
                console.error('Erro:', error);
                alert('Erro ao cadastrar.');
            }
        }
    });
});

//LOGIN 
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona o formulário
    const form = document.querySelector('form');

    // Adiciona um evento de submit ao formulário
    form.addEventListener('submit', async function(event) {
        // Previne o envio do formulário para validação
        event.preventDefault();

        // Seleciona os campos de email e senha
        const emailField = document.getElementById('email');
        const passwordField = document.getElementById('password');

        // Obtém os valores dos campos
        const emailValue = emailField.value.trim();
        const passwordValue = passwordField.value.trim();

        // Verifica se o email está preenchido
        if (!emailValue) {
            alert('Por favor, digite seu email.');
            return;
        }

        // Verifica se o email é válido
        if (!validateEmail(emailValue)) {
            alert('O email digitado é inválido.');
            return;
        }

        // Verifica se a senha está preenchida
        if (!passwordValue) {
            alert('Por favor, digite sua senha.');
            return;
        }

        // Verifica o comprimento da senha
        if (passwordValue.length < 8) {
            alert('Senha deve ter pelo menos 8 caracteres.');
            return;
        }

        // Se tudo estiver correto, você pode enviar os dados para a API de login
        try {
            const response = await fetch('http://localhost:3000/login', { // Certifique-se de que a URL está correta
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: emailValue,
                    password: passwordValue,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Armazenar o token em localStorage e redirecionar ou exibir uma mensagem
                localStorage.setItem('token', data.token);
                alert('Login bem-sucedido!');
                window.location.href = './home.html'; // Redireciona para a página inicial após login
            } else {
                alert(data.message || 'Erro ao fazer login.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao fazer login.');
        }
    });

    // Função para validar o email usando expressão regular
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});



// EDITAR PERFIL
document.addEventListener('DOMContentLoaded', function() {
    // Função para mostrar uma pré-visualização da imagem selecionada
    function previewImage(event) {
        const input = event.target;
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.maxWidth = '150px'; // Ajuste o tamanho conforme necessário
                img.style.borderRadius = '8px'; // Ajuste o estilo conforme necessário

                // Remove a imagem antiga, se houver
                const oldImg = document.querySelector('#profile-picture-preview');
                if (oldImg) {
                    oldImg.remove();
                }

                // Adiciona a nova imagem ao formulário
                input.parentElement.insertBefore(img, input.nextSibling);
                img.id = 'profile-picture-preview';
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    // Adiciona o listener para o campo de upload de imagem
    document.getElementById('profile-picture').addEventListener('change', previewImage);

    // Validação do formulário antes do envio
    document.getElementById('edit-profile-form').addEventListener('submit', function(event) {
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (newPassword !== '' && newPassword !== confirmPassword) {
            alert('As novas senhas não coincidem.');
            event.preventDefault(); // Impede o envio do formulário
        }
    });
});

