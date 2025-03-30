function copyReferral() {
    let copyText = document.getElementById("referralLink");
    copyText.select();
    document.execCommand("copy");
    alert("Рефералдык шилтеме көчүрүлдү!");
}
