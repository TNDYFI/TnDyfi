document.addEventListener("DOMContentLoaded", () => {
  const copyAllBtn = document.getElementById("copyAllBtn");

  const allText = `
Facebook: https://www.facebook.com/share/191ns6fitb/
Instagram: https://www.instagram.com/dyfitn?igsh=M2M3YWxkanJ0NGNv
Website: https://dyfitamilnadu.org
Website 2: https://dyfitamilnadu.in
YouTube: https://youtube.com/@dyfitamilnadu2231?si=VPq2jHD9DJPWWt9X
X: https://x.com/dyfitn
Mail: info@dyfitamilnadu.com
Contact: 1234567890
  `.trim();

  copyAllBtn?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(allText);
      copyAllBtn.innerHTML = '<i class="fas fa-check"></i>';
      setTimeout(() => {
        copyAllBtn.innerHTML = '<i class="fas fa-copy"></i>';
      }, 1200);
    } catch (e) {
      alert("Copy failed");
    }
  });
});
