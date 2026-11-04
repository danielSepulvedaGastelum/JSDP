
if (new URLSearchParams(location.search).has('captura')) document.body.classList.add('capture');
const form = document.querySelector('form');
const feedback = document.querySelector('.feedback');
const matricula = document.querySelector('#matricula');
const password = document.querySelector('#password');
document.querySelector('.reveal').addEventListener('click', function () {
  const visible = password.type === 'password';
  password.type = visible ? 'text' : 'password';
  this.setAttribute('aria-label', visible ? 'Ocultar contraseña' : 'Mostrar contraseña');
  this.setAttribute('aria-pressed', String(visible));
});
function error(input, message) {
  input.setAttribute('aria-invalid', String(Boolean(message)));
  document.querySelector('#' + input.id + '-error').textContent = message;
}
form.addEventListener('submit', function (event) {
  event.preventDefault();
  feedback.textContent = '';
  const missingMatricula = !matricula.value.trim();
  const missingPassword = !password.value;
  error(matricula, missingMatricula ? 'Escribe tu matrícula para continuar.' : '');
  error(password, missingPassword ? 'Escribe tu contraseña para continuar.' : '');
  if (missingMatricula || missingPassword) {
    (missingMatricula ? matricula : password).focus();
    return;
  }
  feedback.textContent = 'Esta es una propuesta de diseño. El inicio de sesión aún no está habilitado.';
  password.value = '';
});
for (const input of [matricula, password]) input.addEventListener('input', () => error(input, ''));
for (const link of document.querySelectorAll('[data-pending]')) link.addEventListener('click', event => {
  event.preventDefault();
  feedback.textContent = link.dataset.pending;
  feedback.focus({preventScroll:true});
});
