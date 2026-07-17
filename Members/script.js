window.addEventListener('load', () => {
    // 1. மொபைல் வியூ லேஅவுட் ஸ்கேலிங் கணக்கீடு (Responsive UI)
    const setViewportWidth = () => {
        const width = Math.min(window.innerWidth, 450) - 40;
        document.documentElement.style.setProperty('--viewport-width', width);
    };
    setViewportWidth();
    window.addEventListener('resize', setViewportWidth);

    // 2. லோடரை மறைத்தல்
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('app-container').style.display = 'block';
    }, 1500);

    // 3. கார்டு ஜெனரேட் செய்யும் பகுதி
    const genBtn = document.getElementById('generateTrigger');
    genBtn.addEventListener('click', () => {
        const idVal = document.getElementById('id_num').value || "246380";
        const nameVal = document.getElementById('name').value;
        const ageVal = document.getElementById('age').value;
        const eduVal = document.getElementById('edu').value;
        const addrVal = document.getElementById('addr').value;
        const branchVal = document.getElementById('branch').value;
        const areaVal = document.getElementById('area').value;
        const distVal = document.getElementById('dist').value;
        const bloodVal = document.getElementById('blood').value;
        const dateVal = document.getElementById('date').value;

        // திரையில் காட்டும் கார்டுகளுக்கு டேட்டாவை மாற்றுதல்
        document.querySelectorAll('.out-id-val').forEach(el => el.innerText = idVal);
        document.querySelectorAll('.out-name-val').forEach(el => el.innerText = nameVal);
        document.querySelectorAll('.out-age-val').forEach(el => el.innerText = ageVal);
        document.querySelectorAll('.out-edu-val').forEach(el => el.innerText = eduVal);
        document.querySelectorAll('.out-addr-val').forEach(el => el.innerText = addrVal);
        document.querySelectorAll('.out-branch-val').forEach(el => el.innerText = branchVal);
        document.querySelectorAll('.out-area-val').forEach(el => el.innerText = areaVal);
        document.querySelectorAll('.out-dist-val').forEach(el => el.innerText = distVal);
        document.querySelectorAll('.out-blood-val').forEach(el => el.innerText = bloodVal);
        document.querySelectorAll('.out-date-val').forEach(el => el.innerText = dateVal);

        // பின்னணியில் டவுன்லோடிற்குத் தயாராகும் கார்டுகளுக்கு டேட்டாவை மாற்றுதல்
        document.getElementById('dl-out-id').innerText = idVal;
        document.getElementById('dl-out-name').innerText = nameVal;
        document.getElementById('dl-out-age').innerText = ageVal;
        document.getElementById('dl-out-edu').innerText = eduVal;
        document.getElementById('dl-out-addr').innerText = addrVal;
        document.getElementById('dl-out-branch').innerText = branchVal;
        document.getElementById('dl-out-area').innerText = areaVal;
        document.getElementById('dl-out-dist').innerText = distVal;
        document.getElementById('dl-out-blood').innerText = bloodVal;
        document.getElementById('dl-out-date').innerText = dateVal;

        document.getElementById('result-area').style.display = 'block';
        
        window.scrollTo({ 
            top: document.getElementById('result-area').offsetTop, 
            behavior: 'smooth' 
        });
    });

    // 4. இன்ஸ்டன்ட் டவுன்லோடு லாஜிக் (White Screen Fixed)
    document.getElementById('downloadTrigger').addEventListener('click', () => {
        const dlBtn = document.getElementById('downloadTrigger');
        dlBtn.innerText = "Downloading...";
        dlBtn.disabled = true;

        // டவுன்லோடு பாக்ஸை ரெண்டரிங்கிற்காக தற்காலிகமாகத் திறக்கிறோம்
        const hiddenBox = document.getElementById('hidden-download-box');
        hiddenBox.style.display = "block";

        setTimeout(async () => {
            try {
                const captureArea = document.getElementById('download-capture-area');

                const canvas = await html2canvas(captureArea, {
                    scale: 2, 
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: "#f5f7f8",
                    logging: false,
                    imageTimeout: 0
                });

                const link = document.createElement('a');
                const serialNo = document.getElementById('id_num').value || "2026";
                link.download = `DYFI_Membership_Card_${serialNo}.png`;
                link.href = canvas.toDataURL("image/png");
                link.click();
                
            } catch (err) {
                console.error("Download Error:", err);
                alert("மீண்டும் முயற்சிக்கவும்!");
            } finally {
                // டவுன்லோடு முடிந்ததும் மீண்டும் முழுமையாக மறைத்து விடுகிறோம்
                hiddenBox.style.display = "none";
                dlBtn.innerText = "Download ID Card";
                dlBtn.disabled = false;
            }
        }, 50); // மிகக் குறைந்த மில்லிசெகண்ட் தாமதம் துல்லியமான கேப்சருக்கு உதவும்
    });
});
