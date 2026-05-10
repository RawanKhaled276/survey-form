const form = document.getElementById('survey-form');
const successMsg = document.getElementById('success-msg');
const textarea = document.getElementById('comments');
const charCounter = document.getElementById('char-counter');
const charFill = document.getElementById('char-fill');
const MAX_CHARS = 300;

textarea.addEventListener('input', updateCharCounter);

function updateCharCounter() {
    const len = textarea.value.length;
    const pct = (len / MAX_CHARS) * 100;
    charCounter.textContent = `${len} / ${MAX_CHARS}`;
    charFill.style.width = `${pct}%`;
    const warn = pct >= 70 && pct < 95;
    const over = pct >= 95;
    charCounter.classList.toggle('warn', warn);
    charCounter.classList.toggle('over', over);
    charFill.classList.toggle('warn', warn);
    charFill.classList.toggle('over', over);
}

function showError(groupId, errId) {
    document.getElementById(groupId).classList.add('has-error');
    document.getElementById(groupId).classList.remove('is-valid');
}

function clearError(groupId) {
    document.getElementById(groupId).classList.remove('has-error');
    document.getElementById(groupId).classList.add('is-valid');
}

function clearAll() {
    form.querySelectorAll('.field-group').forEach(g => {
        g.classList.remove('has-error', 'is-valid');
    });
}

// Live blur validation
document.getElementById('name').addEventListener('blur', function () {
    this.value.trim().length < 2 ? showError('group-name') : clearError('group-name');
});

document.getElementById('email').addEventListener('blur', function () {
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value.trim()) ? clearError('group-email') : showError('group-email');
});

document.getElementById('age').addEventListener('blur', function () {
    const v = parseInt(this.value, 10);
    (!this.value || isNaN(v) || v < 10 || v > 100) ? showError('group-age') : clearError('group-age');
});

// Submit
form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearAll();
    successMsg.classList.remove('visible');
    let valid = true;

    if (document.getElementById('name').value.trim().length < 2) { showError('group-name'); valid = false; }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById('email').value.trim())) { showError('group-email'); valid = false; }

    const age = parseInt(document.getElementById('age').value, 10);
    if (!document.getElementById('age').value || isNaN(age) || age < 10 || age > 100) { showError('group-age'); valid = false; }

    if (!document.querySelector('input[name="online"]:checked')) { showError('group-freq'); valid = false; }

    if (!valid) {
        form.querySelector('.has-error')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

    successMsg.classList.add('visible');
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });

    const btn = document.getElementById('submit-btn');
    btn.disabled = true;
    btn.textContent = '✓ Submitted!';
    btn.style.background = 'linear-gradient(135deg, #16a34a, #22c55e)';

    setTimeout(() => {
        btn.disabled = false;
        btn.textContent = 'Submit Survey';
        btn.style.background = '';
    }, 3000);
});

// Reset
document.getElementById('reset-btn').addEventListener('click', function () {
    form.reset();
    clearAll();
    successMsg.classList.remove('visible');
    updateCharCounter();
    const btn = document.getElementById('submit-btn');
    btn.disabled = false;
    btn.textContent = 'Submit Survey';
    btn.style.background = '';
});