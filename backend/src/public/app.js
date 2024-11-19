// public/app.js

document.getElementById('addCompanyForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const companyName = document.getElementById('companyName').value;
  const rolesInput = document.getElementById('roles').value;


  const roles = rolesInput.split(',').map(role => role.trim());

  try {
    const response = await fetch('/api/addCompany', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: companyName, roles }),
    });

    const data = await response.json();

    if (response.ok) {
      document.getElementById('message').innerText = 'Company and roles added successfully!';
    } else {
      document.getElementById('message').innerText = `Error: ${data.message}`;
    }
  } catch (error) {
    document.getElementById('message').innerText = 'An error occurred while adding the company.';
    console.error('Error:', error);
  }
});
