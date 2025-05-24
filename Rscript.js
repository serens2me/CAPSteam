const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  ['nameError', 'rollNoError', 'emailError', 'passwordError'].forEach(id => {
    document.getElementById(id).textContent = '';
  });

  let valid = true;
  const name = registerForm.name.value.trim();
  const rollNo = registerForm.rollNo.value.trim();
  const email = registerForm.email.value.trim();
  const password = registerForm.password.value.trim();

  if (!name) {
    document.getElementById('nameError').textContent = 'Name is required';
    valid = false;
  }
  if (!rollNo) {
    document.getElementById('rollNoError').textContent = 'Roll Number is required';
    valid = false;
  }
  if (!email) {
    document.getElementById('emailError').textContent = 'Email is required';
    valid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    document.getElementById('emailError').textContent = 'Email is invalid';
    valid = false;
  }
  if (!password) {
    document.getElementById('passwordError').textContent = 'Password is required';
    valid = false;
  } else if (password.length < 6) {
    document.getElementById('passwordError').textContent = 'Password must be at least 6 characters';
    valid = false;
  }

  if (!valid) return;

  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name, rollNo, email, password})
    });

    const result = await res.json();

    if (res.ok) {
      alert('Registration successful! Please login.');
      window.location.href = 'login.html';
    } else {
      alert(result.msg || 'Registration failed');
    }
  } catch (error) {
    alert('Server error. Try again later.');
  }
});
