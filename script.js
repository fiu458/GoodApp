document.addEventListener("DOMContentLoaded", () => {
    const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i
        .test(navigator.userAgent);

    const mobileBlock = document.getElementById("mobile-block");
    const mainSite = document.getElementById("main-site");

    if (isMobile) {
        mobileBlock.style.display = "block";
        mainSite.style.display = "none";
    } else {
        mobileBlock.style.display = "none";
        mainSite.style.display = "block";
    }
});
