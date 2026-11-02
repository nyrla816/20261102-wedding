// 갤러리 이미지 확대 팝업
const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const closeModal = document.querySelector(".modal-close");

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    modalImage.src = item.dataset.full;
    imageModal.classList.add("open");
    imageModal.setAttribute("aria-hidden", "false");
  });
});

function hideModal() {
  imageModal.classList.remove("open");
  imageModal.setAttribute("aria-hidden", "true");
  modalImage.src = "";
}
closeModal.addEventListener("click", hideModal);
imageModal.addEventListener("click", (event) => {
  if (event.target === imageModal) hideModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") hideModal();
});

// 계좌번호 복사 및 완료 팝업
const toast = document.getElementById("toast");
let toastTimer;

document.querySelectorAll(".copy-btn").forEach((button) => {
  button.addEventListener("click", async () => {
    const accountNumber = button.dataset.copy;
    try {
      await navigator.clipboard.writeText(accountNumber);
      showToast("계좌번호가 복사되었습니다.");
    } catch (error) {
      // 로컬 파일 등에서 클립보드 권한이 없을 때를 위한 대체 복사 방식
      const temp = document.createElement("textarea");
      temp.value = accountNumber;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand("copy");
      temp.remove();
      showToast("계좌번호 복사를 시도했습니다.");
    }
  });
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}
