const generateReportButton = document.getElementById('gerar-relatorio');
const select = document.getElementById('relatorio-select');
const feedbackMessage = document.getElementById('feedback-message');
const feedbackConfigMessage = document.getElementById('feedback-config');

const applyTheme = () => {
	const theme = localStorage.getItem('theme') || 'light';
	document.body.classList.toggle('dark-mode', theme === 'dark');
	document.getElementById('theme-switch').checked = theme === 'dark';
};

const toggleTheme = () => {
	const isDarkMode = document.body.classList.toggle('dark-mode');
	const currentTheme = isDarkMode ? 'dark' : 'light';
	localStorage.setItem('theme', currentTheme);
};

document.getElementById('theme-switch').addEventListener('change', toggleTheme);

applyTheme();
const showFeedback = (message, color, isConfig = false) => {
	const feedbackElem = isConfig ? feedbackConfigMessage : feedbackMessage;
	feedbackElem.textContent = message;
	feedbackElem.style.color = color;
	feedbackElem.style.display = 'block';

	setTimeout(() => {
		feedbackElem.textContent = '';
		feedbackElem.style.display = 'none';
	}, 3500);
};

const handleGenerateReport = () => {
	if (select.value) {
		showFeedback('Relatório gerado com sucesso.', 'green');
	} else {
		showFeedback('Selecione um relatório.', 'red');
		reportOutput.innerHTML = '';
	}
};

generateReportButton.addEventListener('click', handleGenerateReport);

const cancelConfigButton = document.getElementById('cancelar-config');
const configForm = document.getElementById('configForm');
const usuarioNome = document.getElementById('usuario-nome');
const usuarioEmail = document.getElementById('usuario-email');

const handleCancelConfig = () => {
	configForm.reset();
	feedbackMessage.style.display = 'none';
};

cancelConfigButton.addEventListener('click', handleCancelConfig);

const isValidEmail = (email) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

const handleSubmitConfig = (event) => {
	event.preventDefault();

	const nome = document.getElementById('nome').value;
	const email = document.getElementById('email').value;
	const senha = document.getElementById('senha').value;

	if (!nome || !email || !senha) {
		showFeedback('Preencha todos os campos.', 'red', true);
		return;
	}

	if (!isValidEmail(email)) {
		showFeedback('Digite um e-mail válido.', 'red', true);
		return;
	}

	if (senha.length <= 7) {
		showFeedback('A senha deve ter mais de 7 caracteres.', 'red', true);
		return;
	}

	usuarioNome.textContent = nome;
	usuarioEmail.textContent = email;

	showFeedback('Alterações salvas.', 'green', true);
	configForm.reset();
};

configForm.addEventListener('submit', handleSubmitConfig);
