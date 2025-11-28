// 🔹Toggle Sidebar (للشاشات الصغيرة)
const sidebar = document.querySelector('.sidebar');
const menuToggle = document.querySelector('.menu-toggle');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });
}

// 🔹 Close sidebar 
document.addEventListener('click', (e) => {
  if (window.innerWidth <= 900 && sidebar.classList.contains('open')) {
    if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  }
});


// 🔹 Delete Customer



async function deleteCustomer(id) {
  if (!confirm("Are you sure you want to delete this customer?")) return;
  const response = await fetch(`/delete/${id}`, {
    method: "DELETE"
  });

  const result = await response.json();

  if (result.message) {
    window.location.reload();
  }
}


