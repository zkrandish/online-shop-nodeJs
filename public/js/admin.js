document.addEventListener("DOMContentLoaded", () => {
    const deleteButtons = document.querySelectorAll(".delete-btn");

    deleteButtons.forEach((button) => {
        button.addEventListener("click", async (event) => {
            const btn = event.target;
            const prodId = btn.dataset.productid;
            const csrfToken = document.querySelector('input[name="_csrf"]').value;

            console.log("Deleting product:", prodId); // Debugging

            try {
                const response = await fetch(`/admin/product/${prodId}`, {
                    method: "DELETE",
                    headers: {
                        "csrf-token": csrfToken,
                        "Content-Type": "application/json"
                    }
                });

                const data = await response.json();
                console.log(data);

                if (response.ok) {
                    btn.closest(".product-item").remove(); // Remove product from UI
                } else {
                    alert(data.message || "Deleting product failed.");
                }
            } catch (error) {
                console.error("Error deleting product:", error);
            }
        });
    });
});
